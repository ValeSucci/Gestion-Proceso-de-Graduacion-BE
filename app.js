const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors') //otra dependencia

const alumnoApi = require('./routes/alumnos')
const docenteApi = require('./routes/docentes')
const usuarioApi = require('./routes/usuarios')
const altaMateriaApi = require('./routes/alta_materia')
const notificacionApi = require('./routes/notificaciones')
const cartaApi = require('./routes/cartas')

const app = express()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use('/Alumno', alumnoApi)
app.use('/Docente', docenteApi)
app.use('/Usuario', usuarioApi)
app.use('/AltaMateria', altaMateriaApi)
app.use('/Notificacion', notificacionApi)
app.use('/carta', cartaApi)

app.get("/", (req, res) => {
    res.status(200).send('Todo correcto')
})


module.exports = app
