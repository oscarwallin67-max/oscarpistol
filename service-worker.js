// Version
const CACHE_NAME = "pistolapp-v2";

// Filer att cacha
const urlsToCache = [
  "/oscarpistol/",
  "/oscarpistol/pistol6.html",
  "/oscarpistol/manifest.webmanifest",
  "/oscarpistol/icon.png"
];

// Installera service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Aktivera (rensa gammal cache)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Ladda från cache först (offline-stöd)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
