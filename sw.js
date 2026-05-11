const CACHE_NAME = 'yanoshi-dashboard-v1';
const urlsToCache = [
  './',
  './appyanoshi2.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch dari Cache atau Jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan response cache
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
