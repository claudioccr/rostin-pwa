// ------------------------------------------------------------
// SERVICE WORKER AUTOMÁTICO PARA PWA
// ------------------------------------------------------------

// Nombre base del caché (no requiere cambiar versión a mano)
const CACHE_NAME = "pwa-cache";

const urlsToCache = [
  '/',
  '/index.html',
  // '/styles.css',  <-- Descomenta y añade tus archivos CSS
  // '/script.js',   <-- Descomenta y añade tus archivos JS
  // '/icon.png'
];

// Evento de instalación: Se dispara cuando el navegador detecta el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activación: Limpia cachés antiguas si actualizas la versión
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

// Evento Fetch: Intercepta las peticiones. Si el archivo está en caché, lo sirve desde ahí.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si hay respuesta en caché, la devolvemos
        if (response) {
          return response;
        }
        // Si no, hacemos la petición a internet
        return fetch(event.request);
      })
  );
});
