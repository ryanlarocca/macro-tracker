// Network-only service worker — always serve fresh content
const CACHE_NAME = 'mt-cache-v10';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Always go to network, never cache
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
