/* jshint esversion: 6 */

const nodemailer = require('nodemailer');

 const authorizerMail = (mail1,mail2,mail3,mail4,name,noEmpleado,salida,regreso,destino,idPaseSalida) =>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'COVPAS2020@gmail.com',
            pass: 'UnPMtWy46uVbSDH',
        }
    });
   
    let mailOptions = {
        from: 'COVPAS2020@gmail.com',
        to: ` alex13pks@gmail.com, aleesfeo1234@gmail.com,${mail1},${mail2},${mail3},${mail4}`,
        subject: 'Testing nodemailer',
        html: `<h1>SOLICITUD DE VEHICULO</h1><strong>${name}</strong>
         <strong>${noEmpleado}</strong> está solicitando un vehiculo<br>Con destino a 
         <strong>De: ${destino[0].De} A: ${destino[0].A}</strong> sale 
         <strong>${salida}</strong> y regresa
          <strong>${regreso || ''}</strong><br>
          <a href="http://172.17.1.7:8096/confirmar-pase-salida-vehiculo/${idPaseSalida}/Aceptado">
          <button style="font-size: 20pt;min-width: 200px;max-width: 500px;min-height: 100px; max-height: 300px;background-color: rgba(81, 194, 81, 0.76);margin-top: 50px;">ACEPTAR</button>
          </a> <a href="http://172.17.1.7:8096/confirmar-pase-salida-vehiculo/${idPaseSalida}/Rechazado">
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
