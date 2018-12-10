const express = require('express');
const control = require('../controllers/alumnos');

const api = express.Router();

api.get("/getAll",control.getAll)
api.post("/create",control.createAlumno)
api.get("/get/:codigo",control.get)
api.post("/buscar", control.buscar)

module.exports = api;