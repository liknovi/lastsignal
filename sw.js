const CACHE = 'posledniy-signal-v1.1.1-story-cg';
const CORE = [
  './', './index.html', './styles.css', './src/story.js', './src/engine.js', './manifest.webmanifest',
  './assets/favicon.svg',
  './assets/backgrounds/archive.jpg',
  './assets/backgrounds/balcony.jpg',
  './assets/backgrounds/bridge.jpg',
  './assets/backgrounds/city.jpg',
  './assets/backgrounds/core.jpg',
  './assets/backgrounds/elevator.jpg',
  './assets/backgrounds/gate.jpg',
  './assets/backgrounds/laboratory.jpg',
  './assets/backgrounds/lazarus.jpg',
  './assets/backgrounds/medbay.jpg',
  './assets/backgrounds/photostudio.jpg',
  './assets/backgrounds/rooftop.jpg',
  './assets/backgrounds/safehouse.jpg',
  './assets/backgrounds/serverroom.jpg',
  './assets/backgrounds/subway.jpg',
  './assets/backgrounds/supermarket.jpg',
  './assets/backgrounds/title.jpg',
  './assets/backgrounds/tunnel.jpg',
  './assets/cg/archive_confession.jpg',
  './assets/cg/balcony_future.jpg',
  './assets/cg/cassette_reveal.jpg',
  './assets/cg/city_approach.jpg',
  './assets/cg/core_door.jpg',
  './assets/cg/echo_core.jpg',
  './assets/cg/final_promise.jpg',
  './assets/cg/first_meet.jpg',
  './assets/cg/helix_gate.jpg',
  './assets/cg/ilya_photo.jpg',
  './assets/cg/lab_hands.jpg',
  './assets/cg/last_console.jpeg',
  './assets/cg/lazarus_first_view.jpg',
  './assets/cg/lazarus_tenderness.jpg',
  './assets/cg/market_dawn.jpg',
  './assets/cg/network_wake.jpg',
  './assets/cg/new_dawn.jpg',
  './assets/cg/night_watch.jpg',
  './assets/cg/photo_studio.jpg',
  './assets/cg/price_sacrifice.jpg',
  './assets/cg/quiet_rooftop.jpg',
  './assets/cg/radio_91.jpg',
  './assets/cg/red_elevator.jpg',
  './assets/cg/rooftop_escape.jpg',
  './assets/cg/safehouse_arrival.jpg',
  './assets/cg/vita_file.jpg',
  './assets/cg/vita_protocol.jpg',
  './assets/cg/voice_in_lazarus.jpg',
  './assets/characters/elena.png',
  './assets/characters/konstantin.png',
  './assets/characters/lev.png',
  './assets/characters/marta.png',
  './assets/characters/vita.png',
  './assets/audio/finale.mp3',
  './assets/audio/horror.mp3',
  './assets/audio/menu_theme.mp3',
  './assets/audio/romance.mp3',
  './assets/audio/safehouse.mp3',
  './assets/audio/tension.mp3'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => {
    if (cached) return cached;
    return fetch(event.request).then(response => {
      if (response && response.status === 200 && response.type === 'basic') {
        const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match('./index.html'));
  }));
});
