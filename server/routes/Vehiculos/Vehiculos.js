const express = require('express');
const _ = require('underscore');
const Vehiculos = require('../../models/Vehiculos');
const app = express();

app.get('/vehiculosget', (req, res) => {
    Vehiculos.find()
        .exec((err, vehiculos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: vehiculos.length,
                vehiculos
            });
        });
});

app.post('/vehiculoregis', (req, res) => {
    let body = req.body;

    let vehiculos = new Vehiculos({
        strUnidad: body.strUnidad,
        strMarca: body.strMarca,
        strPlaca: body.strPlaca,
        numModelo: body.numModelo,
        strNodeMotor: body.strNodeMotor,
        strNIV: body.strNIV
    });

    vehiculos.save((err, vhlDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            vhlDB
        });
    });
});

app.put('/', (req, res) => {

});

app.delete('/', (req, res) => {

});

module.exports = app;