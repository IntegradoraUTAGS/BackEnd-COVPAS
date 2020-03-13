/* jshint esversion: 8 */
const Estatus = require('../../models/estatus');
const PaseSalida = require('../../models/paseSalida');
const _ = require('underscore');
const express = require('express');
const app = express();

app.put('/actualizar/:id/:idPersona',(req,res) => {
    let body = _.pick(req.params,'id');
    let estatus = new Estatus({
        idPersona: req.params.idPersona
    });
    PaseSalida.findByIdAndUpdate(body,{useFindAndModify: true},{ $push: { ajsnEstatus: estatus } }).then((resp) => {
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            cont: err
        });
    });
});


module.exports = app;