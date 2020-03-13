/* jshint esversion: 6 */
const express = require('express');
const _ = require('underscore');
const Salidas = require('../../models/paseSalida');
const sendMail = require('../../../scripts/mail');
const app = express();
app.get('/obtener/:id',(req, res)=>{
    let id = req.params.id;
    Salidas.find({_id:id})
    .exec((err, pase)=>{
       if (err) {
           return res.status(400).json({
               ok: false,
               err
           });
       } 
       return res.status(200).json({
           ok: true,
           count: pase.length,
           pase
       });
    });
});
app.put('/actualizar/estatus/:id', (req, res) => {
    let id =req.params.id;
    let body = _.pick(req.body, 'idEstatus');

    Salidas.findByIdAndUpdate(id, body,{new:true, runValidators:true , context:'query'},(err, PaseDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            PaseDB
        });
    });

});
app.post('/registrar/:id', (req, res) => {
    let paseSalida = new Salidas({
        dteHoraSalida: req.body.dteHoraSalida,
        dteHoraRegreso: req.body.dteHoraRegreso,
        strMotivo: req.body.strMotivo,
        blnRegreso: req.body.blnRegreso,
        idPersona: req.params.id
    });
    
    new Salidas(paseSalida).save().then((pase) => {
        //sendMail.authorizerMail(email, nombre, noEmpleado, salida, regreso, destino);
        return res.status(200).json({
            ok: true,
            msg: 'Enviada solicitud de pase de salida esperando respuesta...',
            cont: pase
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            msg: 'Algo salio mal intenta de nuevo',
            cont: err
        });
    });
});

module.exports = app;