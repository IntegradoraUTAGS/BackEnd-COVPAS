/* jshint esversion: 6 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Pase = require('./persona');

let schema = mongoose.Schema;

let PaseVigilanciaSchema = new schema({
    paseSalida:{
        type: schema.Types.ObjectId,
        ref:'Pase'
    },
    observacion:{
        type: String
    },
    nombreReviso:{
        type: String,
        required:[true,'Ingrese el nombre de quen reviso el pase de salida']
    },
    gasolinaSalida:{
        type: String,
        required:[true,'Ingrese la gasolina del vehiculo']
    },
    kilometrosSalida:{
        type: Number,
        required:[true,'Ingrese los kilometros del vehiculo']
    },
    gasolinaRegreso:{
        type: String,
        required:[true,'Ingrese la gasolina del vehiculo'],
        default:'En proeso'
    },
    kilometrosRegreso:{
        type: Number,
        required:[true,'Ingrese los kilometros del vehiculo'],
        default:0
    },
    estatus:{
        type: String,
        default:'En proceso'
    }
});

PaseVigilanciaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('PaseVigilancia', PaseVigilanciaSchema);
