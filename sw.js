const API_KEY = 'AIzaSyApUGgHtgkFvndnjlxz5Vf9UVYIqQua5o0';
const cacheName = 'COVID19-v1';
// const currentCaches = [cacheName];
const playlistIds = [
  // Maths
  'PLXtv1pLcePyd8vo2F3XdMjS_se8peMPex',
  'PLKi4WTp6PRGVdzZwuZ7l2iePX_qCQUbjp',
  'PLGTDzEcmZty0dcCSeSlr_jDOjScIsuSF7',
  'PL3evXeWNDG0ZCqwTicazVjKfFkonTLzub',
  'PLKi4WTp6PRGVVH8hEaTUaaHTjR7XB4_WW',
  'PLC3F4EDE79AD84E67',
  'PLQqF8sn28L9yTV9WxpHw-9BbqRe_f49fr',
  'PLrHVSJmDPvlrw2tjqfIg5KEkAQA1Jw-qf',
  // Eng
  'PLXtv1pLcePye5q58o5gPMgnfOdZaTxpmH',
  'PLcnpd5fa0dQNHHPwjjI_Ow8ubEFxfbhgV',
  'PLB3505EAB43526725',
  // BST
  'PLXtv1pLcePydBKWylG4gy6WZyiORrNg_h',
  'PLD8848BFDF2F06F08',
  'PL4VStNgKi0FkrCh_9v7UVSN7UoqqRjacs',
  'PLLF_mZmNqOn25pLFQkhJBl6gxHeKyB0Mo',
  'PL8B0DB9FA7252FD2E',
  'PL2MsUPBdnyY6o9iCai7XeJm5L9drmBPU8'
]

const ytPlaylistURLs = composePlaylistURLs(playlistIds);
const defaultAssets = [
  '/',
  'index.html',
  'offline.html',
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
const staticAssests = defaultAssets.concat(ytPlaylistURLs);
// console.log('SW static Assets', staticAssests);
self.addEventListener('install', event => {
  console.log('[SW]::install event kicked off');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(staticAssests);
      })
  );
});
console.log('All caches', caches.keys())
self.addEventListener('activate', event => {
  console.log('[SW]::activate event kicked off')
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        console.log('existing caches', key)
        console.log('my cahe caches', cacheName)
        if (key !== cacheName) {
          console.log('Not same', cacheName, key)
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('SW now ready to handle fetches!');
    })
  );

});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          console.log('fetched from network')
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
// self.addEventListener('fetch', event => {
//   console.log('[SW]::fetch event kicked off');
//   event.respondWith(
//     caches.match(event.request)
//       .then(cachedContentResponse => {
//         return cachedContentResponse || fetch(event.request);
//       })
//   );
// });

function composePlaylistURLs(playlistIds){
  const playlistURLs = playlistIds.map(playlistId => {
    return `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&key=${API_KEY}&playlistId=${playlistId}`
  });
  return playlistURLs;
}
