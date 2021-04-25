const urlCategoria = 'https://api.mercadolibre.com/sites/MLM/categories'
const urlProducto = 'https://api.mercadolibre.com/sites/MLM/search?category='

async function getCategoriasAPIMerca(){
    let respuesta = await fetch(urlCategoria)
    let data = await respuesta.json();
    return data
}
async function getInfoCategoria(){
    let resultado = await getCategoriasAPIMerca();
    console.log('categorias existentes',resultado)
    
}
getInfoCategoria();

let imagen1 = document.getElementById('imagen1');
let producto1 = document.getElementById('producto1');
let imagen2 = document.getElementById('imagen2');
let producto2 = document.getElementById('producto2');
let imagen3 = document.getElementById('imagen3');
let producto3 = document.getElementById('producto3');
let imagen4 = document.getElementById('imagen4');
let producto4 = document.getElementById('producto4');
let imagen5 = document.getElementById('imagen5');
let producto5 = document.getElementById('producto5');
let imagen6 = document.getElementById('imagen6');
let producto6 = document.getElementById('producto6');
let imagen7 = document.getElementById('imagen7');
let producto7 = document.getElementById('producto7');
let imagen8 = document.getElementById('imagen8');
let producto8 = document.getElementById('producto8');

let producto = [{descripcion: '', imagen:''}];

async function getProductosByCategoria(id){
    let urlIdProducto = urlProducto + id;
    let respuesta = await fetch(urlIdProducto);
    let data = await respuesta.json();
    return data
}
async function getInfoProductos(id){
    let resultado = await getProductosByCategoria(id);
    console.log('productos por categoria--->',resultado);
    console.log('producto[0]--->',resultado.results[0].thumbnail);
    obtenerInformacion(resultado)
    
    
    
}
function obtenerInformacion(resultado){
    for(let i=0;i<resultado.results.length;i++){
        producto.push({descripcion: resultado.results[i].title,imagen: resultado.results[i].thumbnail});        
    }  
        producto1.textContent = producto[1].descripcion;
        producto2.textContent = producto[2].descripcion;
        producto3.textContent = producto[3].descripcion;
        producto4.textContent = producto[4].descripcion;
        producto5.textContent = producto[5].descripcion;
        producto6.textContent = producto[6].descripcion;
        producto7.textContent = producto[7].descripcion;
        producto8.textContent = producto[8].descripcion;
        producto9.textContent = producto[9].descripcion;
        imagen1.setAttribute("src", producto[1].imagen);
        imagen2.setAttribute("src", producto[2].imagen);
        imagen3.setAttribute("src", producto[3].imagen);
        imagen4.setAttribute("src", producto[4].imagen);
        imagen5.setAttribute("src", producto[5].imagen);
        imagen6.setAttribute("src", producto[6].imagen);
        imagen7.setAttribute("src", producto[7].imagen);
        imagen8.setAttribute("src", producto[8].imagen);
        imagen9.setAttribute("src", producto[9].imagen);

    console.log('valor de productos', producto)
}
//getInfoProductos('MLM1648'); // "Computación"

getInfoProductos('MLM1403'); //"Alimentos y Bebidas"
