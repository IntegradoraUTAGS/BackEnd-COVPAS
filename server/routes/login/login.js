const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const Persona = require('../../models/persona');



app.post('/login', (req, res) => {
    let body = req.body;
    Persona.findOne({ numNoEmpleado: body.numEmpleado}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioDB) {


            return res.status(400).json({
                ok: false,
                err: {
                    message: "*Usuario y/o Contraseña incorrectas"
                }
            })
        }
        if (!bcrypt.compareSync(body.contraseña, usuarioDB.strContraseña)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario y/o *Contraseña incorrectas"
                }
            })
        }
        return res.status(200).json({
            ok: true,
            persona: usuarioDB
        });
    });
});


module.exports = app;