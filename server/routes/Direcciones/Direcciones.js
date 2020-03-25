/* jshint esversion: 8 */
const Direccion = require('../../models/direccion');
const Departamento = require('../../models/departamentos');
const _ = require('underscore');
const express = require('express');
const app = express();

app.post('/registrar',(res,req) =>{
    const dir = new Direccion({
        strNombre: req.body.strNombre
    });

    new Direccion(dir).save().then((resp)=> {
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    }).catch((err)=> {
        return res.status(400).json({
            ok: false,
            cont: err
        });
    });
});

app.put('/actualizar/departamentos/:id', (req,res) =>{
    let body = _.pick(req.body, ['strNombre']);
    Departamento.findByIdAndUpdate(req.params.id,{useFindAndModify: true},{ $push: { ajsnTraslado: destinos } }, (err, dirDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            dirDB
        });
    });

});



app.get('/obtener', (req,res) =>{
    Direccion.find({}).then((resp)=>{
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            cont: err
        });
    });
});

module.exports = app;