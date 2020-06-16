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
  res.render('consultar', { title: 'Consulta de Videojuego' });
});

router.get('/eliminar', function(req, res, next) {
  res.render('eliminar', { title: 'Eliminar Videojuego' });
});

router.get('/buscar', function(req, res, next) {
  var myId = req.query.nombre;
  request('https://proyectoapirestsisinf.herokuapp.com/api/videojuegos/' + myId, function(err,response,data){
    if(err){
      res.status(404).json({
          mensaje: "No existe"
        });
    }else {
        var datos=JSON.parse(data);
        if (datos.nombre==undefined){
          res.status(404).json({
          mensaje: "No existe"
        });
        }else{
        res.render('profile',{
          nombre:datos.nombre,
          compania:datos.compania ,
          clasificacion:datos.clasificacion,
          tipoJuego:datos.tipoJuego ,
          numJugadores: datos.numJugadores,
          precio: datos.precio,
          imagen: datos.imagen});
      }
    }
  });
});

router.get('/eliminarJuego', function(req, res, next) {
  var myId = req.query.nombre;
  request.delete('https://proyectoapirestsisinf.herokuapp.com/api/videojuegos/'+ myId, function(err,response,data){
    if(err){
      res.status(404).json({
          mensaje: "No existe"
        });
    }else {
       var datos=JSON.parse(data);
       if(datos==null){
        res.status(404).json({
          mensaje: "No existe"
        });
      } else {
        res.render('juegoEliminado',{
        nombre:datos.nombre,
        compania:datos.compania ,
        clasificacion:datos.clasificacion,
        tipoJuego:datos.tipoJuego ,
        numJugadores: datos.numJugadores,
        precio: datos.precio,
        imagen: datos.imagen
  });
      }
        }
    });
  });
  

router.get('/catalogo', function(req, res, next) {
  Videojuego.find({},(err,data)=>{
    if (err) {
      res.send("Error: " + err);
    } else {
      res.render('vista', {videojuegos:data});
    }
  }).sort({nombre: 'asc'});
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
    else res.redirect('/catalogo')
  })
});

router.get('/profile/:videojuegoID',function(req,res,next){
  Videojuego.findOne({_id: req.params.videojuegoID}, function(err, datos){
    if(!err) res.render('profile',datos);
  });
});

router.get('/administrar', function(req, res, next){
  Videojuego.find({},(error,data)=>{
    if (!error) {
      res.render('administrar', {videojuegos:data});
    }
  }).sort({nombre: 'asc'});
});

router.get('/editar/:videojuegoID',function(req,res,next){
  Videojuego.findOne({_id: req.params.videojuegoID}, function(err, datos){
    if(!err) res.render('editar',datos);
  });
});

router.put('/editado/:videojuegoID', function(req, res, next){
  Videojuego.findOneAndUpdate({_id:req.params.videojuegoID},{
    nombre: req.body.Nombre,
    compania: req.body.Compañia,
    clasificacion: req.body.Clasificación,
    tipoJuego: req.body.Tipo,
    numJugadores: req.body.Jugadores,
    precio: req.body.Precio,
    imagen: req.body.Imagen
  },(err, datos)=>{
    if (!err) {
      res.redirect('/consultar');
    }
  });
});

router.delete('/eliminar/:videojuegoID', function(req, res, next){
  console.log(req.params);
  Videojuego.findOneAndDelete({_id:req.params.videojuegoID},function(err, datos){
    if(!err) res.redirect('/consultar');
  });
});

module.exports = router;
