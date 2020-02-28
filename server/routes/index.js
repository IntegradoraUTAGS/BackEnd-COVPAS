const express = require('express');
const app = express();

app.use(require('./paseSalida'));



module.exports = app;