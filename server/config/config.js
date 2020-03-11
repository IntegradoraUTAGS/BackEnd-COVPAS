/* jshint esversion: 6 */
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV === 'dev') {
    //'mongodb://localhost:27017/COVPAS';
    process.env.URLDB = 'mongodb://localhost:27017/COVPAS';

} else {
    process.env.URLDB = '';
}


//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-covpas';

//EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '12h';