const CACHE_NAME = 'gymtracker-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/manifest.json',
    '/lib/chart.min.js',
    '/js/main.js',
    '/js/data/routineData.js',
    '/js/state/appState.js',
    '/js/services/storage.js',
    '/js/services/api.js',
    '/js/services/notifications.js',
    '/js/ui/exercises.js',
    '/js/ui/history.js',
    '/js/ui/historyEditor.js',
    '/js/ui/progress.js',
    '/js/ui/streak.js',
    '/js/ui/workout.js',
    '/js/ui/theme.js',
    '/js/ui/modal.js',
    '/js/ui/records.js'
];

// Install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
