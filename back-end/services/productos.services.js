const sequelize = require('../db/conexion')

module.exports.getInfoCategoria = async ()=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM dbo.Categoria')
        return resultado
    }catch (err){
        throw new Error ('Ocurrio un problema en la consulta con la DB')
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