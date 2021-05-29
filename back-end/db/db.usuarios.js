const { DataTypes, Model } = require('sequelize')
const sequelize = require('./conexion')

//Definicion del modelo de usuario
const Usuarios = sequelize.define('usuarios', {
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    movil: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    ciudad: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bandera_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fechaAlta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idEstatus:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Usuarios

module.exports.existenciaDeUsuario = async (usr)=>{
    //chequear con la base de datos que exista el usuario
    //Usuario y pass
    //devuelvo un OK
    let resultado = await Usuarios.findOne({where: {email:usr.email, contrasena: usr.contrasena}})
    // null
    if (resultado === null){
        return false
    }else {
        return true
    }
}

module.exports.recuperarInfoUser = async (usr) => {
    let resultado = await Usuarios.findAll({where: {email:usr.email, contrasena: usr.contrasena}})
    if (resultado === null){
      return false
    }else {
      return resultado[0]
    }
}

module.exports.newUsuario = async (usr)=> {
    console.log(usr)
    let resultado = await Usuarios.create({nombre: usr.nombre, apellidos: usr.apellidos, email: usr.email , 
    movil: usr.movil, telefono: usr.telefono, ciudad: usr.ciudad, estado: usr.estado, cp: usr.cp,bandera_admin:usr.bandera_admin, contrasena: usr.contrasena,
    fechaAlta: usr.fechaAlta, idEstatus: usr.idEstatus  })

    return resultado
}