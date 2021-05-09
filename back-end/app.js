//Importamos los módulos
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const midd = require('./midd/midd');
const serviciosMercadoLibre = require("./services/services");

//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());

//iniciar nuestro servidor

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`
  );
});

//middleware errores globales
app.use((err, req, res, next) => {
  console.log(err);
  if (!err) {
    return next();
  }

  return res
    .status(500)
    .json("Se produjo un error inesperado, intente nuevamente");
});

//end point inicial
app.get("/",cors(midd.corsOptions), async function (req, res) {
  let respuesta = {
    codigo: 200,
    error: false,
    message: "Punto de inicio de la APP",
  };
  res.send(respuesta);
});

app.get("/categorias",cors(midd.corsOptions), async function (req, res) {
  try {
    let categorias = await serviciosMercadoLibre.getInfoCategoria();
    console.log("this is cat", categorias);
    res.send(categorias);
  } catch (error) {
    let errorFinal = {
      error: error.message,
      message: "Error inesperado",
    };
    res.send(errorFinal);
  }
});

app.get("/productos/:id", cors(midd.corsOptions), async function (req,res){
    try{
        let productos = await serviciosMercadoLibre.getInfoProductos(req.params.id);
        console.log("estos son los productos", productos);
        res.send(productos);
    }
    catch(error){
        let errorFinal = {
            error: error.message,
            message: "Error inesperado",
          };
          res.send(errorFinal);
    }
});
