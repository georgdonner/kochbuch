import { openDB } from 'idb';

export const openDb = async () => openDB('recipes-db', 2, {
  upgrade(database, oldVersion) {
    if (oldVersion !== 1) {
      database.createObjectStore('recipes', { keyPath: '_id' });
    }
    database.createObjectStore('list', { keyPath: 'name' });
  },
});
