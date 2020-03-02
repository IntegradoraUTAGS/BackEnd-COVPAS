const express = require('express');
const _ = require('underscore');
const Salidas = require('../../models/paseSalida');
const app = express();

app.post('/registrar', (req, res) => {
    let body = req.body;

    let paseSalida = new Salidas({
        dteHoraSalida: body.dteHoraSalida,
        dteHoraRegreso: body.dteHoraRegreso,
        strMotivo: body.strMotivo,
        strRegreso: body.strRegreso

    });

    paseSalida.save((err, salidaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            salidaDB
        })
    });
});

module.exports = app;