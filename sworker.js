if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("./worker.js")
    .then((w) => console.warn("Strong offline policy Service Worker"))
    .catch((w) => console.error("error catch"));
}
