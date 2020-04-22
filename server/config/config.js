/* jshint esversion: 6 */
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV === 'dev') {
    //'mongodb://localhost:27017/COVPAS';
    process.env.URLDB = 'mongodb+srv://COVPAS:UsQiphJPPEiIQij5@cluster0-fh2p2.mongodb.net/COVPAS?retryWrites=true&w=majority';

} else {
    process.env.URLDB = 'mongodb+srv://COVPAS:UsQiphJPPEiIQij5@cluster0-fh2p2.mongodb.net/COVPAS?retryWrites=true&w=majority';
}


//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-covpas';

//EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '12h';