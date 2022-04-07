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
'js/libs/jquery'];


import('js/sw-acces.js');

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