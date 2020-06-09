var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Videojuego = require('../models/videojuegos');

router.get('/',(req, res, next)=>{
  Videojuego.find({},(err, datos)=>{
    if (err)res.status(400).json({"mensaje":"No se encontro"})
    res.status(200).json(datos);
  });
});

router.get('/:videojuegoID', function(req, res, next) {
  Videojuego.findOne({
    'nombre': req.params.videojuegoID
  }, function(err, datos) {
    if (datos == null) {
      res.status(404).json({
        mensaje: "No existe"
      });
    } else {
      res.status(200).json(datos);
    }

  });
  //res.json(req.params.userId);
});


router.post('/',(req, res, next)=>{
  var videojuego=Videojuego({
    nombre: req.body.nombre,
    compania: req.body.compania,
    clasificacion: req.body.clasificacion,
    tipoJuego: req.body.tipoJuego,
    numJugadores: req.body.numJugadores,
    precio: req.body.precio
  });
  videojuego.save((err,datos)=>{
    if (err) {
      res.status(404).json({"mensaje":"Error al guardar"});
    } else {
      res.status(201).json(datos);
    }
  });
});

router.post('/:videojuegoId',(req, res, next)=>{
  res.status(404).json({"mensaje":"Operacion no permitida"});
});

module.exports = router;
