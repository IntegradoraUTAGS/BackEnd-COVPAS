/* jshint esversion: 6 */
const vigilancia = require('../../models/paseSalidaVigilancia');
const PaseSalida = require('../../models/paseSalida');
const Persona = require('../../models/persona');
const PaseSalidaVehiculo = require('../../models/paseSalidaVehiculo');
const _ = require('underscore');

const express = require('express');

const app = express();

app.get('/obtener', (req, res) => {
    vigilancia.find().then((resp) => {
        return res.status(200).json({
            ok: true,
            msg: 'Pases de salida de vigilancia',
            cont: resp
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            msg: 'Oh oh ocurrio un error verifica e intenta de nuevo',
            cont: err
        });
    });
});

app.post('/registrar',(req,res) => {
    const vigilanciaBody = {
        idPaseSalida: req.body.idPaseSalida,
        idPersona: req.body.idPersona,
        dteHoraSalidaPase: req.body.dteHoraSalidaPase,
        dteHoraSalidaViglancia: req.body.dteHoraSalidaViglancia,
        dteHoraRegresoPase: req.body.dteHoraRegresoPase,
        dteHoraRegresoViglancia: req.body.dteHoraRegresoViglancia,
        nivelGasolinaSalida: req.body.nivelGasolinaSalida,
        nivelGasolinaRegreso: req.body.nivelGasolinaRegreso,
        kmSaida: req.body.kmSaida,
        kmRegreso: req.body.kmRegreso
    }

   new vigilancia(vigilanciaBody).save().then((resp)=> {
       return res.status(200).json({
           ok: true,
           msg: 'Finalizado pase de salida con exito',
           cont: resp
       });
   }).catch((err) => {
       return res.status(400).json({
           ok: false,
           msg: 'Ocurrio un error intenta de nuevo',
           err
       });
   });
});
   
    app.put('/finalizar/:id', (req, res) => {
        let id = req.params.id
        let body = _.pick(req.body, ['gasolinaRegreso','kilometrosRegreso','estatus']);
                
            PaseSalidaVigilancia.findByIdAndUpdate(id,body,{new:true, runValidators:true , context:'query'})
            .then((resp)=>{
            return res.status(200).json({
                ok: true,
                msg: 'Pase de salida Finalizado con exito',
                cont: resp
            }); 
            }).catch((err) => {
                return res.status(400).json({
                    ok: false,
                    msg: 'Oh oh ocurrio un error',
                    cont: err
                });
            });
        
        })

app.get('/obtener/paseSalida/:num',(req,res) => {
    Persona.findOne({numNoEmpleado: req.params.num}).then((resp) =>{
        console.log(resp._id);
        PaseSalida.findOne({idPersona:resp._id,strEstatus:"Aceptado"}).then((paseSalida) =>{
            console.log(paseSalida._id);
            PaseSalidaVehiculo.findOne({idPaseSalida: paseSalida._id, strEstatus: "En progreso"}).populate('idPaseSalida').then((resp)=>{
                if(resp == null){
                    return res.status(200).json({
                        ok: true,
                        msg: 'Solo se obtuvo pase de salida sin vehiculo',
                        cont: paseSalida
                    });
                } else {
                    return res.status(200).json({
                        ok:true,
                        msg: 'Se obtuvo pase de salida con vehiculo',
                        cont: resp
                    });
                }
            }).catch((err) => {
                
            })
        }).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err);
    });
})



module.exports = app;