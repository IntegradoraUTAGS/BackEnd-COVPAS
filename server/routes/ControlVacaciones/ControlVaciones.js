/* jshint esversion: 6 */
const express = require('express');
const _ = require('underscore');
const sendMail = require('../../../scripts/correoAprobacionVacaciones');
const controlVacaciones = require('../../models/controlVacaciones');
const persona = require('../../models/persona');
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
})

app.post("/RegistarVacaciones", (req, res) => {

    const controlVacaciones = new controlVacaciones({
        dteHoraSalida: new Date(),
        dteHoraRegreso: new Date(),
        strMotivo: "Ocupo De Un Dato"
    })
    
    new controlVacaciones(controlVacaciones).save().then((resp) => {
        res.json({resp})
    }).catch((err) => {
        res.json({err})
    })
})


app.put('/RestarDias/:id', (req, res) => {
    let id =req.params.id;
    let body = _.pick(req.body, 'numDiasDisponibles');

    persona.findByIdAndUpdate(id, body,{new:true, runValidators:true , context:'query'},(err, PaseDB)=>{
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