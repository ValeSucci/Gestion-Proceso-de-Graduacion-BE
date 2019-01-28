const Usuario = require('../models/usuarios').Usuario;
const Encriptador = require('../services/encriptador');
const Token = require('../config').SECRET_TOKEN;

function login(req, res) {
    param = req.query.param.split(' ')
    //console.log(param[0] + "-" + param[1])
    Usuario.findOne({ username: param[0] }, (err, user) => {
        //console.log(user)
        if (err) {
            res.status(500).send(err);
        } else {
            if (!user) {
                res.status(200).send({ message: 'Usuario inexistente' })
            } else {
                let p = Encriptador.encode(Encriptador.decode(param[1])+Token)
                if (user.password === p) {
                    if (user.habilitado) {
                        res.status(200).send({ role: user.esSuper, _id: user._id, username: user.username })
                    } else {
                        res.status(200).send({ message: 'Usuario deshabilitado' })
                    }
                } else {
                    //console.log('fail')
                    res.status(200).send({ message: 'Contraseña incorrecta' })
                }
            }
        }
    })
}



function updateUsuario(req, res) {
    Usuario.findOne({ username: req.params.username }, (err, user) => {
        user.nombre = req.body.nombre;
        user.password = Encriptador.encode(Encriptador.decode(req.body.password)+Token);
        user.telefono = req.body.telefono;
        user.correo = req.body.correo;
        user.save((err) => {
            if (err) {
                res.send(err)
            } else {
                res.send({ mensaje: "Actualizacion Correcta" })
            }
        })
    })
}

function updateSoloAltaBaja(req, res) {
    Usuario.findOne({ username: req.params.username }, (err, user) => {
        user.habilitado = !user.habilitado;
        if (user.habilitado) {
            user.fecha_fin = null;
        } else {
            user.fecha_fin = Date.now();
        }
        user.save((err) => {
            if (err) {
                res.send(err)
            } else {
                res.send({ mensaje: "Actualizacion Correcta" })
            }
        })
    })
}

function updateUsuarioAdmi(req, res) {
    Usuario.findOne({ username: req.params.username }, (err, user) => {
        user.nombre = req.body.nombre;
        user.password = Encriptador.encode(Encriptador.decode(req.body.password)+Token);
        user.habilitado = req.body.habilitado;
        user.fecha_fin = req.body.fecha_fin;
        user.save((err) => {
            if (err) {
                res.send(err)
            } else {
                res.send({ mensaje: "Actualizacion Correcta" })
            }
        })
    })
}


function get(req, res) {
    Usuario.findOne({ username: req.params.username }, (error, user) => {
        if (error) {
            res.status(500).send(error)
        } else {
            user.password = Encriptador.encode(Encriptador.decode(user.password).substring(0,user.password.toString().length-Token.length));
            res.status(200).send(user)
        }
    })
}



function getAll(req, res) {
    Usuario.find({ esSuper: false }, (error, users) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(users)
        }
    })
}


function createUser(req, res) {
    var user = new Usuario({
        username: req.body.username,
        nombre: req.body.nombre,
        password: Encriptador.encode(Encriptador.decode(req.body.password)+Token),
        telefono: req.body.telefono,
        correo: req.body.correo,
        habilitado: true,
        esSuper: req.body.esSuper,
        fecha_inicio: Date.now(),
        fecha_fin: null
    })
    user.save().then(
        (u) => {
            res.send(u);
            console.log("Usuario creado correctamente")
        },
        (error) => {
            res.send(error);
        }
    )
}


module.exports = { login, updateUsuario, get, createUser, updateUsuarioAdmi, getAll, updateSoloAltaBaja }