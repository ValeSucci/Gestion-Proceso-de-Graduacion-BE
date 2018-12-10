const express = require('express');
const control = require('../controllers/alta_materia');

const api = express.Router();

//api.get("/",control.)
//api.post("/",control.)
api.get("/get/:id",control.get)

module.exports = api;