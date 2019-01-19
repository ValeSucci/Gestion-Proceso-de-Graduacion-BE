const express = require('express');
const control = require('../controllers/usuarios');

const api = express.Router();

//api.get("/",control.)
//api.post("/",control.)
api.get("/login", control.login)
api.get("/get/:username", control.get)
api.put("/update/:username", control.updateUsuario)
api.put("/updateAdmi/:username", control.updateUsuarioAdmi)
api.get("/getAll", control.getAll)
api.post("/create", control.createUser)

api.get("/", (req, res) => {
    res.status(200).send('Todo correcto en usuario')
})

module.exports = api;