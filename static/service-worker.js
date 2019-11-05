/* eslint-disable no-restricted-globals */
const cacheName = 'v1';

const openDb = (dbName) => new Promise((resolve, reject) => {
  const request = self.indexedDB.open(dbName);
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
});

const reqPromise = (req) => new Promise((resolve, reject) => {
  req.onerror = reject;
  req.onsuccess = () => {
    resolve(req.result);
  };
});

// eslint-disable-next-line no-undef
importScripts('/scripts/recipe-template.js');

self.addEventListener('activate', (e) => {
  const assets = ['/offline'];
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(assets);
      })
      .then(() => self.skipWaiting()),
  );
  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cache) => {
        if (cache !== cacheName) {
          return caches.delete(cache);
        }
        return false;
      }),
    )),
  );
});

async function getRecipe(id) {
  const db = await openDb('recipes-db', { name: 'recipes', keyPath: '_id' });
  if (!db) {
    throw new Error('No db found');
  }
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const req = store.get(id);
  return reqPromise(req);
}

function isRecipeView(url) {
  return url.origin === location.origin && url.pathname.startsWith('/recipe/');
}

function renderRecipe(url) {
  const recipeId = url.pathname.split('/')[2];
  return getRecipe(recipeId).then((recipe) => (
    // eslint-disable-next-line no-undef
    new Response(template({
      recipe,
      descriptionHtml: recipe.description,
      session: {},
      servings: recipe.servings,
    }), { headers: { 'Content-Type': 'text/html' } })
  ));
}

function fetchRequest(request) {
  return fetch(request)
    .then((res) => {
      const resClone = res.clone();
      caches.open(cacheName).then((cache) => {
        cache.put(request, resClone);
      });
      return res;
    })
    .catch(() => caches.match(request).then((res) => {
      if (res) {
        return res;
      }
      const url = new URL(request.url);
      // eslint-disable-next-line no-undef
      if (isRecipeView(url) && 'template' in self) {
        return renderRecipe(url);
      } if (url.origin === 'https://ucarecdn.com') {
        const uuid = url.pathname.split('/')[1];
        const imgWidths = [400, 600, 800, 1000];
        const getImgUrl = (width, doubleRes = false) => (
          url.origin.concat('/', uuid, `/-/resize/${width}x/`, `-/quality/${doubleRes ? 'lightest' : 'lighter'}/`, '-/progressive/yes/')
        );
        const imgUrls = [];
        imgWidths.forEach((width) => {
          imgUrls.push(getImgUrl(width), getImgUrl(width * 2, true));
        });
        return Promise.all(imgUrls.map((imgUrl) => caches.match(imgUrl)))
          .then((responses) => {
            const filtered = responses.filter((response) => response);
            if (filtered.length > 0) {
              const getWidth = (resizeUrl) => +resizeUrl.match(/resize\/\d+/)[0].split('/')[1];
              filtered.sort((a, b) => getWidth(b.url) - getWidth(a.url));
              return filtered[0];
            }
            return undefined;
          });
      }
      return caches.match('/offline').then((r) => r);
    }));
}

function cacheFirst(e) {
  return caches.match(e.request).then((res) => {
    if (res) {
      return res;
    }
    return fetchRequest(e.request);
  });
}

self.addEventListener('fetch', (e) => {
  if (e.request.method === 'GET') {
    const url = new URL(e.request.url);
    const local = url.origin === location.origin;
    const cacheLocal = ['/scripts/nosleep.js', '/assets/tomato-icon-192.png', '/assets/tomato-icon.png', '/manifest.json'];
    if (url.pathname.startsWith('/api')) {
      return; // don't cache API requests at all
    }
    if (local && !cacheLocal.includes(url.pathname)) {
      if (isRecipeView(url) && 'template' in self) {
        // get server response with 5 second timeout, render offline otherwise
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const renderOffline = async () => {
          await sleep(5000);
          return renderRecipe(url);
        };
        const firstPromise = Promise.race([fetchRequest(e.request), renderOffline()]);
        e.respondWith(firstPromise);
      } else {
        e.respondWith(fetchRequest(e.request));
      }
    } else {
      e.respondWith(cacheFirst(e));
    }
  }
});

const getListUpdates = async (db) => {
  const store = db.transaction('list-updates').objectStore('list-updates');
  const req = store.getAll();
  return reqPromise(req);
};

async function processListUpdates(currentList, listUpdates) {
  const res = await fetch('/api/list/updates', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ list: currentList, updates: listUpdates }),
  });
  const body = await res.json();
  return body.list;
}

const clearObjectStore = async (db, objStore) => {
  const store = db.transaction(objStore, 'readwrite').objectStore(objStore);
  const clearReq = store.clear();
  return reqPromise(clearReq);
};


const getListDb = async () => {
  const db = await openDb('list-db');
  const store = db.transaction('list', 'readwrite').objectStore('list');
  const req = store.get('main-list');
  const result = await reqPromise(req);
  return result.list;
};

const updateListDb = async (list) => {
  const db = await openDb('list-db');
  const store = db.transaction('list', 'readwrite').objectStore('list');
  const req = store.put({ name: 'main-list', list });
  const result = await reqPromise(req);
  return result.list;
};

async function listSync() {
  const db = await openDb('list-db');
  if (!db) {
    throw new Error('No db found');
  }
  const currentList = await getListDb(db);
  const listUpdates = await getListUpdates(db);
  const updatedList = await processListUpdates(currentList, listUpdates);
  await clearObjectStore(db, 'list-updates');
  const channel = new BroadcastChannel('listSync');
  channel.postMessage({ list: updatedList });
  return updateListDb(updatedList);
}

self.addEventListener('sync', (e) => {
  if (e.tag === 'listSync') {
    e.waitUntil(listSync());
  }
});
