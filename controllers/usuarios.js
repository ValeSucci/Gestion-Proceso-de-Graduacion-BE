const Usuario = require('../models/usuarios').Usuario;

function login(req, res) {
    param = req.query.param.split(' ')
    //console.log(param[0] + "-" + param[1])
    Usuario.findOne({ username: param[0] }, (err, user) => {
        //console.log(user)
        if (err || user === null) {
            res.status(500).send({ message: 'Usuario inexistente' })
        } else {
            if (user.password === param[1]) {
                res.status(200).send({ role: user.esSuper, _id: user._id, username: user.username })
                // user.lastLogin = Date.now()

            } else {
                console.log('fail')
                res.status(403).send({ message: 'Contraseña incorrecta' })
            }
        }
    })
}


function updateUsuario(req,res) {
    Usuario.findOne({username: req.params.username},(err,user)=>{
        user.username = req.body.username;
        user.nombre = req.body.nombre;
        user.password = req.body.password;
        user.telefono = req.body.telefono;
        user.correo = req.body.correo;  
        user.save((err)=>{
            if(err) {
                res.send(err)
            } else {
                res.send({mensaje:"Actualizacion Correcta"})
            }
        })
    })
}

function get(req,res) {
    Usuario.findOne({username: req.params.username},(error, user)=>{
        if(error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(user)
        }
    })
}


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

module.exports = { login, updateUsuario, get}