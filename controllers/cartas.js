const Carta = require('../models/cartas').Carta;

function obtenerCarta(req, res) {
    Carta.findOne({ cargo: req.params.cargo }, (err, carta) => {
        if (err || !carta) return res.status(500).send(err || 'error')
        res.send(carta)
    })
}

function insertarCarta(req, res) {
    let carta = new Carta({
        hash: req.body.hash,
        tipo: req.body.tipo,
        cargo: req.body.cargo
    })
    carta.save().then(
        c => {
            res.send(c)
        },
        err => {
            res.status(500).send(err)
        }
    )
}

function updateCarta(req, res) {
    Carta.findOne({ cargo: req.params.cargo }, (err, carta) => {
        if (err || !carta) return res.status(500).send(err || 'error')
        carta.hash = req.body.hash
        carta.save((err) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send({ mensaje: "Actualizacion Correcta" })
            }
        })
    })

}


module.exports = {
    insertarCarta,
    updateCarta,
    obtenerCarta
}