var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideojuegoSchema =  Schema({
  id:Number,
  nombre:String,
  compania:String,
  clasificacion:String,
  tipoJuego:String,
  numJugadores:Number,
  precio:Number,
  link: String
});


module.exports = mongoose.model('Videojuego', VideojuegoSchema);
