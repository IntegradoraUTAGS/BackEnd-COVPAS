const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Destinos = require('../models/Destinos');
let schema = mongoose.Schema;

let salidaSchema = new schema({
    dteHoraSalida: {
        type: Date,
        required: true
    },
    dteHoraRegreso: {
        type: Date
    },
    strMotivo: {
        type: String,
        required: true
    },
    ajsnTraslado: [
        Destinos.schema
    ],
    strStatus: {
        type: String,
        default: "En Proceso"
    },
    strRegreso: {
        type: Boolean,
        required: [true, 'es requerido']
    }


})

salidaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser Unico...'
});

module.exports = mongoose.model('PaseSalida', salidaSchema);