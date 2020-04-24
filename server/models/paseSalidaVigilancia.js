/* jshint esversion: 6 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Pase = require('./persona');

let schema = mongoose.Schema;

let PaseVigilanciaSchema = new schema({
   idPaseSalida: {
       type: schema.Types.ObjectId,
       ref: 'Pase'
   },
   idPersona: {
       type: schema.Types.ObjectId,
       ref: 'Persoa'
   },
   dteHoraSalidaPase: {
       type: String
   },
   dteHoraSalidaViglancia: {
       type: String
   },
   dteHoraRegresoPase: {
       type: String
   },
   dteHoraRegresoViglancia: {
       type: String
   },
   nivelGasolinaSalida: {
       type: String
   },
   nivelGasolinaRegreso: {
       type: String
   },
   kmSaida: {
       type: String
   },
   kmRegreso: {
       type: String
   }
   
});

PaseVigilanciaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('PaseVigilancia', PaseVigilanciaSchema);
