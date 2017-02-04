self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('realtime_r9').then(cache => {
      return cache.addAll([
        '/',
        'index.html',
        '/manifest.json',
        'app.png',
        'reset.min.css',
        'reset.min.css.map',
        'style.min.css',
        'style.min.css.map',
        'print.min.css',
        'print.min.css.map'
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

