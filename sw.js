// Simple offline cache para PWA
const CACHE_NAME = 'angel10arcila-maqueta-cache-v1';
const urlsToCache = [
  '/', 
  'index.html',
  'style.css',
  'install.js',
  'manifest.json'
];

// Instalar SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activar SW
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

