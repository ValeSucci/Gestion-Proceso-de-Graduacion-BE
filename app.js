const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors') //otra dependencia

const alumnoApi = require('./routes/alumnos')
const docenteApi = require('./routes/docentes')
const usuarioApi = require('./routes/usuarios')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/Alumno', alumnoApi)
app.use('/Docente', docenteApi)
app.use('/Usuario', usuarioApi)

app.get("/", (req, res) => {
    res.status(200).send('Todo correcto')
})


module.exports = app
