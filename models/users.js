const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {type: Number, required: true, unique: true},
  userName: {type: String, required: true},
  firstName: String,
  lastName: String,
  photoUrl: String
})

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
