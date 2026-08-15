const CACHE_NAME = 'yanoshi-dashboard-v37'; 

const urlsToCache = [
  'index.html',     // Ganti dari './index.html' menjadi 'index.html'
  'manifest.json',  // Ganti dari './manifest.json' menjadi 'manifest.json'
  'https://yanoshijapan.github.io/asetonline/logohitam.png',
  'https://yanoshijapan.github.io/asetonline/logoappyanoshi.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetching (Gunakan cache jika offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return response dari cache, atau fetch dari network
        return response || fetch(event.request);
      })
  );
});

// Aktivasi dan hapus cache lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
