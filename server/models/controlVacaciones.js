/* jshint esversion: 6 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Persona = require('./persona');
const Fecha = require('./FechaVacaciones');
//const Direccion = require('./direccion');
let Schema = mongoose.Schema;

let solicitudVacaciones=new Schema({
    idPersona:{
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    },
    idDireccion:{
        // type: Schema.Types.ObjectId,
        // ref: 'Direccion'
        type: String
    },
    idAutorizador:{
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    },
    ajsnFechaSolitada: [{
        Fecha: Fecha.Schema
    }],
    strEstatus: {
        type: String,
        default: 'En Progreso'
    }
});

module.exports = mongoose.model('controlVacaciones', solicitudVacaciones);