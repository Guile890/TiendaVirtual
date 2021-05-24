//importando modulos
const sequelize = require('../db/conexion')
const dbUsuarios = require ('../db/db.usuarios')

module.exports.listarUsuarios = async () =>{
    try{
        let resultado = await sequelize.query('SELECT * FROM dbo.Usuario')
        return resultado;
    }catch(err){
        throw new Error ('Ocurrio un problema en la consulta con la db ')
    }
}

module.exports.verificarUsuario = async (usr)=>{
    let usrchk = usr
    try {
        let resultado =  await dbUsuarios.existenciaDeUsuario(usrchk)

        if (!resultado) {
            return resultado
        }else {
            throw new Error ('No existe el usuario')
        }
    }catch (err){
        console.log(err)
        throw new Error (' no semuy bien que paso')
    }
}

module.exports.generaToken = async (data)=>{
    try {
        let resultado = jwt.sign({
            data}, process.env.SECRET_KEY
        )
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

module.exports.crearUsuario = async (usuarioNuevo)=>{
    try {
        let resultado = await this.verificarUsuario(usuarioNuevo)
        if (resultado) {
            throw new Error ('El usuario ya existe')
        }else {
            let usuarioResult = await dbUsuarios.newUsuario(usuarioNuevo)
            return 'Usuario creado'
        }

    }catch (err){
        console.log(err)
        throw new Error ('no pude generar el usuario')
    }
}