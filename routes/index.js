var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Videojuegos' });
});

router.get('/consultar', function(req, res, next) {
  res.render('consultar', { title: 'Consulta de Videojuego' });
});

router.get('/agregar', function(req, res, next) {
  res.render('insertar', { title: 'Alta de Videojuegos' });
});

router.get('/buscar', function(req, res, next) {
  var myId = req.query.nombre;
  request('http://localhost:3000/api/videojuegos/' + myId, function(err,response,data){
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
        res.render('mostrar',{nombre:datos.nombre, compania:datos.compania , clasificacion:datos.clasificacion, tipoJuego:datos.tipoJuego , numJugadores: datos.numJugadores, precio: datos.precio});

      }
    }
  
  });
}); 

module.exports = router;
