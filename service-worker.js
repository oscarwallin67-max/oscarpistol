const cacheName = 'pistolcache-v1';
const filesToCache = [
  'pistol6.html',
  'manifest.json',
  'icon.png'
];

// Install – cache allt
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch – offline fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
