/* jshint esversion: 8 */
const Direccion = require('../../models/direccion');
const express = require('express');
const app = express();

app.post('/registrar',(res,req) =>{
    let dir = new Direccion({
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

module.exports = app;