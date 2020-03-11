/* jshint esversion: 6 */
const express = require('express');
const app = express();

app.use('/paseSalida',require('../paseSalida/Destinos/Destinos'));
app.use('/persona',require('../Persona/login/login'));
app.use('/persona',require('../Persona/Persona'));
app.use('/paseSalida',require('../../routes/paseSalida/paseSalida'));
app.use('/direcciones',require('../../routes/Direcciones/Direcciones'));

module.exports = app;