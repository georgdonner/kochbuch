import { v4 as uuidv4 } from 'uuid';

import { openDb } from './db';
import api from './api';
import { withTimeout, toArray } from '../utils';

/**
 * @returns {Promise<ListDoc>}
 */
const fetchList = async () => api.get('/list');

const filterByAction = (changes, action) => changes.filter((change) => change.action === action);

/**
 *
 * @param {ListItem[]} list
 * @param {ListChange[]} changes
 */
const updateList = (list, changes) => {
  const newList = list.slice();
  filterByAction(changes, 'added').forEach(({ item, id }) => {
    newList.push({ name: item, id });
  });
  filterByAction(changes, 'removed').forEach(({ id }) => {
    const index = newList.findIndex((item) => item.id === id);
    if (index > -1) {
      newList.splice(index, 1);
    }
  });
  filterByAction(changes, 'updated').forEach(({ id, update }) => {
    const item = newList.find((it) => it.id === id);
    if (item) {
      const { id: itemId, ...itemUpdate } = update;
      Object.assign(item, itemUpdate);
    }
  });
  filterByAction(changes, 'moved').forEach(({ id, index }) => {
    const currentIndex = newList.findIndex((item) => item.id === id);
    const item = newList[currentIndex];
    if (currentIndex > -1) {
      newList.splice(currentIndex, 1);
      newList.splice(index, 0, item);
    }
  });
  return newList;
};

export default class ListDb {
  constructor(name, { onUpdate } = {}) {
    this.name = name;
    this.onUpdate = onUpdate;
    if (!this.onUpdate) {
      this.onUpdate = () => {};
    }
  }

  /**
   * @returns {Promise}
   */
  clear = async () => {
    const db = await openDb();
    return db.clear('list');
  };

  /**
   * @returns {Promise<ListDoc|null>}
   */
  getLocalList = async () => {
    const db = await openDb();
    if (this.name) {
      let doc = await db.get('list', this.name);
      if (!doc) {
        doc = { name: this.name, list: [], pending: [] };
        await db.add('list', doc);
      }
      return doc;
    }
    const all = await db.getAll('list');
    if (all.length) {
      this.name = all[0].name;
      return all[0];
    }
    return null;
  };

  /**
   * @param {ListItem[]} list
   * @returns {Promise<ListDoc>}
   */
  updateLocalList = async (list) => {
    const dbListDoc = await this.getLocalList();
    const db = await openDb();
    const updateWith = Array.isArray(list) ? { list } : list;
    let updatedDoc;
    if (dbListDoc) {
      updatedDoc = { ...dbListDoc, ...updateWith };
      await db.put('list', updatedDoc);
    } else if (!dbListDoc && this.name) {
      updatedDoc = { name: this.name, ...updateWith, pending: [] };
      await db.add('list', updatedDoc);
    }
    this.onUpdate(updatedDoc);
    return updatedDoc;
  };

  /**
   * @param {ListChange[]} changes
   * @returns {Promise}
   */
  updatePendingChanges = async (changes, { overwrite = true } = {}) => {
    const dbListDoc = await this.getLocalList();
    const db = await openDb();
    const pending = overwrite
      ? toArray(changes)
      : (dbListDoc.pending || []).concat(toArray(changes));
    return db.put('list', {
      ...dbListDoc,
      pending,
    });
  };

  /**
   * @param {ListChange[]} changes
   * @returns {Promise<ListDoc|null>}
   */
  updateServerList = async (changes) => {
    try {
      const updatedDoc = await api.put('/list/updates', {
        body: Array.isArray(changes) ? changes : [changes],
      });
      await this.updatePendingChanges([]);
      return updatedDoc;
    } catch (error) {
      await this.updatePendingChanges(changes);
      return null;
    }
  };

  /**
   * @param {number} [timeout]
   * @returns {Promise<ListDoc|null>}
   */
  getList = async (timeout) => {
    const dbListDoc = await this.getLocalList();
    let listDoc;
    const updateAndFetch = async () => {
      if (dbListDoc && dbListDoc.pending && dbListDoc.pending.length) {
        return this.updateServerList(dbListDoc.pending);
      }
      return fetchList();
    };
    try {
      if (timeout) {
        listDoc = await withTimeout(updateAndFetch, { timeout });
      } else {
        listDoc = await updateAndFetch();
      }
      if (listDoc) {
        await this.updateLocalList(listDoc);
        return listDoc;
      }
    } catch (error) {
      console.error(error);
    }
    return dbListDoc;
  };

  /**
   * @param {ListChange|ListChange[]} changes - The changes to be made to the server list
   * @returns {Promise<ListDoc>}
   */
  itemUpdate = async (changes = []) => {
    const { name, list, pending } = await this.getLocalList();
    const updated = updateList(list, toArray(changes));
    await this.updateLocalList(updated);

    const serverUpdated = await this.updateServerList(
      toArray(changes).concat(pending || []),
    );
    if (serverUpdated) {
      await this.updateLocalList(serverUpdated);
    }
    return serverUpdated || {
      list: updated, name,
    };
  };

  /**
   * @param {string|string[]} items
   */
  addItems = async (items) => {
    const changes = toArray(items).map((item) => ({ item, id: uuidv4(), action: 'added' }));
    return this.itemUpdate(changes);
  };

  /**
   * @param {string} id
   * @param {ListItem} update
   */
  updateItem = async (id, update) => this.itemUpdate({
    id,
    update,
    action: 'updated',
  });

  /**
   * @param {string} id
   * @param {number} index
   */
  moveItem = async (id, index) => this.itemUpdate({
    id,
    index,
    action: 'moved',
  });

  /**
   * @param {string|string[]} ids
   */
  removeItems = async (ids) => {
    const changes = toArray(ids).map((id) => ({ id, action: 'removed' }));
    return this.itemUpdate(changes);
  };
}

/**
 * A list update
 * @typedef {Object} ListChange
 * @property {('added'|'removed'|'updated'|'moved')} action
 * @property {string} [id]
 * @property {string} [item]
 * @property {string} [newItem]
 */

/**
  * A list item
  * @typedef {Object} ListItem
  * @property {string} id
  * @property {string} name
  * @property {ListItemCategory} [category]
  */

/**
 * A list item category
 * @typedef {Object} ListItemCategory
 * @property {string} _id
 * @property {string} name
 */

/**
 * A list document as saved in the database
 * @typedef {Object} ListDoc
 * @property {string} name - The list's unique name
 * @property {ListItem[]} list - The shopping list
 * @property {ListChange[]} [pending] - Pending changes
 */
