/* jshint esversion: 6 */
const PaseSalidaVigilancia = require('../../models/paseSalidaVigilancia');
const PaseSalida = require('../../models/paseSalidaVehiculo');
const _ = require('underscore');

const express = require('express');

const app = express();

app.get('/obtener', (req, res) => {
    PaseSalidaVigilancia.find().then((resp) => {
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

app.post('/registrar', (req, res) => {
    let body = req.body;

    const paseSalidaVigilancia = new PaseSalidaVigilancia({
       paseSalida : body.paseSalida,
       observacion: body.observacion,
       nombreReviso:body.nombreReviso,
       kilometrosSalida:body.kilometrosSalida,
       gasolinaSalida:body.gasolinaSalida
        
    });
       new PaseSalidaVigilancia(paseSalidaVigilancia).save().then((resp) => {
            
        PaseSalida.findByIdAndUpdate({_id:paseSalidaVigilancia.paseSalida},{strEstatus:'false'})
        .then((resp)=>{
            
        });

        return res.status(200).json({
            ok: true,
            msg: 'Pase de salida revisado con exito',
            cont: resp
        }); 
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
                msg: 'Oh oh ocurrio un error al registrar un usuario',
                cont: err
            });
        });
    
    })
   
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




module.exports = app;