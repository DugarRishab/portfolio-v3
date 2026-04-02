const CACHE_NAME = "rishab_dugar";
const ASSETS_TO_CACHE = ["/", "/index.html", "/favicon.svg", "/manifest.json"];

// Install event - cache assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS_TO_CACHE).catch(() => {
				// Gracefully handle cache failures
				return Promise.resolve();
			});
		}),
	);
	self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
	self.clients.claim();
});

// // Fetch event - serve from cache, fallback to network
// self.addEventListener("fetch", (event) => {
// 	// Skip non-GET requests
// 	if (event.request.method !== "GET") {
// 		return;
// 	}

// 	event.respondWith(
// 		caches.match(event.request).then((response) => {
// 			if (response) {
// 				return response;
// 			}

// 			return fetch(event.request)
// 				.then((response) => {
// 					// Don't cache non-successful responses
// 					if (
// 						!response ||
// 						response.status !== 200 ||
// 						response.type === "error"
// 					) {
// 						return response;
// 					}

// 					// Clone the response
// 					const responseToCache = response.clone();

// 					// Only cache HTTP/HTTPS requests (not chrome-extension, etc.)
// 					const url = new URL(event.request.url);
// 					if (url.protocol === "http:" || url.protocol === "https:") {
// 						// Cache successful responses
// 						caches.open(CACHE_NAME).then((cache) => {
// 							cache.put(event.request, responseToCache);
// 						});
// 					}

// 					return response;
// 				})
// 				.catch(() => {
// 					// Return a fallback response if offline
// 					return new Response("Offline - content not available", {
// 						status: 503,
// 						statusText: "Service Unavailable",
// 						headers: new Headers({
// 							"Content-Type": "text/plain",
// 						}),
// 					});
// 				});
// 		}),
// 	);
// });
