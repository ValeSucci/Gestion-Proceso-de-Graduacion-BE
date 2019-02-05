var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var carta_schema = new Schema({
    tipo: {
        required: true,
        type: String
    },
    hash: {
        required: true,
        type: String
    },
    cargo: {
        type: Boolean,
        required: true
    }
    //true: tutor, false: revisor
});


var Carta = mongoose.model("Carta", carta_schema);

module.exports.Carta = Carta;