const STATIC_CACHE = 'Cache-v1';
const DYNAMIC_CACHE = 'Dynamic-v1';
const INMUTABLE_CACHE = 'Inmutable-v1';
const APP_SHEll = [
    '/', 
    'index.html', 
    'css/style.css', 
    'img/favico.ico', 
    'js/app.js', 
    'img/Debian.png', 
    'img/Debian2.png', 
    'img/Debian3.png', 
    'img/Debian4.png',
    'js/app.js',
    'js/sw-acces.js']; 




const APP_IMMUTABLE = [
'https://fonts.googleapis.com/css?family=Quicksand:300,400',
'https://fonts.googleapis.com/css?family=Lato:400,300',
'https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css',
'js/libs/jquery.json'];




//Instalacion

self.addEventListener('install', event => {
    const cacheStatic =  caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHEll);
    });
    const cacheInmutable =  caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_IMMUTABLE);
    });

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


//Activacion

self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key =>{
            if (key!== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });
    }); 
    event.waitUntil(respuesta);
});

//Estrategia de Cache

self.addEventListener('fetch', event => {
    const respuestaFullback = caches.match(event.request).then(respuesta => {
        if (respuesta) return respuesta;
        console.log("No existe, error de red");

        fetch(event.respuesta).then(newRespuesta => {
            caches.open(DYNAMIC_CACHE).then(cache =>{
                cache.put(event.request, newRespuesta);

            });
            return newRespuesta.clone();

        }).catch(error => {
            console.log("catch fetch");
            if(event.request.headers.get('accept').includes('text/html')){
                return caches.match('/pages/no-response.html');
            }

        });

    });
    event.respondWith(respuestaFullback);
});

import('sw-acces.js');