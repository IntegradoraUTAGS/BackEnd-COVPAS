const mongoose = require('mongoose');
const express = require('express');
const Persona = require('../../models/persona');
const bcrypt = require('bcrypt');
const app = express();

app.post('/registro', (req, res) => {
    let body = req.body;
    const usuario = new Persona({
        numNoEmpleado: body.numNoEmpleado,
        strNombre: body.strNombre,
        strEmail: body.strEmail,
        strContraseña: bcrypt.hashSync(body.strContraseña, 10),
        idDireccion: body.idDireccion,
        idTipoEmpleado: body.strTipoEmpleado
    })
    Persona.findOne({ strEmail: body.strEmail }).then((persona) => {
        if (persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Ese correo ya existe'
            })
        }

        new Persona(usuario).save().then((resp) => {
            return res.status(200).json({
                ok: true,
                msg: 'Usuario registrado con exito',
                cont: resp
            });
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
                msg: 'Oh oh ocurrio un error al registrar un usuario',
                cont: err
            });
        });
    }).catch((err) => {
        return res.status(400).json({
            cont: err
        });
    });
});

module.exports = app;