/* jshint esversion: 8 */
const express = require('express');
const app = express();


app.use('/paseSalida', require('./PaseSalida/PaseSalida'));
app.use('/paseSalida', require('./Destinos/Destinos'));
module.exports = app;