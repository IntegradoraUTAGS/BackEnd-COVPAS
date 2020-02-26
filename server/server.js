/* jshint esversion: 8 */
// Importaciones
require('colors');
require('./config/config');

// Declaraciones
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Habilita CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// Requerir las APIS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes/index'));

// Conexión a la base de datos
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((resp) => {
    console.log('[MONGODB]'.yellow, 'Se ha conectado a la base de datos exitosamente.');

}).catch((err) => {
    console.log('[MONGODB]'.red, 'Error al conectar la base de datos');
});

// Levantamiento del servidor
app.listen(process.env.PORT, () => {
    console.log('[SERVER]'.yellow, 'Escuchando puerto:', process.env.PORT);
});