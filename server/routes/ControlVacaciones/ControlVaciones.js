const express = require('express');
const _ = require('underscore');
const sendMail = require('../../../scripts/mail');
const controlVacaciones = require('../../models/controlVacaciones');
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