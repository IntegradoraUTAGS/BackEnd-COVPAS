const express = require('express');
const Pase = require('../models/paseSalida');
const app = express();
const _ = require('underscore');


app.get('/paseSalida',(req, res)=>{
    Pase.find()
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

app.post('/solicitar',(req,res)=>{

    let body = req.body;
    let pase = new Pase({
        strMotivo: body.motivo,
        idEstatus: body.estatus,
        idPersona: body.persona,
        idVehiculo: body.vehiculo,
        numUidad:body.unidad
    });
    pase.save((err, Pase) =>{
        if (err) {
           return res.status(400).json({
                ok:false,
                err
            });            
        }
        return res.status(200).json({
            ok: true,
            Pase
        });
    });


});



app.put('/paseSalida/:id', (req, res) => {
    let idPrestamo =req.params.id;
    let body = _.pick(req.body, 'idEstatus');

    Pase.findByIdAndUpdate(idPrestamo, body,{new:true, runValidators:true , context:'query'},(err, PaseDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            Pase
        });
    });

});



module.exports = app;