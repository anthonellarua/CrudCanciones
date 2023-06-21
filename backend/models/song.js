const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  duration: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
  // Otros campos que desees para tu modelo
});

module.exports = mongoose.model('Song', songSchema);