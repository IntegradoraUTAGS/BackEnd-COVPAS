const mongoose = require('mongoose');
let schema = mongoose.Schema;

let salidaSchema = new schema({
    numNoEmpleado: {
        type: Number,
        required: true
    },
    strNombre: {
        type: String,
        required: true
    },
    strMotivo: {
        type: String,
        required: true
    },
    dateFecha: {
        type: Date,
        required: true
    }

})