module.exports = {
    port: process.env.PORT || 7870,
    db: process.env.MONGODB_URI || 'mongodb://vsucci16:isc9394@127.0.0.1:27017/vsucci16?authSource=vsucci16',
    SECRET_TOKEN: 'GPG'
    
}