var express = require('express');
var router = express.Router();
var request = require('request');

var mongoose = require('mongoose');
var Videojuego = require('../models/videojuegos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Videojuegos' });
});

router.get('/consultar', function(req, res, next) {
  Videojuego.find({},(err,data)=>{
    if (err) {
      res.send("Error: " + err);
    } else {
      res.render('vista', {videojuegos:data})
    }
  });
});

router.get('/agregar', function(req, res, next) {
  res.render('agregar', { title: 'Añadir Videojuego' });
});

router.post('/guardar', function(req, res, next) {
  var nombre = req.body.nombre;
  var compania = req.body.compania;
  var clasificacion = req.body.clasificacion;
  var tipoJuego = req.body.tipoJuego;
  var numJugadores = req.body.numJugadores;
  var precio = req.body.precio;
  var imagen = req.body.imagen;
  var videojuego=Videojuego({
    nombre: nombre,
    compania: compania,
    clasificacion: clasificacion,
    tipoJuego: tipoJuego,
    numJugadores: numJugadores,
    precio: precio,
    imagen: imagen
  });
  videojuego.save((err,data)=>{
    if(err) res.send("Error al guardar");
    else res.render('index');
  })
});

module.exports = router;
