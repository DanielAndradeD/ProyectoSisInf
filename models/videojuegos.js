var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideojuegoSchema =  Schema({
  nombre: String,
  compania: String,
  clasificacion: String,
  tipoJuego: String,
  numJugadores: Number,
  precio: Number
});


module.exports = mongoose.model('Videojuego', VideojuegoSchema);
