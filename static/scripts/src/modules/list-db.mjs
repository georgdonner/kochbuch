const openDb = () => new Promise((resolve, reject) => {
  const request = window.indexedDB.open('list-db', 1);
  request.onerror = () => {
    reject(new Error(`DB request error: ${request.errorCode}`));
  };
  request.onsuccess = (event) => {
    const db = event.target.result;
    db.onerror = (dbEvent) => {
      console.error(`Database error: ${dbEvent.target.errorCode}`);
    };
    resolve(db);
  };
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('list', { keyPath: 'item' });
  };
});

export const clearDatabase = () => new Promise(async (resolve, reject) => {
  const db = await openDb();
  const store = db.transaction('list', 'readwrite').objectStore('list');
  const clearReq = store.clear();
  clearReq.onsuccess = resolve;
  clearReq.onerror = reject;
});

export const getList = () => new Promise(async (resolve, reject) => {
  const db = await openDb();
  const store = db.transaction('list', 'readwrite').objectStore('list');
  const req = store.getAll();
  req.onerror = reject;
  req.onsuccess = () => {
    resolve(req.result.map(item => item.item));
  };
});

const addItem = (item, db) => new Promise((resolve, reject) => {
  const store = db.transaction('list', 'readwrite').objectStore('list');
  const req = store.add(item);
  req.onerror = reject;
  req.onsuccess = resolve;
});

export const updateList = async (list) => {
  const db = await openDb();
  await clearDatabase();
  const items = list.map(item => ({ item }));
  return Promise.all(items.map(item => addItem(item, db)));
};
