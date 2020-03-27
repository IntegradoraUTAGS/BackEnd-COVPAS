/* jshint esversion: 6 */
const express = require('express');
const _ = require('underscore');
const Destinos = require('../../models/Destinos');
const PaseSalida = require('../../models/paseSalida');
const Persona = require('../../models/persona');
const sendMail = require('../../../scripts/mail');
const app = express();

app.put('/actualizar/:idpasesalida', (req, res) => {
    let body = req.body;
    console.log(req.body);
    // let body = _.pick(req.body, ['De', 'A']);

    destino = req.body.De;
    destino2 = req.body.A;
    PaseSalida.findOneAndUpdate({_id: req.params.idpasesalida},{ $push: { ajsnTraslado: { de: destino, a: destino2} } }, (err, paseDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            paseDB
        });
    });

});

module.exports = app;