/* jshint esversion: 6 */
const express = require('express');
const app = express();
//Aqui definimos nuestr indice de rutas a utilizar por ejemplo
// localhost:3000/persona/<opcion>
app.use('/destinos',require('./PaseSalida/Destinos'));
app.use('/persona',require('./Persona/login'));
app.use('/persona',require('./Persona/Persona'));
app.use('/paseSalida',require('./PaseSalida/PaseSalida'));
app.use('/estatus',require('./PaseSalida/Estatus'));
app.use('/direcciones',require('./Direcciones/Direcciones'));
app.use('/vacaciones',require('./ControlVacaciones/ControlVaciones'));
app.use('/paseVigilancia',require('./paseSalidaVigilancia/paseSalidaVigilancia'));
app.use('/vehiculos',require('./Vehiculos/Vehiculos'));
app.use('/paseSalidaVehiculo', require('./PaseSalida/paseSalidaVehiculo'));

module.exports = app;