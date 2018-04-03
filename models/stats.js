const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({

});

let statModel = mongoose.model('Stat', statSchema);

module.exports = statModel;
