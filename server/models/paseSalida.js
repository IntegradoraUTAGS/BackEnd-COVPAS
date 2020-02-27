const mongoose = require('mongoose');
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

 

});

module.exports = mongoose.model('paseSalida', salidaSchema)