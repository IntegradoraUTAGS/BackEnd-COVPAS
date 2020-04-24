/* jshint esversion: 6 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Persona = require('./persona');
//const Direccion = require('./direccion');
let Schema = mongoose.Schema;

let solicitudVacaciones=new Schema({
    idPersona:{
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: [true, 'Persona es requerida']
    },
    idAutoriza:{
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: [true, 'persona que autoriza es requerida']
    },
    adteFechas: {
        type: Array
    },
    strEstatus: {
        type: String,
        default: 'En Progreso'
    }
});

module.exports = mongoose.model('controlVacaciones', solicitudVacaciones);