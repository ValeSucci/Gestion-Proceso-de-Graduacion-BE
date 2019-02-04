const config = require('./config');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('useCreateIndex', true);

mongoose.connect(config.db, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        return console.log(`[index] Hubo un error al inicializar ${err}`)
    } else {
        console.log('[index] Conexion a DB establecida')
        app.listen(config.port, () => {
            console.log(`[index] Api ejecutandose desde el puerto ${config.port}`)
        })
    }
})

var carta = require('./controllers/cartas');
//carta.insertCartas(); 