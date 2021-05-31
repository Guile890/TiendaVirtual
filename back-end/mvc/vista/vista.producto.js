const controladorProductos = require('../controlador/controlador.producto')
const express = require('express')
const app = express()

const midd = require('../../midd/midd');
const cors = require('cors');


//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());
module.exports = (app) => {

    //end-point para listar productos
    app.get('/getProductos', async(req,res)=> {
        try {
            let resultado = await controladorProductos.listarProductos()
            res.render('listProducto', {results:resultado});
        }catch (err){
            console.log(err)
            res.status(400).json('Error al dirigirse a la ruta')
        }
    })
     //Rutas para agregar y guardar un nuevo producto
     app.get('/createProducto', async (req,res)=>{
        try{
            res.render('createProducto.ejs')
        }catch (err){
            console.log(err)
            res.estatus(400).json('Error al dirigirse a la pagina CREAR')
        }
    })


    app.post("/producto", cors(midd.corsOptions), async function (req, res) {
        let producto = req.body
        try {
            let productos = await controladorProductos.insertProducto(producto);
            res.send(productos);
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    });
       // ruta para eliminar producto
       app.get('/producto/delete/:id', async (req,res)=>{
        let id = req.params.id;
        try {
            let resultado = await controladorProductos.eliminarProducto(id)
            if(resultado){
                res.redirect('/');
            }      
        }catch (err){
            res.status(400).json('No se puedo eliminar el producto')
        }
    })
    app.get('/updateProducto/:id_producto', async (req, res) =>{
        let id = req.params.id_producto
        try {
            let resultado = await controladorProductos.obtenerProductoById(id)
            res.render('updateProducto', {
                data:resultado[0],
            })
        } catch (e) {
            console.log(e);
        }
    })
    app.post('/producto/update', async function (req, res){
        let dataUpdate = req.body
        try {
            await controladorProductos.updateProducto(dataUpdate)
            res.redirect('/getProductos')
        } catch (e) {
            console.log(e);
        }
    })

}