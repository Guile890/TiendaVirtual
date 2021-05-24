// importando los modulos
const usersServices = require('../services/users.services')
const middJsonAuth = require ('../midd/midd.jsonAuth')


module.exports = (app) => {
    app.get('/', middJsonAuth.verificacionUsuario, async (req, res)=> {
        res.json('ok')
    })
    app.get('/users', async (req,res)=>{
        try{
            let resultado = await usersServices.listarUsuarios();
            res.json(resultado);
        }catch(err){
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })

    app.post('/login', async (req,res)=>{
        res.render('index');
        let usuario = req.body
        try {
            let resultado = await usersServices.verificarUsuario(usuario)
            if (resultado){
                let tokenResult = await usersServices.generaToken(usuario)
                res.json(tokenResult)
            }else {
                throw new Error (err)
            }
        }catch (err){
            console.log(err)
            res.status(400).json('Usuario o contrasena incorrecta')
        }
    })

    app.post('/registro', async (req, res)=>{
        let usuarioNuevo = req.body
        try {
            let resultado = await usuarioServicios.crearUsuario(usuarioNuevo)
            res.status(200).json('usuario creado correctamente')
        }catch (err){
            console.log(err)
            res.status(400).json('algo raro paso')
        }

    })
}
