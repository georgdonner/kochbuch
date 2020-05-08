/* global importScripts, workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const cacheMap = {
  fontStylesheets: 'google-fonts-stylesheets',
  fontFiles: 'google-fonts-webfonts',
  static: 'static-resources',
  html: 'kochbuch-html',
  uploadcare: 'uploadcare',
};

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

const getWidth = (url) => +url.match(/resize\/\d+/)[0].split('/')[1];

const imageHandler = async ({ url, event }) => {
  const { request } = event;
  const uuid = new URL(url).pathname.split('/')[1];
  const cache = await caches.open(cacheMap.uploadcare);
  let cached = await cache.match(uuid);
  if (cached && (getWidth(request.url) <= getWidth(cached.url))) {
    return cached;
  }
  try {
    const res = await fetch(request);
    if (res) {
      await cache.put(uuid, res);
      cached = await cache.match(uuid);
    }
    return cached;
  } catch (error) {
    return cached;
  }
};

// Cache uploadcare images
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://ucarecdn.com',
  imageHandler,
);
