const Notificacion = require('../models/notifiaciones').Notifiacion;


function getAll(req,res) {
    Notificacion.find({},(error, notificaciones)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(notificaciones)
        }
    })
}

function createNotificacion(req,res) {
    var notificacion = new Notificacion({
        codigo: req.body.codigo,
        asunto: req.body.asunto,
        fecha_asunto: req.body.fecha_asunto,
        fecha_publicacion: req.body.fecha_publicacion
    })
    notificacion.save().then(
        (not)=>{
            res.send(not);
        },
        (error)=>{
            res.send(error);
        }
    )
}

function get(req,res) {
    Notificacion.findOne({_id: req.params.id},(error, notificacion)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(notificacion)
        }
    })
}

function updateNotificacion(req,res) {
    Notificacion.findOne({"_id": req.params.id},(err,notificacion)=>{
        notificacion.fecha_publicacion = req.body.fecha_publicacion;
        notificacion.visto = req.body.visto;
        notificacion.save((err)=>{
            if(err) {
                res.send(err)
            } else {
                res.send({mensaje:"Actualizacion Correcta"})
            }
        })
    })
}




module.exports = {createNotificacion, getAll, get, updateNotificacion}