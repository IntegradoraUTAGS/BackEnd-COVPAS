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
      
let Schema = mongoose.Schema;

let PaseSchema = new Schema({

    strMotivo:{
        type:String,
        required:[true,'Favor ingrese el motivo del pase de salida'],
        default:false
    },
    idEstatus:{
        type:Boolean,
        required:[true,'Favor de ingresar el status']
    },
    idPersona:{
        type:String,
        required:[true,'Ingrese el nombre']
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

PaseSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Pase', PaseSchema);