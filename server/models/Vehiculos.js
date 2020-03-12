const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let vehiculosSchema = new Schema({
    strUnidad: {
        type: String,
        required: [true, 'Inserte Nombre de la unidad']
    },
    strMarca: {
        type: String,
        required: [true, 'Inserte nombre del vehiculo']
    },
    strPlaca: {
        type: String,
        required: [true, 'Inserte el numero de Placa'],
        unique: true
    },
    numModelo: {
        type: Number,
        required: [true, 'Inserte el Modelo del automovil']
    },
    strNodeMotor: {
        type: String,
        required: [true, 'Inserte el numero de Motor del vehiculo'],
        unique: true
    },
    strNIV: {
        type: String,
        required: [true, 'Inserte N.I.V'],
        unique: true
    }

});

vehiculosSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser Unico...'
});

module.exports = mongoose.model('Vehiculos', vehiculosSchema);