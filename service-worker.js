const CACHE_NAME = "pistolapp-v3";

const urlsToCache = [
  "/oscarpistol/",
  "/oscarpistol/index.html",
  "/oscarpistol/pistol6.html",
  "/oscarpistol/manifest.json",
  "/oscarpistol/icon.png"
];

// Installera service worker och cacha filer
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Aktivera och rensa gammal cache
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

// Offline-stöd: cache först, nät sen
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
