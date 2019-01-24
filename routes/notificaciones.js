const express = require('express');
const control = require('../controllers/notificaciones');

const api = express.Router();

api.get("/get/:id",control.get);
api.get("/getAll",control.getAll);
api.post("/create",control.createNotificacion);
api.put("/update/:id",control.updateNotificacion);


module.exports = api;