const nodemailer = require('nodemailer');

sendMail = (name,noEmpleado,salida,regreso,destino) =>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'COVPAS2020@gmail.com',
            pass: 'UnPMtWy46uVbSDH',
        }
    });
    
    let mailOptions = {
        from: 'COVPAS2020@gmail.com',
        to: 'alex13pks@gmail.com, nataacero1@gmail.com',
        subject: 'Testing nodemailer',
        html: `<h1>SOLICITUD DE PASE DE SALIDA</h1><strong>${name}</strong>
         <strong>${noEmpleado}</strong> está solicitando un pase de salida <br>Con destino a 
         <strong>${destino}</strong> sale 
         <strong>${salida}</strong> y regresa
          <strong>${regreso}</strong><br>
          <a href="google.com">
          <button style="font-size: 20pt;min-width: 200px;max-width: 500px;min-height: 100px; max-height: 300px;background-color: rgba(81, 194, 81, 0.76);margin-top: 50px;">ACEPTAR</button>
          </a> <a href="google.com?">
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

module.exports = sendMail;