/* jshint esversion: 8 */
const mongoose = require('mongoose');
let schema = mongoose.Schema;

let usuarioSchema = new schema({
    strNombre: {
        type: String,
        require: [true, 'Favor de ingresar un nombre.']
    },
    strApellidoPat: {
        type: String,
        require: [true, 'Favor de ingresar el apellido paterno.']
    },
    strApellidoMat: {
        type: String
    },
    strCorreo: {
        type: String,
        require: [true, 'Favor de ingresar un correo.']
    },
    strDireccion: {
        type: String,
        require: [true, 'Favor de ingresar una dirección']
    },
    strColonia: {
        type: String,
        require: [true, 'Favor de ingresar una colonia.']
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);