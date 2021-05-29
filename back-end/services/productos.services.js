const sequelize = require('../db/conexion')
const dbProductos = require('../db/db.productos')


//Listar Usuarios
module.exports.listarProductos = async ()=>{
    try {
        let resultado = await dbProductos.getProductos()
        return resultado
    }catch (err){
        console.log('Error de modelos' + err)
        throw new Error ('Ocurrio un problema en productos.service')
    }
} 

module.exports.getInfoCategoria = async ()=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM Categoria')
        return resultado
    }catch (err){
        throw new Error ('Ocurrio un problema en la consulta con la DB',err)
    }
}


module.exports.getInfoProductos = async (id)=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM dbo.Producto where idCategoria ='+id)
        return resultado
    }catch (err){
        throw new Error ('Ocurrio un problema en la consulta con la DB')
    }
}

module.exports.getProductosBusqueda = async (cadena)=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM dbo.Producto where descripcion LIKE %'+cadena+'%')
        return resultado
    }catch (err){
        throw new Error ('Ocurrio un problema en la consulta con la DB')
    }
}

module.exports.insertProducto = async (producto) => {
    let data = producto
    try{
        let resultado = await dbProductos.insertProducto(data)
        return 'Productos insertado'
    }
    catch(error){
        throw new Error ('Ha ocurrido un problema')
    }
}