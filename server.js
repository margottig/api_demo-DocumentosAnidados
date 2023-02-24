// CONFIGURACION
const express = require('express')
const app = express()
const PORT = 8000


// requerir archivo de configuracion
require('./config/mongoose.config')


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// IMPORTAR LAS RUTAS DE NUESTRO SERVIDOR BACK-END
const Rutas = require('./routes/movie.routes')
Rutas(app)


const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


