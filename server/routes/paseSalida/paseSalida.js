const express = require('express');
const app = express();
const PaseSalida = require('../../models/paseSalida');

app.get('/obtener/:id', (req, res) => {
    let id=req.params.id;

    PaseSalida.find({_id:id}, (err, pase)=> {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            pase
        });
    });
});

app.post("/registrar", (req, res) => {

    const paseSalida = new PaseSalida({
        dteHoraSalida: new Date(),
        dteHoraRegreso: new Date(),
        strMotivo: "Requiero salir"
    })

    new PaseSalida(paseSalida).save().then((resp) => {
        res.json({resp})
    }).catch((err) => {
        res.json({err})
    })
})


//app.get('/obtener/status', (req,res) => {
    //console.log('')
    //res.json({
    //})
//});

    module.exports = app;