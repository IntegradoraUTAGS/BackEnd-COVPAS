/* jshint esversion: 6*/
const mongoose = require('mongoose');
const Persona = require('../models/persona');
const Vehiculos = require('../models/Vehiculos');
let paseSalidaVehiculoSchema = new mongoose.Schema({
    
    idPaseSalida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaseSalida',
        required: [true,'id pase de salida es requerido']
    },
    dteFechasolicitud: {
        type: String,
        required: [true, 'Fecha de solicitud es requerida']
    },
    idVehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehiculos',
        required: [true, 'id de vehiculo es requerido']
    },
    strServicio: {
        type: String,
        required: [true, 'Tipo de servicio es requerido']
    },
    strChofer: {
        type: String,
        required: [true, 'Chofer es requerido']
    },
    idAutoriza1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
        required: [true, 'id Autorizante 1 es requerido']
    },
    idAutoriza2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
        required: [true, 'id Autorizante 2 es requerido']
    },
    idAutoriza3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
        required: [true, 'id Autorizante 3 es requerido']
    },
    idAutoriza4: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona'
    },
    strEstatus: {
        type: String,
        default: 'En progreso'
    }
});

module.exports = mongoose.model('PaseSalidaVehiculo', paseSalidaVehiculoSchema);