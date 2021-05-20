const productosServices = require('../services/productos.services')
const express = require('express')
const app = express()

const midd = require('../midd/midd');
const cors = require('cors');


//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());
module.exports = (app) => {
    //end-point obtiene las categorias de ML
    app.get("/categorias", cors(midd.corsOptions), async function (req, res) {
        try {
            let categorias = await productosServices.getInfoCategoria();
            res.send(categorias);
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    });
    //end-point obtiene los productos por id de ML
    app.get("/productos/:id", cors(midd.corsOptions), async function (req, res) {
        try {
            let productos = await productosServices.getInfoProductos(req.params.id);
            res.send(productos);
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    });

    //end-point obtiene los productos por cadena de búsqueda
    app.get("/busqueda/:cadena", cors(midd.corsOptions), async function (req, res) {
        try {
            let productos = await productosServices.getProductosBusqueda(req.params.cadena);
            res.send(productos);
        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    });
}