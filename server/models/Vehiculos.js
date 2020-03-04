const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let vehiculosSchema = new Schema({
    numUnidad: {
        type: Number,
        required: [true, 'Inserte Numero de unidad'],
        unique: true
    },
    strModelo: {
        type: String,
        required: [true, 'Inserte Modelo']
    },
    strNombre: {
        type: String,
        required: [true, 'Inserte nombre del vehiculo']
    },
    blnEstatus: {
        type: Boolean,
        default: true
    },
    strObservaciones: {
        type: String,

    },
    strPlacas: {
        type: String,
        required: [true, 'Inserte las placas...']
    }

});

vehiculosSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser Unico...'
});

module.exports = mongoose.model('Vehiculos', vehiculosSchema);