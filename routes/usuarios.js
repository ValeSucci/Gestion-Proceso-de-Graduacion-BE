const express = require('express');
const control = require('../controllers/usuarios');

const api = express.Router();

//api.get("/",control.)
//api.post("/",control.)
api.get("/login", control.login)

module.exports = api;