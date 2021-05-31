// importando los modulos
const usersServices = require('../services/users.services')
const middJsonAuth = require ('../midd/midd.jsonAuth')


module.exports = (app) => {
    app.get('/', middJsonAuth.verificacionUsuario, async (req, res)=> {
        res.json('ok')
    })
    app.get('/users', async (req,res)=>{
        try{
            res.render('login');
            let resultado = await usersServices.listarUsuarios();
            res.json(resultado);
        }catch(err){
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })

    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })

    app.post('/login',middJsonAuth.chkLogin, async (req,res)=>{
        
        let usuario = req.body
        try {
            let resultado = await usersServices.verificarUsuario(usuario)
            if (resultado){
                let usuarioInfo = await usersServices.datosUsuario(usuario)
                let tokenResult = await usersServices.generaToken(usuario)
                res.json({token: tokenResult, user: usuarioInfo})
            }else {
                throw new Error (err)
            }
        }catch (err){
            console.log(err)
            res.status(400).json('Usuario o contrasena incorrecta')
        }
    })

    app.get('/admin', async (req,res)=>{
        try{
            res.render('admin');
        }catch (err){
            console.log(err)
            res.estatus(400).json('No se puede mostrar')
        }
    })

    app.get('/registro', async (req,res)=>{
        try{
            res.render('registroUsuario');
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })

    app.get('/admin/registro', async (req,res)=>{
        try{
            res.render('adminAddUser');
        }catch(err){
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }

    })

    app.post('/registro', async (req, res)=>{
        let usuarioNuevo = req.body
        try {
            let resultado = await usersServices.crearUsuario(usuarioNuevo)
            res.status(200).json('usuario creado correctamente')
        }catch (err){
            console.log(err)
            res.status(400).json('algo raro paso')
        }

    })
    app.get('/edit/:id', async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await usersServices.buscarUsuario(data)
            res.render('adminEditUser.ejs', {result:resultado.dataValues })
            res.send(200,resultado[id]);
        }catch (err){
            res.status(400).json('Error al dirigirse a la pagina EDITAR')
        }
    })

    app.post('/modificar', async (req, res)=>{
        let usuMod = req.body
        try {
            let resultado = await usersServices.modificarUsuario(usuMod)
            
        }catch (err){
            console.log(err)
            res.status(400).json('Error al modificar usuario')
        }
    })
    

    app.get('/delete/:id', async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await usersServices.eliminarUsuario(data)
            if(resultado){
                res.redirect('/usuarios');
            }      
        }catch (err){
            res.status(400).json('No se puedo eliminar el usuario')
        }
    })

    app.get('/usuarios', async(req,res)=> {
        try {
            let resultado = await usersServices.listarUsuarios();
            res.render('adminUser', {results:resultado});
            res.send(200,resultado)
        }catch (err){
            console.log(err)
            res.status(400).json('Error al dirigirse a la ruta vistas')
        }
    })

   
}
