var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var notificacion_schema = new Schema ({
    codigo: Number,
    nombre: String,
    asunto: String,
    fecha_asunto: Date,
    fecha_publicacion:  {
        type: Date,
        default: null
    },
    visto: {
        default: false,
        type: Boolean
    }
});


var Notificacion = mongoose.model("Notificacion",notificacion_schema);

module.exports.Notificacion = Notificacion;

