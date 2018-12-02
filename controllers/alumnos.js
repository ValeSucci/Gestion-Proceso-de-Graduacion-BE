const Alumno = require('../models/alumnos').Alumno;

function getAll(req, res) {
    Alumno.find({}, (error, alumnos) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(alumnos)
        }
    })
}

function createAlumno(req, res) {
    let AltaMateria = require('../models/alta_materia').AltaMateria;
    let b = req.body;
    let bam = req.body.alta_materia;

    let plazoC = null;
    let mes = new Date(bam.fecha).getMonth(); //del 0 al 11
    let anio = new Date(bam.fecha).getFullYear();
    if (mes <= 6 && mes !== 0) {
        //alta desde febrero hasta julio 
        if (bam.prorroga) {
            //=> plazo hasta julio del siguiente anio
            plazoC = new Date((anio + 1), 07, 31);

        } else {
            //=> plazo hasta enero del siguiente anio
            plazoC = new Date((anio + 1), 01, 31);
        }
    } else {
        //alta desde agosto hasta enero 
        if (mes === 0) {
            if (bam.prorroga) {
                //=> plazo hasta enero del siguiente anio
                plazoC = new Date(anio + 1, 01, 31);
            } else {
                //=> plazo hasta julio
                plazoC = new Date(anio, 07, 31);
            }
        } else {
            if (bam.prorroga) {
                //=> plazo hasta enero de dos anios despues
                plazoC = new Date(anio + 2, 01, 31);
            } else {
                //=> plazo hasta julio del siguiente anio
                plazoC = new Date(anio + 1, 07, 31);
            }
        }
    }


    let Colores = require('../services/colores');
    let estadoC = "En elaboracion";
    let colorC = Colores.COLOR_ELABORACION;
    if (bam.observaciones !== null || !bam.defensa_externa.resultado) {
        colorC = Colores.COLOR_OBSERVADO;
        estadoC = "Observado";
    } else if (bam.defensa_externa.resultado) {
        colorC = Colores.COLOR_GRADUADO;
        estadoC = "Graduado";
    } else if (bam.defensa_externa.fecha !== null) {
        colorC = Colores.COLOR_DEFENSA_EXTERNA;
        estadoC = "En Defensa Externa";
    } else if (bam.defensa_interna.resultado.toLowerCase() === "diferido") {
        colorC = Colores.COLOR_DIFERIDA;
        estadoC = "Diferida";
    } else if (bam.defensa_interna.fecha !== null) {
        colorC = Colores.COLOR_DEFENSA_INTERNA;
        estadoC = "En Defensa Interna";
    } else if (bam.revisor !== null) {
        colorC = Colores.COLOR_REVISOR;
        estadoC = "Con Revisor";
    }

    //let tut = buscarDocente(bam.tutor.codigo);
    //let rev = buscarDocente(bam.revisor.codigo);

    //let cartaT = buscarCarta(bam.tutor.tipo_carta);
    //let cartaR = buscarCarta(bam.revisor.tipo_carta);

    var alta_materia = new AltaMateria({
        nro_alta: 1,
        semestre: bam.semestre,
        fecha: bam.fecha,
        plazo: plazoC,
        prorroga: bam.prorroga,
        estado: {
            est: estadoC,
            color: colorC
        },
        modalidad: {
            mod: bam.modalidad.mod,
            trabDirig: {
                empresa: bam.modalidad.trabDirig.empresa,
                fecha_suficiencia: bam.modalidad.trabDirig.fecha_suficiencia
            }
        },
        tema: bam.tema,
        observaciones: bam.observaciones,
        tutor: {
            //doc: tut,
            doc: bam.tutor._id,
            fecha_asignacion: bam.tutor.fecha_asignacion,
            cite_carta: (bam.tutor.fecha_asignacion) ? fixCite(true) : null,
            // ubicacion_carta: cartaT, //tipo = t en carta -> Tutor
            ubicacion_carta: bam.tutor._id_carta,
            fecha_suficiencia: bam.tutor.fecha_suficiencia,
            paga: bam.tutor.fecha_suficiencia ? false : true
        },
        revisor: {
            //doc: rev,
            doc: bam.revisor._id,
            fecha_asignacion: bam.revisor.fecha_asignacion,
            cite_carta: bam.tutor.fecha_asignacion ? fixCite(false) : null,
            //ubicacion_carta: cartaR, //tipo = r en carta -> Revisor
            ubicacion_carta: bam.revisor._id_carta,
            fecha_suficiencia: bam.revisor.fecha_suficiencia,
        },
        defensa_interna: {
            fecha: bam.defensa_interna.fecha,
            resultado: bam.defensa_externa.resultado,
            observacion: bam.defensa_interna.observacion
        },
        defensa_externa: {
            fecha: bam.defensa_externa.fecha,
            presidente: bam.defensa_externa.presidente,
            evaluador1: bam.defensa_externa.evaluador1,
            evaluador2: bam.defensa_externa.evaluador2,
            resultado: bam.defensa_externa.resultado
        }
    })
    alta_materia.save().then(
        (am)=>{
            idam = am._id
            var alumno = new Alumno({
                codigo: b.codigo,
                nombre: b.nombre,
                alta_materia: [am]
            })
            alumno.save().then(
                (al) => {
                    res.send(al);
                },
                (error) => {
                    console.log(error)
                    res.send(error);
                }
            )
        }
    )

    //console.log('ida,:'+idam)


    /*
    Alumno.find({codigo:b.codigo}).populate('alta_materia').exec((err, al)=>{
        if(err) return console.log(err)
        console.log(al)
    })*/


}

