const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  time: Number,
  userId: Number,
  commandName: String
});

let statModel = mongoose.model('Stat', statSchema);

module.exports = statModel;
