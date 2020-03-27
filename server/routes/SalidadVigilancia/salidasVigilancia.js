/* jshint esversion: 6 */
const express = require('express');
const _ = require('underscore');
const persona = require('../../models/persona');
const app = express();

app.get('/ObtenerSalidasVigilancia', (req, res)=>{
    persona.find().then((resp)=> {
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


module.exports = app;