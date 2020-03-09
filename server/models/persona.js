const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

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
    strContraseña: {
        type: String,
        required:[true, 'Por favor ingresa una contraseña']
    },
    strTipoEmpleado: {
        type: String,
        required: [true, 'Por favor ingresa el tipo de empleado']
    },
    idDireccion: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    }
});

personaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Persona', personaSchema);