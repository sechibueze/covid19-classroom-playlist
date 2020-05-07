const API_KEY = 'AIzaSyApUGgHtgkFvndnjlxz5Vf9UVYIqQua5o0';
const cacheName = 'COVID19-v1';
const staticAssests = [
  '/',
  'index.html',
  'offline.html',
  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&key=${API_KEY}&playlistId=PLIh66zCG3ImsDZ7EUAThIaMc9cIAf-lyr`,
  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&key=${API_KEY}&playlistId=PLIh66zCG3Imtr9fNJSxQhRcv-l_suimsS`,
  'https://fonts.googleapis.com/css2?family=Montserrat:ital@1&display=swap',
  'manifest.webmanifest',
  '/css/main.css',
  '/scripts/main.js',
  '/img/learning.png',
  '/img/training-1.png',
  '/img/icons/icon-72x72.png',
  '/img/icons/icon-96x96.png',
  '/img/icons/icon-128x128.png',
  '/img/icons/icon-144x144.png',
  '/img/icons/icon-152x152.png',
  '/img/icons/icon-384x384.png',
  '/img/icons/icon-512x512.png'
];
self.addEventListener('install', event => {
  console.log('[SW]::install event kicked off');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(staticAssests);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW]::activate event kicked off')
});

self.addEventListener('fetch', event => {
  console.log('[SW]::fetch event kicked off');
  event.respondWith(
    caches.match(event.request)
      .then(cachedContentResponse => {
        return cachedContentResponse || fetch(event.request);
      })
  );
});

// self.addEventListener('fetch', event => {
//   console.log('[SW]::fetch event kicked off');
//   event.respondWith(
//     caches.match(event.request)
//       .then(cachedContentResponse => {
//         return cachedContentResponse || fetch(event.request)
//           .then(networkResponse => {
//             console.log('[SW]::fetch networkresponse');
//             caches.open(cacheName).then(cache => {
//               console.log('[SW]::opened cache for update');
//               cache.put(event.request, networkResponse.clone());
//               console.log('[SW]::update cache wt network response');
//               return networkResponse;
//             })
//           }).catch(error => {
//             console.log('[SW]::Network failed::Please connect to network', error);
//           });
//       })
//   );
// });