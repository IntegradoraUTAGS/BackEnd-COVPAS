const express = require('express');
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();

const Usuario = require('../../models/persona');
app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) => {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    //archivo unico y guardarlo con extension del archivo.name
    let nombre = uniqid() + path.extname(archivo.name);

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }
    let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg', 'img/jfif'];
    if (!validExtensions.includes(archivo.mimetype)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "solo exensiones <png,jpg,gif,jpeg, jfif> aon validas"
            }
        });
    }
    archivo.mv(`./uploads/${ruta}/${nombre}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    });
    switch (ruta) {

        case 'usuario':
            imagenUsuario(id,res, nombre);
            break;
        default:
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ruta no valida'
                }
            });
    }
});

//RETORNA AL USUARIO CON ID
//ayuda a actualizar el nombre de la imagen en la bd //valida que la consulta este bien hecha
function imagenUsuario(id, res, nombreImagen) {
    Usuario.findById(id).then((resp)=>{
        if(resp != null){
            let usr = resp;
            usr.imgLicencia = path.resolve(`./uploads/usuario/${nombreImagen}`);
            usr.save().then((resp) => {
            console.log('imagen actualizada');
            return res.status(200).json({
                ok: true,
                msg: 'imagen actualizada',
                resp
            });
            }).catch((err)=>{
                console.log(err);
                borrarArchivo(nombreImagen, 'usuario');
                return res.status(400).json({
                    ok: false,
                    msg: 'Imagen no actualizada ocurrio un error',
                    err
                })
           }); 
        }
        if(resp == null){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error intenta de nuevo',
                err: 'no se encontro el usuario'
            })
        }
    }).catch((err) => {
        console.log(err);
    });
}

function borrarArchivo(nombreImagen, ruta) {
    let pathImg = path.resolve(__dirname, `./uploads/${ruta}/${nombreImagen}`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
    console.log('Imagen borrada con exito');
}
module.exports = app;