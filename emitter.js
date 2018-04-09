const EventEmitter = require('events');
 
const emitter = new EventEmitter();

emitter.on('commandWritten', () => {
  console.log('command has been written')
})

emitter.on('statWritten', () => {
  console.log('stat has been written')
})

module.exports = emitter;
