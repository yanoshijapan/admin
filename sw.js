const CACHE_NAME = 'yanoshi-dashboard-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://yanoshijapan.github.io/asetonline/logoappyanoshi.png' /* <--- Link logo dimasukkan ke sini */
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
        return response || fetch(event.request);
      })
  );
});
