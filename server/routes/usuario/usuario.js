/* jshint esversion: 8 */
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../../models/usuario');
const Persona = require('../../models/persona');

app.get('/obtener', (req, res) => {

    Usuario.find().then((usuarios) => {

        if (usuarios.length <= 0) {
            return res.status(404).json({
                msg: 'No hay usuarios registrados.',
                cont: usuarios
            });
        }

        return res.status(200).json({
            msg: 'Listado de usuarios.',
            cont: usuarios
        });

    }).catch((err) => {
        return res.status(500).json({
            msg: 'Erro al obtener los usuarios de la DB.',
            cont: err
        });
    });

});

app.get('/obtener/:idUsuario', (req, res) => {

    Usuario.findById(req.params.idUsuario).then((usuario) => {

        return res.status(200).json({
            msg: 'Usuario consultado.',
            cont: usuario
        });

    }).catch((err) => {
        return res.status(500).json({
            msg: 'Erro al obtener el usuario de la DB.',
            cont: err
        });
    });

});

app.post('/registrar', (req, res) => {
    let body = req.body;

    let persona = new Persona({
        numNoEmpleado: body.numEmpleado,
        strNombre: body.nombre,
        strEmail: body.correoElectronico,
        strContraseña: bcrypt.hashSync(body.contraseña,10),
        idTipoEmpleado: body.idEmpleado,
        idDireccion: body.idDireccion

    });
    persona.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});


app.put('/actualizar/:idUsuario', (req, res) => {

    const usuario = new Usuario({
        _id: req.params.idUsuario,
        strNombre: req.body.strNombre,
        strApellidoPat: req.body.strApellidoPat,
        strApellidoMat: req.body.strApellidoMat,
        strCorreo: req.body.strCorreo,
        strDireccion: req.body.strDireccion,
        strColonia: req.body.strColonia
    });
    console.log(req.params.idUsuario);

    Usuario.findByIdAndUpdate(req.params.idUsuario, usuario).then((resp) => {
        return res.status(200).json({
            msg: 'El usuario se ha actualizado exitosamente.',
            cont: resp
        });
    }).catch((err) => {
        return res.status(400).json({
            msg: 'Oups! Ocurrió un error al actualizar el usuario.',
            cont: err
        });

    });
});

app.delete('/eliminar/:idUsuario', (req, res) => {

    Usuario.deleteOne({ _id: req.params.idUsuario }).then((usuario) => {
        return res.status(200).json({
            msg: 'El usuario se ha eliminado exitosamente.',
            cont: usuario
        });
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Oups! Ocurrió un error al eliminar el usuario.',
            cont: err
        });
    });

});

module.exports = app;