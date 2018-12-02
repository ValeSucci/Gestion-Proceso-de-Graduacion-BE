const Carta = require('../models/cartas').Carta;


function insertCartas() {
    var cartaT = new Carta({
        tipo: "T",
        ubicacion: "E:/ValeCosas/Práctica Interna/carta-tutor.doc"
    })
    cartaT.save().then(
        ()=>{
            console.log("Ubicacion carta tutor creada");
        },
        (error1)=>{
            console.log(error1);
        }
    )
    var cartaR = new Carta({
        tipo: "R",
        ubicacion: "E:/ValeCosas/Práctica Interna/carta-revisor.doc"
    })
    cartaR.save().then(
        ()=>{
            console.log("Ubicacion carta revisor creada");
        },
        (error2)=>{
            console.log(error2);
        }
    )
}


function updateCarta(req,res) {
    Carta.findOne({tipo: req.params.tipo},(err,carta)=>{        
        carta.ubicacion = req.body.ubicacion;   
        carta.save((err)=>{
            if(err) {
                res.send(err)
            } else {
                res.send({mensaje:"Actualizacion Correcta"})
            }
        })
    })

}


module.exports = {insertCartas,updateCarta}