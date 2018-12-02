var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var notificacion_schema = new Schema ({
    cogido_alumno: Number,
    asunto: String,
    fecha_asunto: Date,
    fecha_publicacion: Date
});


var Notificacion = mongoose.model("Notificacion",notificacion_schema);

module.exports.Notificacion = Notificacion;

