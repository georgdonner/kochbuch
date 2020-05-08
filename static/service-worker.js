/* global importScripts, workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const cacheMap = {
  fontStylesheets: 'google-fonts-stylesheets',
  fontFiles: 'google-fonts-webfonts',
  static: 'static-resources',
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
    || request.url === `${new URL(request.url).origin}/`
    || request.url.match(/.png/)
    || request.url.match(/.ttf/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cacheMap.static,
  }),
);

const getAllImgUrls = (url) => {
  const [cdnUrl] = url.split('/-/resize');
  const imgWidths = [400, 600, 800, 1000];
  const getImgUrl = (width, doubleRes = false) => (
    cdnUrl.concat(`/-/resize/${width}x/`, `-/quality/${doubleRes ? 'lightest' : 'lighter'}/`, '-/progressive/yes/')
  );
  const imgUrls = [];
  imgWidths.forEach((width) => {
    imgUrls.push(getImgUrl(width), getImgUrl(width * 2, true));
  });
  return imgUrls;
};

const getWidth = (url) => +url.match(/resize\/\d+/)[0].split('/')[1];

const getImagesFromCache = async (cache, url) => {
  const imgUrls = getAllImgUrls(url);
  const allCached = await Promise.all(
    imgUrls.map((imgUrl) => cache.match(imgUrl)),
  );
  const filtered = allCached.filter((res) => res);
  filtered.sort((a, b) => getWidth(b.url) - getWidth(a.url));
  return filtered;
};

const uploadcarePlugin = {
  cacheWillUpdate: async ({ request, response }) => {
    const cache = await caches.open(cacheMap.uploadcare);
    const cached = await getImagesFromCache(cache, request.url);
    if (cached.length) {
      if (getWidth(response.url) > getWidth(cached[0].url)) {
        // new image has better quality than all cached -> update cache
        await Promise.all(cached.map((res) => cache.delete(res.url)));
        return response;
      }
      return null;
    }
    return response;
  },
  cacheKeyWillBeUsed: async ({ request, mode }) => {
    if (mode === 'read') {
      const cache = await caches.open(cacheMap.uploadcare);
      const [cached] = await getImagesFromCache(cache, request.url);
      if (cached && getWidth(request.url) <= getWidth(cached.url)) {
        // cached image has equal or better quality than required -> return cache result
        return cached.url;
      }
    }
    return request;
  },
};

// Cache uploadcare images

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://ucarecdn.com',
  new workbox.strategies.CacheFirst({
    cacheName: cacheMap.uploadcare,
    plugins: [uploadcarePlugin],
  }),
);
