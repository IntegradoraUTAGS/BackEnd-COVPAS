const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let PaseSchema = new Schema({

    strMotivo: {
        type: String,
        required: [true, 'Favor ingrese el motivo del pase de salida'],
        default: false
    },
    idEstatus: {
        type: Boolean,
        required: [true, 'Favor de ingresar el status']
    },
    idPersona: {
        type: String,
        required: [true, 'Ingrese el nombre']
    },
    idVehiculo: {
        type: String,
        required: false
    },
    numUidad: {
        type: Number,
        required: false
    }

})

PaseSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Pase', PaseSchema);