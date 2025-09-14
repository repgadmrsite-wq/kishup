const CACHE_NAME = 'heyoola-cache-v1';
const CORE = [
  './',
  './index.php',
  './assets/app.css',
  './assets/app.js',
  './assets/manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k===CACHE_NAME? null : caches.delete(k)))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Same-origin only
  if(url.origin === location.origin){
    // cache-first for core and assets
    if (CORE.some(p => url.pathname.endsWith(p.replace('./','/')))
        || url.pathname.includes('/assets/')
        || url.pathname.includes('/img/')){
      event.respondWith(
        caches.match(req).then(res => res || fetch(req).then(r=>{
          const clone = r.clone();
          caches.open(CACHE_NAME).then(c=>c.put(req, clone));
          return r;
        }).catch(()=> caches.match('./index.php')))
      );
      return;
    }
  }
  // default: network-first with fallback to cache
  event.respondWith(
    fetch(req).then(r=>{
      const clone = r.clone();
      caches.open(CACHE_NAME).then(c=>c.put(req, clone));
      return r;
    }).catch(()=> caches.match(req))
  );
});
