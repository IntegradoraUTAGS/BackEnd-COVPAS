import { find } from '../../models/persona';
import express from 'express';
const app = express();


app.get('/personas',(req,res) => {
    find({active: true}).then((resp) =>{
        return res.status(200).json({
            ok: true,
            msg: 'Mostrando todas las personas registradas',
            cont: resp
        });
    }).catch((err)=> {
        return res.status(400).json({
            ok: false,
            msg: 'Oh oh ocurrio un error verifica e intenta de nuevo',
            cont: err
        })
    });
});

module.exports = app;