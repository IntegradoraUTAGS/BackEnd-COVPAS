const express = require('express');
const app = express();

app.use(require('../../routes/usuario/usuario'));
app.use(require('../../routes/login/login'));

module.exports = app;