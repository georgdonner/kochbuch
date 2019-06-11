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
    const store = db.createObjectStore('list', { keyPath: 'name' });
    db.createObjectStore('list-updates', { keyPath: 'item' });
    store.add({ name: 'main-list', list: [] });
  };
});

export const getList = () => new Promise(async (resolve, reject) => {
  const db = await openDb();
  const store = db.transaction('list', 'readwrite').objectStore('list');
  const req = store.get('main-list');
  req.onerror = reject;
  req.onsuccess = async () => {
    resolve(req.result.list);
  };
});

export const updateList = list => new Promise(async (resolve, reject) => {
  const db = await openDb();
  const store = db.transaction('list', 'readwrite').objectStore('list');
  const req = store.put({ name: 'main-list', list });
  req.onerror = reject;
  req.onsuccess = async () => {
    resolve(req.result.list);
  };
});

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

const getRemoved = (oldList, newList) => oldList.filter(item => !newList.includes(item));

export const addListUpdates = async (newList) => {
  const db = await openDb();
  const oldList = await getList();
  const removed = getRemoved(oldList, newList).map(item => ({ item, action: 'removed' }));
  return Promise.all(removed.map(update => addListUpdate(update, db)));
};
