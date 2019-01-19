var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Actividad = require('./actividades').Actividad;

var usuario_schema = new Schema ({
    nombre: {
        required: "El campo nombre es obligatorio",
        type: String
    },
    username: {
        required: "El campo nombre de usuario es obligatorio",
        type: String,
        unique: "El nombre de usuario ya existe"
    },
    password: {
        required: "Debe ingresar algun dato",
        minlength: [8, "Debe ingresar mas de 8 caracteres"],
        type:String
    },
    telefono: String,
    correo: String,
    habilitado: Boolean,
    esSuper: Boolean, 
    fecha_inicio: Date,
    fecha_fin: Date
});


var Usuario = mongoose.model("Usuario",usuario_schema);

module.exports.Usuario = Usuario;


/*
db.usuarios.insert({
    nombre: "Valeria Succi",
    username: "ValeSucci",
    password: "11111111",
    telefono: "65802758",
    correo: "valesuc98@gmail.com",
    habilitado: true,
    esSuper: false, 
    fecha_inicio: new Date(2018,08,20),
    fecha_fin: null,
    actividades: null
});
*/