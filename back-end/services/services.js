const fetch = require('node-fetch');

async function getCategoriasAPIMerca() {
    let respuesta = await fetch(process.env.urlCategoria);
    let data = await respuesta.json();
    return data;
}
async function getInfoCategoria() {
    let resultado = await getCategoriasAPIMerca();
    return resultado;
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
    console.log(resultado);
    return resultado;
}

module.exports = { getInfoProductos, getInfoCategoria};


//getInfoProductos("MLM1132");

//getInfoProductos("MLM1403");