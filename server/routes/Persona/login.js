/* jshint esversion: 6 */
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const Persona = require('../../models/persona');
const mongooseHidden = require('mongoose-hidden');



app.post('/login', (req, res) => {
    let body = req.body;
    Persona.findOne({ numNoEmpleado: body.numNoEmpleado}, (err, usuarioDB) => {
        Persona.plugin(mongooseHidden, {
            hidden: {
                _id: false,
                strPassword: true
            }
        });
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "*Usuario y/o Contraseña incorrectas"
                }
            });
        }
        if (!bcrypt.compareSync(body.strPassword, usuarioDB.strPassword)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario y/o *Contraseña incorrectas"
                }
            });
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        return res.status(200).json({
            ok: true,
            persona: usuarioDB,
            token
        });
    });
});


module.exports = app;