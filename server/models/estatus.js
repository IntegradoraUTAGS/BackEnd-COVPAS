/* jshint esversion: 6 */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Persona = require('../models/persona');

let estatus = new Schema({
        strNombre: {
            type: String
        },
        idPersona: {
            type: Schema.Types.ObjectId,
            ref: 'Persona'
        }
});

module.exports = mongoose.model('Estatus', estatus);