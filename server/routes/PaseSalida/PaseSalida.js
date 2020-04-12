/* jshint esversion: 6 */
const express = require('express');
const _ = require('underscore');
const Salidas = require('../../models/paseSalida');
const app = express();
app.get('/obtener/:id', (req, res) => {
    
    let id = req.params.id;
    Salidas.findOne({ _id: id })
        .exec((err, pase) => {
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
app.get('/actualizar/estatus/:id/:strEstatus', (req, res) => {
    let id =req.params.id;
    let status = req.params.strEstatus;
    Salidas.update({_id: id},{$set:{strEstatus: status}}, (err, PaseDB) => {
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
        idPersona: req.params.id,
        idAutoriza: req.body.idAutoriza,
        strEmpresaVisita: req.body.strEmpresaVisita,
        strPersonaCita: req.body.strPersonaCita,
        dteFecha: req.body.dteFecha
    });
    
    new Salidas(paseSalida).save().then((pase) => {
        //sendMail.authorizerMail(mail,name,noEmpleado,salida,regreso,destino);
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
app.get('/enviarConfirmacion/:idPaseSalia', (req,res) => {
    Salidas.findOne({ _id: req.params.idPaseSalida}).populate('idPersona').populate('idAutoriza')
        .then((resp) =>{
            console.log(resp.ajsnTraslado);
            sendMail.authorizerMail(resp.idAutoriza.strEmail,resp.idPersona.strNombre,resp.idPersona.numNoEmpleado,resp.dteHoraSalida,resp.dteHoraRegreso,resp.ajsnTraslado,resp._id);    
        }).catch((err)=>{
            console.log(err);
        });
});
module.exports = app;