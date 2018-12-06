var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Docente = require('./docentes').Docente;


var alta_materia_schema = new Schema ({
    nro_alta: {
        required: true,
        type: Number
    },
    semestre: {
        required: "Debe seleccionar un semestre",
        type: String
    },
    fecha: {
        required: "Debe seleccionar una fecha",
        type: Date
    },
    plazo: Date,
    prorroga: Boolean,
    estado: {
        required: true,
        type: {
            est: String,
            color: String
        }
    },
    modalidad: {
        mod: String,
        trabDirig: {
            empresa: String,
            fecha_suficiencia: Date
        }
    },
    tema: String,
    observaciones: String,
    tutor: {
        doc: {
            type: Schema.Types.ObjectId,
            ref: 'Docente'
        },
        fecha_asignacion: Date,
        cite_carta: String,
        ubicacion_carta: {
            type: Schema.Types.ObjectId,
            ref: 'Carta'
        },
        fecha_suficiencia: Date,
        paga: {
            type: Boolean,
            default: true
        }
    },
    revisor: {
        doc: {
            type: Schema.Types.ObjectId,
            ref: 'Docente'
        },
        fecha_asignacion: Date,
        cite_carta: String,
        ubicacion_carta: {
            type: Schema.Types.ObjectId,
            ref: 'Carta'
        },
        fecha_suficiencia: Date,
    },
    defensa_interna: {
        fecha: Date,
        resultado: String,
        observacion: String
    },
    defensa_externa: {
        fecha: Date,
        presidente: String,
        evaluador1: String,
        evaluador2: String,
        resultado: String
    }

});


var AltaMateria = mongoose.model("AltaMateria",alta_materia_schema);

module.exports.AltaMateria = AltaMateria;

