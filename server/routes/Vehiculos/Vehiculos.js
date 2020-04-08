const express = require('express');
const _ = require('underscore');
const Vehiculos = require('../../models/Vehiculos');
const app = express();

app.get('/obtener', (req, res) => {
    Vehiculos.find()
        .exec((err, vehiculos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: vehiculos.length,
                vehiculos
            });
        });
});

app.get('/obtener/:id', (req, res) => {
    Vehiculos.findOne({_id: req.params.id})
        .exec((err, vehiculos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err 
                });
            }

            return res.status(200).json({
                ok: true,
                count: vehiculos.length,
                vehiculos
            });
        });
});

app.post('/registrar', (req, res) => {
    let body = req.body;

    let vehiculos = new Vehiculos({
        strUnidad: body.strUnidad,
        strMarca: body.strMarca,
        strPlaca: body.strPlaca,
        numModelo: body.numModelo,
        strNodeMotor: body.strNodeMotor,
        strNIV: body.strNIV
    });

    vehiculos.save((err, vhlDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            vhlDB
        });
    });
});

app.put('/actualizar/:id', (req, res) => {

   let body = _.pick(req.body, ['strUnidad',
   'strMarca',
   'strPlaca',
   'numModelo',
   'strNodeMotor',
   'strNIV']);

    Vehiculos.findByIdAndUpdate(req.params.id,body,(err, vhlDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            vhlDB
        });
    });
});
app.put('/actualizar/estatus/:id', (req, res) => {
    let id = req.params.id;
    	let status = req.body.blnEstatus;
    Vehiculos.findByIdAndUpdate(id, {$set: {blnEstatus: status}}, (err, vhlDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            vhlDB
        });
    });

});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
     Vehiculos.deleteOne({ _id: id }, (err, resp) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             });
         }
         if (resp.deletedCount === 0) {
             return res.status(400).json({
                 ok: false,
                 err: {
                     id,
                     msg: 'Usuario no encontrado'
                 }
             });
         }
         return res.status(200).json({
             ok: true,
             resp
         });
     });


});


module.exports = app;