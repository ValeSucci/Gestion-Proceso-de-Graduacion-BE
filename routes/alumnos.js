const express = require('express');
const control = require('../controllers/alumnos');

const api = express.Router();

api.get("/getAll",control.getAll)
api.post("/create",control.createAlumno)
api.get("/get/:codigo",control.get)
api.post("/buscar", control.buscar)
api.put("/update/:id", control.updateAlumno)
api.post("/buscarPorTema", control.buscarPorTema)
api.put("/nuevaAlta/:codigo", control.nuevaAltaAlumno)

module.exports = api;