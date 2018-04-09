const mongoose = require('mongoose');
const userModel = require('./models/users');
const statModel = require('./models/stats');
const commandModel = require('./models/commands');


const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/botDB';

mongoose.connect(mongoURL)
  .then(()=>console.log('success connected to mongodb'))
  .catch(e => console.log(e + ' cannot reach mongodb server'))

class Logger{

  async writeUser(msg, photoUrl){
    console.log(photoUrl);
    let trigger = true;
    const user = new userModel({
      userId: msg.from.id,
      userName: msg.from.username,
      firstName: msg.from.first_name,
      lastName: msg.from.last_name,
      photoUrl
    });
    try {
      await user.save();
    } catch(e) {
      trigger = false;
    }
    return trigger;
  }

  async writeCommand(commandName){
    let trigger = true;
    const command = new commandModel({
      commandName
    })
    let test;
    try {
      await command.save();
    } catch(e) {
      trigger = false;
    }
    return trigger
  }

  async writeStat(msg, commandName) {
    let trigger = true;
    const stat = new statModel({
      time: msg.date,
      userId: msg.from.id,
      commandName
    });
    try {
      await stat.save();
    } catch(e) {
      trigger = false;
    }
    return trigger;
  }
}

module.exports = Logger;
