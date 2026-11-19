// Retires the Workbox service worker installed by the old Hexo site (hexo-offline).
// Browsers re-check this URL on every visit; this version clears every cache,
// unregisters itself and reloads open tabs so visitors get the live site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => c.navigate(c.url));
    })(),
  );
});
