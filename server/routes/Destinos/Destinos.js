const express = require('express');
const _ = require('underscore');
const Destinos = require('../../models/Destinos');
const PaseSalida = require('../../models/paseSalida');
const app = express();

app.put('/destinos/:idpasesalida', (req, res) => {
    let body = _.pick(req.body, ['De', 'A']);

    const destinos = new Destinos({
        de: body.De,
        a: body.A
    })

    PaseSalida.findOneAndUpdate(req.params.idpasesalida, { $push: { ajsnTraslado: destinos } }, (err, paseDB) => {
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
    })

});

module.exports = app;