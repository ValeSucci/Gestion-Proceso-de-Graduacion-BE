var mongoose = require("mongoose");

var Schema = mongoose.Schema;
//mongoose.connect("mongodb://localhost/gestionprocesograduacion")

var AltaMateria = require('./alta_materia').AltaMateria;


var alumno_schema = new Schema({
    codigo: {
        required: "El campo codigo es obligatorio",
        unique: "El codgo ingresado ya existe",
        type: Number
    },
    nombre: {
        required: "El campo nombre es obligatorio",
        unique: "El nombre ya existe",
        type: String
    },
    alta_materia: {
        //required: true,
        type: [Schema.Types.ObjectId],
        ref: 'AltaMateria'
    }
});

var Alumno = mongoose.model("Alumno",alumno_schema);

module.exports.Alumno = Alumno;

