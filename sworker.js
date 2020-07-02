const version = "v2020-v1.9";
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("./worker.js")
    .then((w) => {
      document.cookie = "v2020-v1.6";
      console.warn("Strong offline policy Service Worker");
      caches.keys().then((v) => {
        let _v = v.find((h) => h != version);
        if (_v) {
          w.unregister();
          caches.delete(_v);
        }
      });
    })
    .catch((w) => console.error("error catch"));
}
