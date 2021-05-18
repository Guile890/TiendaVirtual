// importando los modulos
const usersServices = require('../services/users.services')

module.exports = (app) => {
    app.get('/users', async (req,res)=>{
        try{
            let resultado = await usersServices.listarUsuarios();
            res.json(resultado);
        }catch(err){
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })
}
