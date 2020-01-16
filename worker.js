const key = 'v50112441234'
// const fl=[
//     './offline/a.html',
//     './offline/b.html',
//     './offline/c.json',

// ];
self.addEventListener('install', e => {
  // e.waitUntil(caches.open(key).then(g=>
  //     {
  //         g.addAll(fl);
  //     }).then(k=>{
  //         self.skipWaiting();
  //     }))
  console.log('install')
})
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cl => {
      cl.filter(y => y != key).forEach(h => caches.delete(h))
    })
  )
})
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cc=>
    {

    return cc||   fetch(e.request)
      .then(r => {
        console.log('fetch caching')
        const rc = r.clone()
        caches.open(key).then(c => {
          if (rc.status == 200) {
            c.put(e.request, rc)
              return r;
          }
        })
        if (r.status!=200 && e.request.cache=='force-cache') {
          return  caches.match(e.request).then(r => r).then(l=>{
            return l;
          })
        }
        return r;
      })
      .catch(ee => {
        console.log(123, ee)
        return caches.match(e.request).then(r => r)
      })
  

    }))
  console.log('activate')
})