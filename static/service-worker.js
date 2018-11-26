/* eslint-disable no-restricted-globals */
const cacheName = 'v1';

self.addEventListener('activate', (e) => {
  const assets = [
    '/css/recipe.css', '/scripts/lib/recipe.js',
    '/list', '/css/list.css', '/scripts/lib/list.js',
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
      if (!res && url.origin === 'https://process.filestackapi.com' && url.pathname.includes('w:2000')) {
        return caches.match(new Request(url.href.replace('w:2000', 'w:600'))).then(r => r);
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

self.addEventListener('message', (e) => {
  if (e.data && e.data.recipes) {
    const { recipes } = e.data;
    const requests = recipes.map(recipe => new Request(`/recipe/${recipe._id}`));
    const cached = requests.map(request => (
      caches.match(request).then(res => res ? null : request.url)
    ));
    Promise.all(cached)
      .then((urls) => {
        const toCache = urls.filter(url => url);
        caches.open(cacheName).then((cache) => {
          cache.addAll(toCache);
        });
      });
  }
});
