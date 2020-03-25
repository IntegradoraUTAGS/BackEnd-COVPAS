/* jshint esversion: 8 */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let departamentoScheme = new Schema({
    strNombre: {
        type: String
    }
});

module.exports = mongoose.model('departamento',departamentoScheme);