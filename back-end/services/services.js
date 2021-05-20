const fetch = require('node-fetch');


let Categorias = [];



class Categoria {
    constructor(id, nombre) {
        this.id = id,
        this.nombre = nombre
    }
}
async function getCategoriasAPIMerca() {
    let respuesta = await fetch(process.env.urlCategoria);
    let data = await respuesta.json();
    return data;
}

async function getInfoCategoria() {
    let resultado = await getCategoriasAPIMerca();
    Categorias = [];
    resultado.forEach(element => {
        Categorias.push(new Categoria(element.id, element.name));
    });
    return Categorias;
}
//getInfoCategoria();

async function getProductosByCategoria(id) {
    let urlIdProducto = process.env.urlProducto + id;
    let respuesta = await fetch(urlIdProducto);
    let data = await respuesta.json();
    return data;
}
async function getInfoProductos(id) {
    let resultado = await getProductosByCategoria(id);
    return resultado;
}


async function getProductosBusqueda(cadena){
    console.log('entrando a serviceess')
    let resultado = await getProductosBusquedaCadena(cadena);
    return resultado;
}
async function getProductosBusquedaCadena(cadena){

    let urlApiBusqueda = process.env.urlBusqueda + cadena;
    let respuesta = await fetch(urlApiBusqueda);
    let data = await respuesta.json();
    return data;
}


module.exports = { getInfoProductos, getInfoCategoria, getProductosBusqueda,Categorias };


//getInfoProductos("MLM1132");

//getInfoProductos("MLM1403");