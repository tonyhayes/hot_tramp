// https://jakearchibald.com/2014/offline-cookbook/
// http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html#.V-2eNZMrJTZ


// service worker - offline mode - always fetch from the network (and cache the results) - fallback to cache only when offline
// the negative to this approach is that I have truned off webpack chunking 
// - the page load will therefore be much longer than otherwise

// by incrementing the cache name, the old cached items will be purged in the activate funciton

var CACHE_NAME = 'dc-cache-v1';
var urlsToCache = [
    '/',
    '/main.bundle.js',
    '/polyfills.bundle.js',
    '/vendor.bundle.js',
    '/webpack-dev-server.js',
    '/initial.css',
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

//always fetch from the network (and cache the results) - fallback to cache only when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {

            if (response && !response.ok) {
                // An HTTP error response code (40x, 50x) won't cause the fetch() promise to reject.
                // We need to explicitly throw an exception to trigger the catch() clause.
                throw Error('response status ' + response.status);
            }

            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('adding to cache')
                send_message_to_all_clients('adding to cache: '+event.request.url)
                cache.put(event.request, responseToCache);
            });

            return response;

        })
        .catch(function() {
            console.log('getting from cache')
            send_message_to_all_clients('getting from cache: '+event.request.url)
           return caches.match(event.request);
        })
    );
});

// this is the method to use to clear out the old cached resources
self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['dc-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage("from SW: '"+msg+"'", [msg_chan.port2]);
    });
}

function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
        })
    })
}