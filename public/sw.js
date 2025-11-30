// ------------------------------------------------------------
// SERVICE WORKER AUTOMÁTICO PARA PWA
// ------------------------------------------------------------

// Nombre base del caché (no requiere cambiar versión a mano)
const CACHE_NAME = "pwa-cache";

// Archivos base que se deben almacenar
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

// ------------------------------------------------------------
// INSTALACIÓN: Guarda recursos iniciales
// ------------------------------------------------------------
self.addEventListener("install", event => {
  console.log("[SW] Instalando...");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS);
    })
  );

  // Fuerza instalación inmediata
  self.skipWaiting();
});

// ------------------------------------------------------------
// ACTIVACIÓN: Limpia cachés viejos automáticamente
// ------------------------------------------------------------
self.addEventListener("activate", event => {
  console.log("[SW] Activado. Limpiando cachés antiguas...");

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Caché eliminada:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  // Toma control sin recargar
  self.clients.claim();
});

// ------------------------------------------------------------
// FETCH: Estrategia "Network First" con fallback a caché
//
// Esto garantiza:
// ✔ Siempre intenta obtener la versión más nueva del servidor
// ✔ Si no hay internet, usa la caché sin romper la PWA
// ------------------------------------------------------------
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Guarda una copia en caché (solo GET)
        if (event.request.method === "GET") {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intenta usar la caché
        return caches.match(event.request);
      })
  );
});
