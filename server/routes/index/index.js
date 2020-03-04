const express = require('express');
const app = express();

app.use(require('../../routes/login/login'));
app.use(require('../../routes/Destinos/Destinos'));
app.use(require('../../routes/registro/registro'));
app.use(require('../../routes/login/login'));
app.use(require('../../routes/paseSalida/paseSalida'));
app.use(require('../../routes/Vehiculos/Vehiculos'));
module.exports = app;