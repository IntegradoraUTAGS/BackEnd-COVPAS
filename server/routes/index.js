/* jshint esversion: 6 */
const express = require('express');
const app = express();

app.use('/destinos',require('./paseSalida/Destinos'));
app.use('/persona',require('./Persona/login'));
app.use('/persona',require('./Persona/Persona'));
app.use('/paseSalida',require('./paseSalida/paseSalida'));
app.use('/estatus',require('./paseSalida/Estatus'));
app.use('/direcciones',require('./Direcciones/Direcciones'));
app.use('/vacaciones',require('./ControlVacaciones/ControlVaciones'));
app.use('/vehiculos',require('./Vehiculos/Vehiculos'));
app.use('/paseSalidaVehiculo', require('./paseSalida/paseSalidaVehiculo'));

module.exports = app;