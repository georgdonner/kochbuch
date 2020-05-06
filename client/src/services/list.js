import { openDb } from './db';

import api from './api';
import { withTimeout, toArray } from '../utils';

/**
 * @returns {Promise<ListDoc>}
 */
const fetchList = async () => api.get('/list');

/**
 * @param {string[]} oldList
 * @param {string[]} newList
 * @returns {ListChange[]}
 */
const getChanges = (oldList, newList) => {
  const removed = oldList
    .filter((item) => !newList.includes(item))
    .map((item) => ({ action: 'removed', item }));
  const added = newList
    .filter((item) => !oldList.includes(item))
    .map((item) => ({ action: 'added', item }));
  return [...removed, ...added];
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
   * @returns {Promise<ListDoc|null>}
   */
  getLocalList = async () => {
    const db = await openDb();
    if (this.name) {
      return db.get('list', this.name);
    }
    const all = await db.getAll();
    if (all.length) {
      this.name = all[0].name;
      return all[0];
    }
    return null;
  };

  /**
   * @param {string[]} list
   * @returns {Promise<ListDoc>}
   */
  updateLocalList = async (list) => {
    const dbListDoc = await this.getLocalList();
    const db = await openDb();
    let updatedDoc;
    if (dbListDoc) {
      updatedDoc = { ...dbListDoc, list };
      await db.put('list', updatedDoc);
    } else if (!dbListDoc && this.name) {
      updatedDoc = { name: this.name, list, pending: [] };
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
        await this.updateLocalList(listDoc.list);
        return listDoc;
      }
    } catch (error) {
      console.error(error);
    }
    return dbListDoc;
  };

  /**
   * @param {updateFn} updateFn - The function to update the current list
   * @returns {Promise<ListDoc>}
   */
  itemUpdate = async (updateFn) => {
    const { name, list, pending } = await this.getLocalList();
    const updated = updateFn(list);
    await this.updateLocalList(updated);

    const serverUpdated = await this.updateServerList(
      getChanges(list, updated).concat(pending || []),
    );
    if (serverUpdated) {
      await this.updateLocalList(serverUpdated.list);
    }
    return serverUpdated || {
      list: updated, name,
    };
  };

  /**
   * @param {string|string[]} items
   */
  addItems = async (items) => {
    const updateFn = (list) => list.concat(toArray(items));
    return this.itemUpdate(updateFn);
  };

  /**
   * @param {string} item
   */
  updateItem = async (oldItem, newItem) => {
    const updateFn = (list) => list.map((i) => i === oldItem ? newItem : i);
    return this.itemUpdate(updateFn);
  };

  /**
   * @param {string|string[]} items
   */
  removeItems = async (items) => {
    const updateFn = (list) => list.filter((i) => !toArray(items).includes(i));
    return this.itemUpdate(updateFn);
  };
}

/**
 * A list update
 * @typedef {Object} ListChange
 * @property {('added'|'removed')} action
 * @property {string} item
 */

/**
 * A list document as saved in the database
 * @typedef {Object} ListDoc
 * @property {string} name - The list's unique name
 * @property {string[]} list - The shopping list
 * @property {ListChange[]} [pending] - Pending changes
 */

/**
 * An update function that takes the list and modifies it
 * @callback updateFn
 * @param {string[]} list
 * @returns {string[]}
 */
