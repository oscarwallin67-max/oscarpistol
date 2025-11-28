const CACHE_NAME = "pistolapp-v7";

const urlsToCache = [
  "/oscarwallin67-max/oscarpistol/",
  "/oscarwallin67-max/oscarpistol/index.html",
  "/oscarwallin67-max/oscarpistol/pistol6.html",
  "/oscarwallin67-max/oscarpistol/manifest.json",
  "/oscarwallin67-max/oscarpistol/icon.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      );
    })
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
