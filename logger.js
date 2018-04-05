const mongoose = require('mongoose');
const userModel = require('./models/users');
const statModel = require('./models/stats');
const commandModel = require('./models/commands');


const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/botDB';

mongoose.connect(mongoURL)
  .then(()=>console.log('success connected to mongodb'))
  .catch(e => console.log(e + ' cannot reach mongodb server'))

class Logger{

  writeLog(msg, commandName) {

    console.log(2)

    const user = new userModel({
      userId: msg.from.id,
      userName: msg.from.username,
      firstName: msg.from.first_name,
      lastName: msg.from.last_name
    });
    user.save( err => console.log(err));

    const stat = new statModel({
      time: msg.date,
      userId: msg.from.id,
      commandName
    });
    stat.save( err => console.log(err));

    const command = new commandModel({
      commandName
    })

    command.save( err => console.log(err + 'command'))

    console.log(msg)
  }

}

module.exports = Logger;
