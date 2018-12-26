const express = require('express');
const control = require('../controllers/docentes');

const api = express.Router();

api.get("/getAll",control.getAll)
api.post("/create",control.createDocente)
api.put("/update/:codigo",control.updateDocente)
api.get("/get/:id",control.get)
//api.get("/getId/:codigo",control.getIdDocente)

module.exports = api;