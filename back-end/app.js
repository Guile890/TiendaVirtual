
const express = require('express')
const app = express()
require('dotenv').config()
const sequelize = require('./db/conexion')
const userRoutes = require('./routes/users.routes')
const midd = require('./midd/midd');
const cors = require('cors');
const Usuarios = require('./db/db.usuarios')
const Producto = require('./db/db.productos')

const serviciosMercadoLibre = require("./services/services");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const vistaProductos = require('./mvc/vista/vista.producto')


//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//configuraciones globales
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');




//iniciar bd
//iniciar servidor
async function inicioServidor(){
  try{
      await Usuarios.sync({alter:true})
      await Producto.sync({alert:true})
      await sequelize.authenticate();
      //await Usuarios.newUsuario({nombre:'Brandon', apellidos: 'Contreras', email: 'braru@gmail.com',movil: '4652313413', telefono: '5642156023',ciudad:'Mexico',estado:'Mexico', cp:'56460',  contrasena: '123' , usuario: 'braru@gmail.com', fechaAlta:'2022', idEstatus: 2})

      //await Usuarios.newUsuario({nombre:'Ruben', apellidos: 'Contreras', email: 'admin@gmail.com',movil: '4652313413', telefono: '5642156023',ciudad:'Mexico',estado:'Mexico', cp:'56460',bandera_admin:'1',  contrasena: '123', fechaAlta:'2022', idEstatus: 1})
      //await Usuarios.newUsuario({nombre:'Brandon', apellidos: 'Contreras', email: 'braru@gmail.com',movil: '4652313413', telefono: '5642156023',ciudad:'Mexico',estado:'Mexico', cp:'56460',  contrasena: '123' , usuario: 'braru55', fechaAlta:'2022', idEstatus: 1})

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
vistaProductos(app);



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


