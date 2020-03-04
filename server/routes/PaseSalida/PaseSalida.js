const express = require('express');
const _ = require('underscore');
const Salidas = require('../../models/paseSalida');
const sendMail = require('../../../scripts/mail');
const app = express();
app.get('/:id',(req, res)=>{
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
app.put('/:id', (req, res) => {
    let id =req.params.id;
    let body = _.pick(req.body, 'strEstatus');

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
app.post('/:id', (req, res) => {
    let body = req.body;
    let email = req.body.email;
    let salida = body.dteHoraSalida;
    let regreso = body.dteHoraRegreso;
    let destino = 'prueba';
    let nombre = 'nombre prueba';
    let noEmpleado = '12345';
    let paseSalida = new Salidas({
        dteHoraSalida: body.dteHoraSalida,
        dteHoraRegreso: body.dteHoraRegreso,
        strMotivo: body.strMotivo,
        strRegreso: body.strRegreso,
        idPersona: req.params.id
    });
    
    new Salidas(paseSalida).save().then((resp) => {
        sendMail.authorizerMail(email, nombre, noEmpleado, salida, regreso, destino);
        return res.status(200).json({
            ok: true,
            msg: 'Enviada solicitud de pase de salida esperando respuesta...',
            cont: resp
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