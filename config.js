module.exports = {
    port: process.env.PORT || 7870,
    db: process.env.MONGODB_URI || 'mongodb://admi:4dm12019!@127.0.0.1:27017/admi?authSource=admi',
    //db: process.env.MONGODB_URI || 'mongodb://localhost:27017/gestionprocesograduacion',
    SECRET_TOKEN: 'GPG'
    
}