function getMaxCiteT() {
    Alumno.find({}).sort({ "alta_materia.tutor.cite_carta": -1 }).limit(1).exec((err, alumno) => {
        if (alumno.length === 0) {
            return '1';
        } else {
            if (err) {
                return err;
            } else {
                return alumno.alta_materia.tutor.cite_carta;
            }
        }
    })
}

function getMaxCiteR() {
    Alumno.find({}).sort({ "alta_materia.revisor.cite_carta": -1 }).limit(1).exec((err, alumno) => {
        if (alumno.length === 0) {
            return '1';
        } else {
            if (err) {
                return err;
            } else {
                return alumno.alta_materia.revisor.cite_carta;
            }
        }
    })
}

function fixCite(esTutor) {
    //console.log(esTutor)
    let cite;
    if (esTutor) {
        //cite = getMaxCiteT()
        Alumno.find({}).sort({ "alta_materia.tutor.cite_carta": -1 }).limit(1).exec((err, alumno) => {
            console.log(alumno)
            if (err) {
                return err;
            } else {
                if (alumno.length === 0) {
                    return '1';
                } else {
                    let a = alumno.alta_materia.tutor.cite_carta
                    if (isNan(a)) {
                        return (parseInt(a.substring(0, a.length - 1)) + 1) + a[a.length - 1]
                    } else {
                        return parseInt(a.substring(0, a.length - 1)) + 1;
                    }
                }
            }
        })
    } else {
        //cite = getMaxCiteR()
        Alumno.find({}).sort({ "alta_materia.revisor.cite_carta": -1 }).limit(1).exec((err, alumno) => {
            console.log(alumno)
            if (err) {
                return err;
            } else {
                if (alumno.length === 0) {
                    return '1';
                } else {
                    let a = alumno.alta_materia.revisor.cite_carta
                    if (isNan(a)) {
                        return (parseInt(a.substring(0, a.length - 1)) + 1) + a[a.length - 1]
                    } else {
                        return parseInt(a.substring(0, a.length - 1)) + 1;
                    }
                }
            }
        })
    }
}


function buscarDocente(c) {
    let Docente = require('../models/docentes').Docente;
    Docente.findOne({ codigo: c }, (error, docente) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(docente._id)
        }
    })
}


function buscarCarta(t) {
    let Carta = require('../models/cartas').Carta;
    Carta.findOne({ tipo: t }, (error, carta) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(carta._id)
        }
    })
}


module.exports = { getAll, createAlumno }