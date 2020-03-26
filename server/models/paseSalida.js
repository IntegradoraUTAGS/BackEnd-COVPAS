/* jshint esversion: 6 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Destinos = require('../models/Destinos');
const Persona = require('../models/persona');
let schema = mongoose.Schema;

let PaseSchema = new schema({
    idAutoriza: {
        type: schema.Types.ObjectId,
        ref: 'Persona'
    },
    strEmpresaVisita: {
        type: String,
        required: true
    },
    strPersonaCita: {
        type: String, 
        required: true
    },
    dteFecha: {
        type: Date,
        required: false
    },
    dteHoraSalida: {
        type: String,
        required: true
    },
    dteHoraRegreso: {
        type: String,
        default: 'No regresa'
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
    ajsnTraslado:[
        Destinos.schema
    ],
    strEstatus: {
        type: String,
        default: "En Proceso"
    },
    blnRegreso: {
        type: Boolean,
        required: [true, 'es requerido']
    }


});

PaseSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Pase', PaseSchema);
