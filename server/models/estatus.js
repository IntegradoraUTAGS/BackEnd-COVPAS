const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Persona;

let estatus = new Schema({
        strNombre: {
            type: String
        },
        idPersona: {
            type: Schema.Types.ObjectId,
            ref: 'Persona'
        }
});