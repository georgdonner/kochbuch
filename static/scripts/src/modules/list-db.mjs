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

export const getList = async () => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const store = db.transaction('list', 'readwrite').objectStore('list');
    const req = store.get('main-list');
    req.onerror = reject;
    req.onsuccess = async () => {
      resolve(req.result.list);
    };
  });
};


export const updateList = async (list) => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const store = db.transaction('list', 'readwrite').objectStore('list');
    const req = store.put({ name: 'main-list', list });
    req.onerror = reject;
    req.onsuccess = async () => {
      resolve(req.result.list);
    };
  });
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

const getRemoved = (oldList, newList) => oldList.filter((item) => !newList.includes(item));

export const addListUpdates = async (newList) => {
  const db = await openDb();
  const oldList = await getList();
  const removed = getRemoved(oldList, newList).map((item) => ({ item, action: 'removed' }));
  return Promise.all(removed.map((update) => addListUpdate(update, db)));
};

const sendData = async (list) => fetch('/api/list', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ list }),
});

const incrementDuplicate = (match, group) => {
  const num = Number(group.match(/\d+/)[0]);
  return match.replace(group, group.replace(/\d+/, num + 1));
};

const checkDuplicates = (list) => {
  const newList = [];
  list.forEach((item) => {
    const regex = new RegExp(`${item}(\\s*\\(\\d+x\\))?$`);
    const duplicateIndex = newList.findIndex((i) => i.match(regex));
    if (duplicateIndex !== -1) {
      const [match, group] = newList[duplicateIndex].match(regex);
      const updated = group ? incrementDuplicate(match, group) : `${match} (2x)`;
      newList.splice(duplicateIndex, 1, updated);
    } else {
      newList.push(item);
    }
  });
  return newList;
};

export const putList = async (list) => {
  const updated = checkDuplicates(list);
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      await addListUpdates(updated);
      await updateList(updated);
      const reg = await navigator.serviceWorker.ready;
      reg.sync.register('listSync');
    } catch (error) {
      console.error(error);
      await updateList(updated);
      sendData(updated);
    }
  } else {
    await updateList(updated);
    sendData(updated);
  }
};
