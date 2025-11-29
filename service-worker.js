// --------------------------------------
// PistolApp – Service Worker v3
// Optimerad för iPhone + Chrome
// --------------------------------------

const CACHE_NAME = "pistolapp-v3";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./pistol-16.png",
  "./pistol-32.png",
  "./pistol-192.png",
  "./pistol-512.png",
];

// Installera SW och cache:a filer
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Aktivera SW och rensa gammal cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Hämta filer (offline-stöd)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Returnera cache → annars hämta från nätet
      return response || fetch(event.request);
    })
  );
});
