/* jshint esversion: 6*/
const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const uniquevalidator = require('mongoose-unique-validator');
const direccion = require('../models/direccion');

let Schema = mongoose.Schema;

let personaSchema = new Schema({
    numNoEmpleado: {
        type: Number,
        unique: true,
        required: [true, 'Por favor ingresa el numero de empleado']
    },
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    strEmail: {
        type: String,
        required: [true, 'Por favor ingresa un correo electronico']
    },
    strPassword: {
        type: String,
        required:[true, 'Por favor ingresa una contraseña']
    },
    strTipoEmpleado: {
        type: String,
        required: [true, 'Por favor ingresa el tipo de empleado']
    },
    idDireccion: {
        type: Schema.Types.ObjectId,
        ref: 'direccion'
    },
    active: {
        type: Boolean,
        default: true
    },
    numDiasDisponibles: {
        type: Number,
        default: 0
    },
});

personaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

personaSchema.plugin(mongooseHidden, {
    hidden: {
        _id: false,
        strPassword: true
    }});

module.exports = mongoose.model('Persona', personaSchema);