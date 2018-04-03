const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  commandId: Number,
  commandName: {type: String, required: true, unique: true}
});

let commandModel = mongoose.model('Command', commandSchema);

module.exports = commandModel;
