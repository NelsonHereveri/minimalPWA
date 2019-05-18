let CACHE_NAME = 'pwa_prueba';

/* Cualquier archivo que consideres estático (CSS, imágenes, fuentes, JS, plantillas, etc) */
let STATIC_FILES = [
  'index.html',
  'manifest.json',
  'css/critical.min.css',
  'css/non-critical.min.css',
  'img/gauge.png',
  'img/gauge@0,25x.png',
  'img/gauge@0,5x.png'
];

/* Igual que el anterior, pero no demora la instalación */
let BIG_STATIC_FILES = [];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(BIG_STATIC_FILES);
      return cache.addAll(STATIC_FILES)
        .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(e.request).then(response => {
        let fetchPromise = fetch(e.request).then(networkResponse => {
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      });
    })
  );
});

self.addEventListener('activate',  e => {
  e.waitUntil(self.clients.claim());
});
