const express = require('express');
const path = require('path');
const emitter = require('./emitter');
const bot = require('./bot');
const {commandModel, userModel, statModel} = require('./models');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

io.set('origins', 'http://localhost:*');

app.use('/', express.static(path.join(__dirname, 'public')));

const connections = [];

io.on('connection', socket => {

  connections.push(socket);

  emitter.on('userWritten', () => {
    console.log('user has been written');
    
    userModel.find({}, (err, doc) =>{
      doc ? socket.emit('newUser', doc) : null;
    })
  });

  socket.on('disconnect', () => {
    console.log('User disconnected')
    connections.splice(connections.indexOf(socket), 1)
  })
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));