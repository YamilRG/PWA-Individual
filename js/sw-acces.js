function actualizarCacheDinamico(dynamicCache, request, response){
    if(response.ok){
        return caches.open(dynamicCache).then(cache =>{
            cache.put(request, response.clone());
            return cache.clone();
        });
    }else{
        return response;
    }
}