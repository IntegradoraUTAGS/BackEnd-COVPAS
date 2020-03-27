/* jshint esversion: 6 */
const mongoose = require('mongoose');
const Departamento = require('./departamentos');
let Schema = mongoose.Schema;

let direccionSchema = new Schema({
    strNombre: {
        type: String
    },
    ajsnDepartamento: [
        Departamento.schema
    ]
},
{collection: 'direcciones'});

module.exports = mongoose.model('direccion', direccionSchema);