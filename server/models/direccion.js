const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let direccionSchema = new Schema({
    strNombre: {
        type: String
    }
})

module.exports = mongoose.model('direccion', direccionSchema);