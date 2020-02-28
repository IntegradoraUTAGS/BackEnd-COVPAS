const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
let schema = mongoose.Schema;

let salidaSchema = new schema({
    dteHoraSalida: {
        type: Date,
        required: true
    },
    dteHoraRegreso: {
        type: Date
    },
    strMotivo: {
        type: String,
        required: true
    },
    ajsnTraslado: [{
        "de": String,
        "a": String
    }],
    strStatus: {
        type: String,
        default: "En Proceso"
    }

})

salidaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser Unico...'
});

module.exports = mongoose.model('PaseSalida', salidaSchema);