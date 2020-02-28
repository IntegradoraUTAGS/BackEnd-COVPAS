/* jshint esversion: 8 */
const express = require('express');
const app = express();


app.use('/paseSalida', require('./PaseSalida/PaseSalida'));

module.exports = app;