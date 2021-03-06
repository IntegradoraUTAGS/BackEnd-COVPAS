/* jshint esversion: 6 */
const express = require('express');
const _ = require('underscore');
const sendMail = require('../../../scripts/correoAprobacionVacaciones');
const controlVacaciones = require('../../models/controlVacaciones');
const persona = require('../../models/persona');
const app = express();

app.get('/obtener', (req, res)=>{
    controlVacaciones.find().populate('idPersona').populate('idAutoriza').then((resp)=> {
        return res.status(200).json({
            ok: true, 
            resp
        });
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

app.get('/obtener/:id', (req, res)=>{
    controlVacaciones.findOne({_id: req.params.id}).populate('idPersona').populate('idAutoriza').then((resp)=> {
        return res.status(200).json({
            ok: true, 
            resp
        });
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});
app.post("/registrar", (req, res) => {

    const vacaciones = new controlVacaciones({
        idPersona: req.body.idPersona,
        idAutoriza: req.body.idAutoriza,
        adteFechas: req.body.adteFechas
    });
    
    new controlVacaciones(vacaciones).save().then((resp) => {
        res.json({resp});
    }).catch((err) => {
        res.json({
            ok: false,
            msg: 'Ocurio un error verifica e intenta de nuevo',
            err});
    });
});

app.put('/actualizarDias/:id', (req, res) => {
    controlVacaciones.findOneAndUpdate({_id: req.params.id}, { $push: { adteFechas:req.body.fecha}}).then((resp) => {
        return res.status(200).json({
            ok: true,
            resp
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

app.get('/enviarConfirmacion/:id', (req,res) => {
    controlVacaciones.findOne({ _id: req.params.id}).populate('idPersona').populate('idAutoriza').populate('idDireccion')
        .then((resp) =>{
            console.log(resp.adteFechas);
            sendMail.authorizerMail(resp.idAutoriza.strEmail,resp.idPersona.strNombre, resp.idPersona.numNoEmpleado,resp.adteFechas,resp._id);    
        }).catch((err)=>{
            console.log(err);
        });
});

app.put('/actualizar/:id/:idPersona',(req,res) => {
    let body = _.pick(req.params,'id');
    let estatus = new Estatus({
        idPersona: req.params.idPersona
    });
    controlVacaciones.findByIdAndUpdate(body,{useFindAndModify: true},{ $push: { ajsnEstatus: estatus } }).then((resp) => {
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
app.get('/actualizar/estatus/:id/:strEstatus', (req, res) => {
    let id =req.params.id;
    let status = req.params.strEstatus;
    controlVacaciones.update({_id: id},{$set:{strEstatus: status}}, (err, PaseDB) => {
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

module.exports = app;