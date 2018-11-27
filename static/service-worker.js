/* eslint-disable no-restricted-globals */
const cacheName = 'v1';
let db;

function initDatabase() {
  const request = self.indexedDB.open('recipes-db');
  request.onerror = () => {
    console.error(`DB request error: ${request.errorCode}`);
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    db.onerror = (dbEvent) => {
      console.error(`Database error: ${dbEvent.target.errorCode}`);
    };
  };
  request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore('recipes', { keyPath: '_id' });
  };
}

initDatabase();

self.addEventListener('install', () => {
  // eslint-disable-next-line no-undef
  importScripts('/scripts/recipe-template.js');
});

self.addEventListener('activate', (e) => {
  const assets = [
    '/css/recipe.css', '/scripts/lib/recipe.js',
    '/list', '/css/list.css', '/scripts/lib/list.js',
    '/offline',
  ];
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(assets);
      })
      .then(() => self.skipWaiting()),
  );
  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map((cache) => {
        if (cache !== cacheName) {
          return caches.delete(cache);
        }
        return false;
      }),
    )),
  );
});

function matchRecipe(recipe, terms) {
  // eslint-disable-next-line arrow-body-style
  const matched = terms.filter((term) => {
    return recipe.title.toLowerCase().includes(term)
        || recipe.ingredients.find(ingr => ingr.name.toLowerCase().includes(term))
        || recipe.categories.find(ctg => ctg.toLowerCase().includes(term));
  });
  return matched.length === terms.length;
}

function searchRecipes(query) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('No db found'));
    }
    const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
    const req = store.getAll();
    req.onsuccess = () => {
      if (!query) {
        resolve(req.result);
      }
      const terms = query.split(/,\s*/).map(term => term.toLowerCase());
      const filtered = req.result.filter(recipe => matchRecipe(recipe, terms));
      resolve(filtered);
    };
  });
}

function getRecipe(id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('No db found'));
    }
    const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
    const req = store.get(id);
    req.onsuccess = () => {
      resolve(req.result);
    };
  });
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
      const url = new URL(request.url);
      if (!res && url.origin === location.origin && url.pathname === '/api/recipes') {
        // eslint-disable-next-line arrow-body-style
        return searchRecipes(url.searchParams.get('search')).then((recipes) => {
          const limit = +url.searchParams.get('limit') || 15;
          const page = +url.searchParams.get('page') || 1;
          const body = {
            recipes: recipes.slice((page - 1) * limit, page * limit),
            total: recipes.length,
          };
          return new Response(JSON.stringify(body), {
            headers: { 'Content-Type': 'application/json' },
          });
        });
      }
      // eslint-disable-next-line no-undef
      if (!res && url.origin === location.origin && url.pathname.startsWith('/recipe/') && template) {
        const recipeId = url.pathname.split('/')[2];
        return getRecipe(recipeId).then(recipe => (
          // eslint-disable-next-line no-undef
          new Response(template({
            recipe,
            descriptionHtml: recipe.description,
            session: {},
            servings: recipe.servings,
          }), { headers: { 'Content-Type': 'text/html' } })
        ));
      } if (!res && url.origin === 'https://ucarecdn.com') {
        const uuid = url.pathname.split('/')[1];
        const imgWidths = [400, 600, 800, 1000];
        const getImgUrl = (width, doubleRes = false) => (
          url.origin.concat('/', uuid, `/-/resize/${width}x/`, `-/quality/${doubleRes ? 'lightest' : 'lighter'}/`, '-/progressive/yes/')
        );
        const imgUrls = [];
        imgWidths.forEach((width) => {
          imgUrls.push(getImgUrl(width), getImgUrl(width * 2, true));
        });
        return Promise.all(imgUrls.map(imgUrl => caches.match(imgUrl)))
          .then((responses) => {
            const filtered = responses.filter(response => response);
            if (filtered.length > 0) {
              const getWidth = resizeUrl => +resizeUrl.match(/resize\/\d+/)[0].split('/')[1];
              filtered.sort((a, b) => getWidth(b.url) - getWidth(a.url));
              return filtered[0];
            }
            return undefined;
          });
      }
      if (!res) {
        return caches.match('/offline').then(r => r);
      }
      return res;
    }));
}

self.addEventListener('fetch', (e) => {
  if (e.request.method === 'GET') {
    const url = new URL(e.request.url);
    const local = url.origin === location.origin;
    if (local) {
      e.respondWith(fetchRequest(e.request));
    } else {
      e.respondWith(
        caches.match(e.request).then((res) => {
          if (res) {
            return res;
          }
          return fetchRequest(e.request);
        }),
      );
    }
  }
});

function updateDatabase(recipes) {
  if (!db) { return; }
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const clearReq = store.clear();
  clearReq.onsuccess = () => {
    recipes.forEach((recipe) => {
      store.add(recipe);
    });
  };
}

self.addEventListener('message', (e) => {
  if (e.data && e.data.recipes) {
    if (e.data.shouldUpdate) {
      fetch('/api/recipes/compressed')
        .then((res) => {
          if (res.ok) { return res.json(); }
          return [];
        })
        .then((recipes) => {
          if (recipes.length > 0) {
            updateDatabase(recipes);
          }
        });
    }
  }
});
