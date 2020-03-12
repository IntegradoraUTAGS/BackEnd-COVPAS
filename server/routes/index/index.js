/* jshint esversion: 6 */
const express = require('express');
const app = express();

app.use('/paseSalida',require('../paseSalida/Destinos/Destinos'));
app.use('/persona',require('../Persona/login/login'));
app.use('/persona',require('../Persona/Persona'));
app.use('/paseSalida',require('../paseSalida/paseSalida'));
app.use('/direcciones',require('../Direcciones/Direcciones'));
app.use('/vacaciones', require('../ControlVacaciones/ControlVaciones'));

module.exports = app;