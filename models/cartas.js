var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var carta_schema = new Schema ({
    tipo: {
        required: true,
        unique: true,
        type: String
    },
    ubicacion: {
        required: true,
        type: String
    }
});


var Carta = mongoose.model("Carta",carta_schema);

module.exports.Carta = Carta;