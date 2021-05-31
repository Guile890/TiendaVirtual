const modelProductos = require('../modelo/modelo.producto')


//Listar prouctos
module.exports.listarProductos = async ()=>{
    try {
        let resultado = await modelProductos.getProductos()
        return resultado
    }catch (err){
        console.log('Error de modelos' + err)
        throw new Error ('Ocurrio un problema en productos.service')
    }
} 
// insertar nuevo producto
module.exports.insertProducto = async (producto) => {
    let data = producto
    try{
        let resultado = await modelProductos.insertProducto(data)
        return 'Productos insertado'
    }
    catch(error){
        throw new Error ('Ha ocurrido un problema')
    }
}
 //Eliminar un producto
 module.exports.eliminarProducto = async (id) => {
    try {
        let resultado = await modelProductos.deleteProducto(id)        
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
};

//Obtener producto by Id
module.exports.obtenerProductoById = async (id) => {
    try {
        let resultado = await modelProductos.obtenerProducto(id)
        return resultado;
    }catch (err){
        throw new Error ('No se pudo obtener el producto seleccionado')
    }
}

module.exports.updateProducto = async (data,id) =>{
    try {
        let resultado = await modelProductos.updateProducto(data)
        return resultado
    }catch (err){
        throw new Error ('No se pudo actualizar el producto seleccionado')
    }
}