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

    console.log(destino)

    if(Array.isArray(destino)){
    destino.forEach((de, i) => {
        console.log(de , destino2[i]);

        PaseSalida.findOneAndUpdate({_id: req.params.idpasesalida},{ $push: { ajsnTraslado: { de, a: destino2[i]} } }, (err, paseDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            console.log((destino.length-1), i);
            // console.log(i)
            if( (destino.length-1) === i) {
                PaseSalida.findOne({ idAutoriza: paseDB.idAutoriza}).populate('idPersona').populate('idAutoriza')
        .then((resp) =>{
            console.log(resp.ajsnTraslado);
            sendMail.authorizerMail(resp.idAutoriza.strEmail,resp.idPersona.strNombre,resp.idPersona.numNoEmpleado,resp.dteHoraSalida,resp.dteHoraRegreso,resp.ajsnTraslado);    
        }).catch((err)=>{
            console.log(err);
        });
                return res.status(200).json({
                    ok: true,
                    paseDB
                });
            }

        });
    });
    } 
    else {
    PaseSalida.findOneAndUpdate({_id: req.params.idpasesalida},{ $push: { ajsnTraslado: { de: destino, a: destino2} } }, (err, paseDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        PaseSalida.findOne({ idAutoriza: paseDB.idAutoriza}).populate('idPersona').populate('idAutoriza')
        .then((resp) =>{
            console.log(resp.ajsnTraslado);
            sendMail.authorizerMail(resp.idAutoriza.strEmail,resp.idPersona.strNombre,resp.idPersona.numNoEmpleado,resp.dteHoraSalida,resp.dteHoraRegreso,resp.ajsnTraslado);    
        }).catch((err)=>{
            console.log(err);
        });
        return res.status(200).json({
            ok: true,
            paseDB
        });
    });
}
});

module.exports = app;