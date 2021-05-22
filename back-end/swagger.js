const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/productos.routes','./routes/users.routes'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app.js')
})