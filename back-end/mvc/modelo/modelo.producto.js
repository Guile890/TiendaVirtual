const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../db/conexion')

//Definicion del modelo de usuario
const Producto = sequelize.define('Producto', {
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    existencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Producto


module.exports.insertProducto = async (data) => {
    try {
        let resultado = await Producto.create(({
            descripcion: data.descripcion, precio: data.precio, imagen: data.imagen,
            existencia: data.existencia, idCategoria: data.categoria
        }))
        return resultado
    }
    catch (error) {
        throw console.log(error)
    }

}
module.exports.getProductos = async () => {
    let resultado = await sequelize.query('SELECT * FROM productos order by id asc')
    return resultado[0]
}
module.exports.deleteProducto = async (id) => {
    try{
        let resultado = await Producto.destroy({
            where: { id: id }
        })
        return true
    }catch(error){
        throw console.log(error)
    }
}

module.exports.obtenerProducto  = async (data) =>{
    let id = [
        data
    ]
    try {
        let resultado = await sequelize.query(`SELECT * FROM productos WHERE id = ? `,
        {replacements : id, type : sequelize.QueryTypes.SELECT})
        return resultado;
    } catch (error) {
        throw new Error ('Ocurrio un error')
    }
}
module.exports.updateProducto = async (data) =>{
    let productoUpdate = [
        data.descripcion,
        data.precio,
        data.imagen,
        data.existencia,
        data.categoria,
        data.id
    ]
    console.log('valor a updating',productoUpdate)
    try {
        let resultado = await sequelize.query(`UPDATE productos SET descripcion= ?, precio= ?, imagen= ?, existencia= ?, idCategoria= ? WHERE id= ? `,
        {replacements : productoUpdate, type : sequelize.QueryTypes.SELECT})
        return resultado;
    } catch (error) {
        throw new Error ('Un campo esta incorrecto, intente de nuevo')

    }
}



