const CACHE_NAME = "pistolapp-v10";

const urlsToCache = [
  "/oscarpistol/",
  "/oscarpistol/index.html",
  "/oscarpistol/pistol6.html",
  "/oscarpistol/manifest.json",
  "/oscarpistol/icon.png",
  "/oscarpistol/service-worker.js"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(
      resp => resp || fetch(event.request)
    )
  );
});
