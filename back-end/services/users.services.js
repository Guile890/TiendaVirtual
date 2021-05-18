//importando modulos
const sequelize = require('../db/conexion')

module.exports.listarUsuarios = async () =>{
    try{
        let resultado = await sequelize.query('SELECT * FROM dbo.users')
        return resultado;
    }catch(err){
        console.log(err)
        throw new Error ('Ocurrio un problema en la consulta con la db ')
    }
}