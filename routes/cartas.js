const express = require('express');
const control = require('../controllers/cartas');

const api = express.Router();

//api.get("/",control.)
//api.post("/",control.)
api.put("/update/:tipo",control.updateCarta)


module.exports = api;