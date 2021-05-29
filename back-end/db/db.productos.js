const { DataTypes, Model } = require('sequelize')
const sequelize = require('./conexion')

//Definicion del modelo de usuario
const Productos = sequelize.define('productos', {
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

module.exports = Productos


module.exports.insertProducto = async (data) => {
    console.log(data)
    let resultado = await Productos.create({
        descripcion: data.descripcion, precio: data.precio, imagen: data.imagen,
        existencia: data.existencia, idCategoria: data.idCategoria
    })
    return resultado
}
module.exports.getProductos = async () => {
    let resultado = await sequelize.query('SELECT * FROM Producto order by idProducto asc')
    return resultado[0]
  }