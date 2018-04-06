const express = require('express');
const path = require('path');
const emitter = require('./emitter');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('User disconnect')
  })
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));