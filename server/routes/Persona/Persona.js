/* jshint esversion: 6 */
const Persona = require('../../models/persona');
const express = require('express');
const bcrypt = require('bcrypt');
const { verificaToken } = require('../../middlewares/autenticacion');
const _ = require('underscore');
const app = express();

app.get('/obtener', (req, res) => {
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

app.put('/actualizar/:id', (req, res) => {
    let body = _.pick(req.body, ['strNombre','strTipoEmpleado','numDiasDisponibles']);
    Persona.findByIdAndUpdate(req.params.id, body, (err, resp) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                cont: err
            });
        }
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    });
});

app.delete('/eliminar/:id', (req, res) => {
    Persona.findByIdAndUpdate(req.params.id, {$set:{active: false}}, (err, resp) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

app.put('/ModificarDias/:id', (req, res) => {
    let id =req.params.id;
    let body = _.pick(req.body, 'numDiasDisponibles');

    persona.findByIdAndUpdate(id, body,{new:true, runValidators:true , context:'query'},(err, PaseDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            PaseDB
        });
    });
});

app.get('/obtener/:id', (req, res) => {
    Persona.findById(req.params.id).populate('idDireccion').then((resp) => {
        return res.status(200).json({
            ok: true,
            resp
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err 
        });
    });
});
module.exports = app;