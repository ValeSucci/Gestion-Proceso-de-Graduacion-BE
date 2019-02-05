const express = require('express');
const control = require('../controllers/cartas');

const api = express.Router();

api.get('/get/:cargo', control.obtenerCarta)
api.post('/add', control.insertarCarta)
api.put("/update/:cargo", control.updateCarta)

module.exports = api;