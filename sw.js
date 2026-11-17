const C = "deutsch-bea-v16";
const F = ["./", "index.html", "style.css", "data.js", "vocab.js", "content.js", "prep.js", "verbs-b2.js", "partizip.js", "casi.js", "preposizioni.js", "connettori.js", "scrittura.js", "app.js", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(F.map(u => new Request(u, { cache: "reload" }))))); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.hostname.includes("googleapis.com") && !u.hostname.startsWith("fonts")) return; // Gemini: mai in cache
  const font = u.hostname.startsWith("fonts.");
  if (font) { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(n => { const cp = n.clone(); caches.open(C).then(c => c.put(e.request, cp)); return n; }))); return; }
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then(r => { if (r.ok) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
});
