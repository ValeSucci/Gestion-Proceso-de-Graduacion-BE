const Docente = require('../models/docentes').Docente;

function getAll(req,res) {
    Docente.find({},(error, docentes)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(docentes)
        }
    })
}

function get(req,res) {
    Docente.findOne({codigo: req.params.codigo},(error, docente)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(docente)
        }
    })
}

function getById(req,res) {
    Docente.findOne({_id: req.params.id},(error, docente)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(docente)
        }
    })
}

/*
function getIdDocente(req,res) {
    Docente.findOne({codigo: req.params.codigo},(error, docente)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(docente._id)
        }
    })
}
*/

function createDocente(req,res) {
    var docente = new Docente({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo
    })
    docente.save().then(
        (doc)=>{
            res.send(doc);
        },
        (error)=>{
            res.send(error);
        }
    )
}

function updateDocente(req,res) {
    Docente.findOne({"codigo": req.params.codigo},(err,docente)=>{
        docente.codigo = req.body.codigo;
        docente.nombre = req.body.nombre;
        docente.direccion = req.body.direccion;
        docente.telefono = req.body.telefono;
        docente.correo = req.body.correo;   
        docente.save((err)=>{
            if(err) {
                res.send(err)
            } else {
                res.send({mensaje:"Actualizacion Correcta"})
            }
        })
    })
}


module.exports = {getAll,createDocente,updateDocente, get, getById}