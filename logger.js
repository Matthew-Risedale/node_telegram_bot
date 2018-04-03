const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';

mongoose.connect(mongoURL);

class Logger{


  writeLog(msg){  
    console.log(msg)
  }

}


module.exports = Logger;
