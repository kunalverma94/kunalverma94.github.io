if (navigator.serviceWorker) {
    console.log(`presemt`);
    navigator.serviceWorker
    .register("./worker.js")
    .then((w)=>console.log('worker then'))
    .catch((w)=>console.log('error catch'));
    console.log('...');
}