var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Videojuegos' });
});

router.get('/agregar', function(req, res, next) {
  res.render('insertar', { title: 'Alta de Videojuegos' });
});
module.exports = router;
