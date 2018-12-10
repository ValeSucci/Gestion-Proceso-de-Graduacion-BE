const AltaMateria = require('../models/alta_materia').AltaMateria;

/*
function getAll(req,res) {
    Alumno.find({},(error, alumnos)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(alumnos)
        }
    })
}

function createAlumno(req,res) {
    var alumno = new Alumno({

    })
    alumno.save().then(
        (al)=>{
            res.send(al);
        },
        (error)=>{
            res.send(error);
        }
    )
}

*/

function get(req,res) {
    AltaMateria.findOne({_id: req.params.id},(error, alta)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(alta)
        }
    })
}


module.exports = {get}