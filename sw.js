const filesToCache = [
	'/',
	'/index.html'
];
const cacheName = 'static-v1';
const dataCacheName = 'static-v1-api';

// install
self.addEventListener('install', event => {
	console.log('installing…');
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('Caching app ok');
			return cache.addAll(filesToCache);
		})
	);
});

// // activate
self.addEventListener('activate', event => {
	console.log('now ready to handle fetches!');
});

// fetch
self.addEventListener('fetch', event => {
	console.log('[ServiceWorker] Fetch', event.request.url);
	const dataUrl = 'http://localhost:3000';
	console.log('now fetch!');

	// 判斷 event.request.url 裡面有沒有包含 dataUrl
	if (event.request.url.indexOf(dataUrl) === 0) {
		event.respondWith(
			new Promise ((resolve, reject) => {
				setTimeout(() => {
					resolve({data: 'test'});
				},1000)
			})
		)
	} else {

	}
});
