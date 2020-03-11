/* jshint esversion: 6 */
const express = require('express');
const app = express();

app.use('/paseSalida',require('./paseSalida/Destinos'));
app.use('/persona',require('./Persona/login'));
app.use('/persona',require('./Persona/Persona'));
app.use('/paseSalida',require('./paseSalida/paseSalida'));
app.use('/direcciones',require('./Direcciones/Direcciones'));

module.exports = app;