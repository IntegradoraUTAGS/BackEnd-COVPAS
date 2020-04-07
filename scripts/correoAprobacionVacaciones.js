/* jshint esversion: 6 */

const nodemailer = require('nodemailer');

 const authorizerMail = (mail,name,noEmpleado,fecha,idVacaciones) =>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'COVPAS2020@gmail.com',
            pass: 'UnPMtWy46uVbSDH',
        }
    });

    let mailOptions = {
        from: 'COVPAS2020@gmail.com',
        to: ` alex13pks@gmail.com, aleesfeo1234@gmail.com,${mail}`,
        subject: `Aprobacion de Vacaciones de ${noEmpleado}` ,
        html: `<h1>Aprobacion de Vacaciones</h1>
        <strong>${name} ${noEmpleado}</strong> está solicitando una aprobación de vacaciones <br>
        los dias de  
         <strong>${fecha}</strong></br>
          <a href="http://localhost:4200/confirmar-vacaciones/${idVacaciones}/Aceptado">
          <button style="font-size: 20pt;min-width: 200px;max-width: 500px;min-height: 100px; max-height: 300px;background-color: rgba(81, 194, 81, 0.76);margin-top: 50px;">ACEPTAR</button>
          </a> <a href="http://localhost:4200/confirmar-vacaciones/${idVacaciones}/Rechazado">
          <button style="font-size: 20pt;min-width: 200px;max-width: 500px; min-height: 100px;max-height: 300px;background-color: rgba(194, 81, 81, 0.76);margin-top: 50px;margin-left: 50px;">DENEGAR</button>
          
          </a>` //html body
    
    }
     transporter.sendMail(mailOptions, function(err,data) {
        if(err) {
            console.log('ERROR', err);
        } else {
            console.log('Email SENT');
        }
    });
};

exports.authorizerMail = authorizerMail;