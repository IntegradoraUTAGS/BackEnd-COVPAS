const express = require('express');
const _ = require('underscore');
const SalidaVehiculo = require('../../models/paseSalidaVehiculo');
const Salidas = require('../../models/paseSalida');
const sendMail = require('../../../scripts/correoAprovacionVehiculos');
const Persona = require('../../models/persona');
const app = express();

app.post('/registrar/:id', (req,res) => {
    const solicitud = new SalidaVehiculo({
            idPaseSalida: req.params.id,
            dteFechasolicitud: req.body.dteFechasolicitud,
            idVehiculo: req.body.idVehiculo,
            strServicio: req.body.strServicio,
            strChofer: req.body.strChofer,
            strObservaciones: req.body.strObservaciones,
            idAutoriza1: req.body.idAutoriza1,
            idAutoriza2: req.body.idAutoriza2,
            idAutoriza3: req.body.idAutoriza3,
            idAutoriza4: req.body.idAutoriza4
    });

    new SalidaVehiculo(solicitud).save().then((resp) => {
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

app.get('/obtener/:numNoEmpleado', (req, res) => {
    
   Persona.findOne({numNoEmpleado: req.params.numNoEmpleado}).then((resp) => {
       console.log(resp)
       Salidas.findOne({idPersona: resp._id,strEstatus: "Aceptado"}).then((resp) => {
           console.log(resp);
       }).catch((err) => {
           console.log(err)
       });
   }).catch((err) => {
       return res.status(400).json({
           ok: false,
           cont: err
       });
   });
    
});

app.get('/actualizar/estatus/:id/:strEstatus', (req, res) => {
    let id =req.params.id;
    let status = req.params.strEstatus;
    SalidaVehiculo.update({_id: id},{$set:{strEstatus: status}}, (err, PaseDB) => {
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

    app.get('/enviarConfirmacion/:idPaseSalia', (req,res) => {
        SalidaVehiculo.findOne({ _id: req.params.idPaseSalida})
        .populate('idPersona')
        .populate('idVehiculo')
        .populate('idAutoriza1')
        .populate('idAutoriza2')
        .populate('idAutoriza3')
        .populate('idAutoriza4')
            .then((resp) =>{
                console.log(resp.ajsnTraslado);
                sendMail.authorizerMail(
                    resp.idAutoriza1.strEmail,
                    resp.idAutoriza2.strEmail,
                    resp.idAutoriza3.strEmail,
                    resp.idAutoriza4.strEmail || '',
                    resp.idPersona.strNombre,
                    resp.idPersona.numNoEmpleado,
                    resp.dteHoraSalida,
                    resp.dteHoraRegreso,
                    resp.ajsnTraslado,
                    resp._id);    
            }).catch((err)=>{
                console.log(err);
            });
    });
});

module.exports = app;