// Version
const CACHE_NAME = "pistolapp-v1";

// Filer att cacha
const urlsToCache = [
  "index.html",
  "pistol6.html",
  "manifest.json",
  "icon.png"
];

// Installera service workern
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ladda från cache först (offline-stöd)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
