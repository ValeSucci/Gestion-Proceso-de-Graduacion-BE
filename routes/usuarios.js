const express = require('express');
const control = require('../controllers/usuarios');

const api = express.Router();

//api.get("/",control.)
//api.post("/",control.)
api.get("/login", control.login)
api.get("/get/:username", control.get)
api.put("/update/:username", control.updateUsuario)

module.exports = api;