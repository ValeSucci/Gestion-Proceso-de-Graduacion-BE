var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var actividad_schema = new Schema ({
    accion: {
        required: true,
        type: String
    },
    fecha: {
        required: true,
        type: Date
    }
});


var Actividad = mongoose.model("Actividad",actividad_schema);

module.exports.Actividad = Actividad;