/* jshint esversion: 6 */
const Persona = require('../../models/persona');
const express = require('express');
const bcrypt = require('bcrypt');
const { verificaToken } = require('../../middlewares/autenticacion');
const app = express();

app.get('/obtener',[verificaToken], (req, res) => {
    Persona.find({ active: true }).populate('idDireccion').then((resp) => {
        return res.status(200).json({
            ok: true,
            msg: 'Mostrando todas las personas registradas',
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

app.post('/registrar',  (req, res) => {
    let body = req.body;

    const usuario = new Persona({
        numNoEmpleado: body.numNoEmpleado,
        strNombre: body.strNombre,
        strEmail: body.strEmail,
        strPassword: bcrypt.hashSync(body.strPassword, 10),
        strTipoEmpleado: body.strTipoEmpleado,
        idDireccion: body.idDireccion
    });

    if (body.strPassword.length < 8) {
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña debe contener 8  caracteres'
        });
    }

    if (usuario.numNoEmpleado < 999) {
        return res.status(400).json({
            ok: false,
            msg: 'Número de empleado debe contener 4 caracteres'
        });
    }

    Persona.findOne({ strEmail: body.strEmail }).then((persona) => {

        if (persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Ese correo ya existe'
            });
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

app.put('/actualizar', (req, res) => {

})

module.exports = app;