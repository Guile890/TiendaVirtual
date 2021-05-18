
const express = require('express')
const app = express()
require('dotenv').config()
const sequelize = require('./db/conexion')
const userRoutes = require('./routes/users.routes')
const cors = require('cors');
const midd = require('./midd/midd');
const serviciosMercadoLibre = require("./services/services");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//iniciar bd
//iniciar servidor
async function inicioServidor(){
  try{
      await sequelize.authenticate();
      console.log('Conexión correcta con la db');
      app.listen(process.env.PORT,function(){
          console.log(`Servidor iniciado en ${process.env.PORT}`)
      })
  }catch(err){
      console.log(err)
      console.log('no se pudo conectar con la bd ');
  }
}
inicioServidor();

//Routes
userRoutes(app);


// //middleware errores globales
// app.use((err, req, res, next) => {
//   console.log(err);
//   if (!err) {
//     return next();
//   }

//   return res
//     .status(500)
//     .json("Se produjo un error inesperado, intente nuevamente");
// });

// //end point inicial
// app.get("/",cors(midd.corsOptions), async function (req, res) {
//   let respuesta = {
//     codigo: 200,
//     error: false,
//     message: "Punto de inicio de la APP",
//   };
//   res.send(respuesta);
// });


