const sequelize = require('../db/conexion')

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