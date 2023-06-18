/* global importScripts, workbox */
/* eslint-disable no-restricted-globals */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.__WB_DISABLE_DEV_LOGS = true;

const cacheMap = {
  fontStylesheets: 'google-fonts-stylesheets',
  fontFiles: 'google-fonts-webfonts',
  static: 'static-resources',
  html: 'kochbuch-html',
  images: 'images',
};

const clearCaches = async () => {
  const cacheNames = await caches.keys();
  const filtered = cacheNames.filter((name) => !Object.values(cacheMap).includes(name));
  return Promise.all(filtered.map((name) => caches.delete(name)));
};

// Clear unnecessary caches
self.addEventListener('activate', (e) => {
  e.waitUntil(clearCaches());
});

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cacheMap.fontStylesheets,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: cacheMap.fontFiles,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

// Cache all static resources (stale while revalidate)
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'script'
    || request.destination === 'style'
    || request.url.match(/.png/)
    || request.url.match(/.ttf/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cacheMap.static,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

// Cache index.html
workbox.routing.registerRoute(
  ({ url }) => {
    const { pathname } = new URL(url);
    return pathname === '/' || pathname === '/list' || pathname.startsWith('/recipe');
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cacheMap.html,
    plugins: [{
      cacheKeyWillBeUsed: () => 'index',
    }],
  }),
);

const getWidth = (url) => +url.match(/\d+.jpg/)[0].split('.')[0];

const imageHandler = async ({ url, event }) => {
  const { request } = event;
  const uuid = new URL(url).pathname.split('/')[1].split('_')[0];
  const cache = await caches.open(cacheMap.images);
  let cached = await cache.match(uuid);
  if (cached && !cached.ok) {
    await cache.delete(cached);
    cached = null;
  }
  if (cached && (getWidth(request.url) <= getWidth(cached.url))) {
    return cached;
  }
  try {
    const res = await fetch(request.url, { mode: 'cors' });
    if (res && res.ok) {
      await cache.put(uuid, res);
      cached = await cache.match(uuid);
    }
    return cached;
  } catch (error) {
    return cached;
  }
};

// Cache images
workbox.routing.registerRoute(
  ({ url }) => url.origin.match(/amazonaws.com/),
  imageHandler,
);
