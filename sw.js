// Service worker de la app del celular de PalacioPYM: permite instalarla.
// No guarda datos de la tienda; todo viene de internet. Sin internet muestra la página guardada.
var CACHE = 'ppym-v3';
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(['./', 'index.html', 'manifest.webmanifest', 'icon-192.png']); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request).then(function (r) { return r || caches.match('index.html'); }); }));
});
