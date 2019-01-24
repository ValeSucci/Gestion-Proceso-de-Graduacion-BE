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


function updateUsuario(req, res) {
    Usuario.findOne({ username: req.params.username }, (err, user) => {
        user.nombre = req.body.nombre;
        user.password = req.body.password;
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
        user.password = req.body.password;
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
        password: req.body.password,
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