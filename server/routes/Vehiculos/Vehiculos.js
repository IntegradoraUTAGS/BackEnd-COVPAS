const express = require('express');
const _ = require('underscore');
const Vehiculos = require('../../models/Vehiculos');
const app = express();

app.get('/vehiculos', (req, res) => {
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

app.post('/registro', (req, res) => {
    let body = req.body;

    let vehiculos = new Vehiculos({
        numUnidad: body.numUnidad,
        strModelo: body.strModelo,
        strNombre: body.strNombre,
        strObservaciones: bosy.strObservaciones,
        strPlacas: body.strPlacas
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