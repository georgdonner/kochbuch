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
    db.createObjectStore('list-updates', { keyPath: 'item' });
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

const addListUpdate = (listUpdate, db) => new Promise((resolve, reject) => {
  const store = db.transaction('list-updates', 'readwrite').objectStore('list-updates');
  const req = store.get(listUpdate.item);
  req.onerror = reject;
  req.onsuccess = (event) => {
    const data = event.target.result;
    let requestUpdate;
    if (data && listUpdate.action === 'removed') {
      requestUpdate = store.delete(listUpdate.item);
    } else {
      requestUpdate = store.add(listUpdate);
    }
    requestUpdate.onerror = reject;
    requestUpdate.onsuccess = resolve;
  };
});

const getAdded = (oldList, newList) => newList.filter(item => !oldList.includes(item));
const getRemoved = (oldList, newList) => oldList.filter(item => !newList.includes(item));

export const addListUpdates = async (newList) => {
  const db = await openDb();
  const oldList = await getList();
  const added = getAdded(oldList, newList).map(item => ({ item, action: 'added' }));
  const removed = getRemoved(oldList, newList).map(item => ({ item, action: 'removed' }));
  return Promise.all(added.concat(removed).map(update => addListUpdate(update, db)));
};
