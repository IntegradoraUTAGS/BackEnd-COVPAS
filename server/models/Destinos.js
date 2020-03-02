const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let destinosSchema = new Schema({
    de: {
        type: String,
        required: [true, 'es requerido']
    },
    a: {
        type: String,
        required: [true, 'es requerido']
    }
})

destinosSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser Unico...'
});

module.exports = mongoose.model('Destinos', destinosSchema);