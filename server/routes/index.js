const express = require('express');
const app = express();

app.use('/destinos', require('./Destinos/Destinos'));
app.use('/registro', require('./registro/registro'));
app.use('/login', require('./login/login'));
app.use('/paseSalida', require('./paseSalida/paseSalida'));


module.exports = app;