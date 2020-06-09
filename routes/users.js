var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Videojuego = require('../models/videojuegos');

router.get('/',(req, res, next)=>{
  Videojuego.find({},(err, datos)=>{
    if (err)res.status(400).json({"mensaje":"Error, no se encontro elemento"})
    res.status(200).json(datos);
  });
});

<<<<<<< HEAD
router.get('/:videojuegoId',(req, res, next)=>{
  Videojuego.findOne({'_id':req.params.videojuegoId},(err, datos)=>{
=======
router.get('/:videojuegoID', function(req, res, next) {
  Videojuego.findOne({
    'nombre': req.params.videojuegoID
  }, function(err, datos) {
>>>>>>> e0f2a3eae2e86106a841e3619fa53ec81564b70d
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

router.delete('/',(req, res, next)=>{
  res.status(405).json({"mensaje":"Operacion no permitida"});
});

router.delete('/:videojuegoId',(req, res, next)=>{
  Videojuego.findOneAndDelete({'_id':req.params.videojuegoId},(err, datos)=>{
    if (err) {
      res.status(404).json({"mensaje":"Elemento no encontrado"});
    } else {
      res.status(200).json(datos);
    }
  });
});

router.patch('/',(req, res, next)=>{
  res.status(405).json({"mensaje":"Operacion no permitida"});
});

router.patch('/:videojuegoId',(req, res, next)=>{
  Videojuego.findOneAndUpdate({'_id':req.params.videojuegoId}, {
    nombre: req.body.nombre,
    compania: req.body.compania,
    clasificacion: req.body.clasificacion,
    tipoJuego: req.body.tipoJuego,
    numJugadores: req.body.numJugadores,
    precio: req.body.precio
  },(err, datos)=>{
    if (err) {
      res.status(404).json({"mensaje":"Elemento no encontrado"});
    } else {
      res.status(200).json(datos);
    }
  });
});

module.exports = router;
