self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pwa_prueba').then(cache => {
      return cache.addAll([
        '/',
        '.',
        'index.html',
        'manifest.json',
        'css/critical.min.css',
        'css/non-critical.min.css',
        'img/gauge.png',
        'img/gauge@0,25x.png',
        'img/gauge@0,5x.png'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

