/* jshint esversion: 8 */
const express = require('express');
const app = express();

app.use('/usuario', require('./usuario/usuario'));
app.use('/paseSalida', require('./paseSalida/paseSalida'));


module.exports = app;