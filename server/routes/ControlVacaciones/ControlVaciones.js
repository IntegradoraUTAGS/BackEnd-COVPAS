const express = require('express');
const _ = require('underscore');
const sendMail = require('../../../scripts/correoAprobacionVacaciones');
const controlVacaciones = require('../../models/controlVacaciones');
const app = express();

app.get('/ObtenerVacaciones', (req, res)=>{
    controlVacaciones.find().then((resp)=> {
        return res.status(200).json({
            ok: true, 
            resp
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        })
    })
});


app.post('/registrar', (req, res) => {
    let body = req.body
    let controlvacaciones = new controlVacaciones({
        idPersona: body.idPersona,
        idDireccion: body.idDireccion,
        idAutorizador:body.idAutorizador,
        ajsnFechaSolitada:body.ajsnFechaSolitada,


    });
    
    new controlVacaciones(controlvacaciones).save().then((vacaciones) => {
        sendMail.authorizerMail(mail,name,noEmpleado,direccion,fecha,IdAutorizador)
        return res.status(200).json({
            ok: true,
            msg: 'Enviada solicitud de pase de salida esperando respuesta...',
            cont: vacaciones
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