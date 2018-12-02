var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var docente_schema = new Schema ({
    codigo: {
        required: "El campo codigo es obligatorio",
        unique: "El codigo debe ser unico",
        type: Number
    },
    nombre: {
        required: "El campo nombre es obligatorio",
        unique: "El nombre ya existe",
        type: String
    },
    direccion: String,
    telefono: String,
    correo: {
        required: "El campo correo es obligatorio",
        type: String
    }
});


var Docente = mongoose.model("Docente",docente_schema);

module.exports.Docente = Docente;

