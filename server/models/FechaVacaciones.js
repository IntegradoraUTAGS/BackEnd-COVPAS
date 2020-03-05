const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let fecha = new Schema(
    {
        dteFecha: {type: Date}
    }
)

module.exports = mongoose.model('Fecha', fecha);