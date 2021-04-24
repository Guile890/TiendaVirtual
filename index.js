const urlCategoria = 'https://api.mercadolibre.com/sites/MLM/categories'
const urlProducto = 'https://api.mercadolibre.com/sites/MLM/search?category='

async function getCategoriasAPIMerca(){
    let respuesta = await fetch(urlCategoria)
    let data = await respuesta.json();
    return data
}
async function getInfoCategoria(){
    let resultado = await getCategoriasAPIMerca();
    console.log(resultado)
    
}
getInfoCategoria();



async function getProductosByCategoria(id){
    let urlIdProducto = urlProducto + id;
    let respuesta = await fetch(urlIdProducto);
    let data = await respuesta.json();
    return data
}
async function getInfoProductos(id){
    let resultado = await getProductosByCategoria(id);
    console.log(resultado);
    
}
getInfoProductos('MLM1132');

getInfoProductos('MLM1403');

