const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Destinos = require('../models/Destinos');
const Persona = require('../models/persona');
let schema = mongoose.Schema;

let PaseSchema = new schema({
    dteHoraSalida: {
        type: Date,
        required: true
    },
    dteHoraRegreso: {
        type: Date
    },
    strMotivo: {
        type: String,
        required: [true, 'Favor ingrese el motivo del pase de salida'],
        default: false
    },
    idPersona: {
        type: schema.Types.ObjectId,
        ref: 'Persona',
        required: [true, 'Ingrese el nombre']
    },
    ajsnTraslado: [{
        Destinos: Destinos.schema
    }],
    strEtatus: {
        type: String,
        default: "En Proceso"
    },
    strRegreso: {
        type: Boolean,
        required: [true, 'es requerido']
    }


})

PaseSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Pase', PaseSchema);
