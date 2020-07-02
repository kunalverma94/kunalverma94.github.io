version = "v2020-v1.92";
const whitelist = [
  "notes/",
  "/abc/",
  "api.reelgood.com/",
  "/notes/",
  "herokuapp",
  "api.covid19india.org",
  "worker.js",
  "sworker.js",
];
self.addEventListener("install", (e) => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cl) => {
      console.log(cl);
      cl.filter((y) => y != version).forEach((h) => caches.delete(h));
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cc) => {
      console.log(version);
      if (whitelist.find((f) => e.request.url.search(f) > -1)) {
        console.log("whiteListed");
        return fetch(e.request);
      }
      return (
        cc ||
        fetch(e.request)
          .then((r) => {
            console.log("fetch caching");
            const rc = r.clone();
            caches.open(version).then((c) => {
              if (rc.status == 200) {
                c.put(e.request, rc);
                return r;
              }
            });
            if (r.status != 200 && e.request.cache == "force-cache") {
              return caches
                .match(e.request)
                .then((r) => r)
                .then((l) => {
                  return l;
                });
            }
            return r;
          })
          .catch((ee) => {
            console.log(123, ee);
            return caches.match(e.request).then((r) => r);
          })
      );
    })
  );
});
