
const TelegramBot = require('node-telegram-bot-api');
const Logger = require('./logger');
const emitter = require('./emitter')

const token = '470596377:AAGUPgVwBp-1XAVKPiVZOMaCrQil5iwucOM';
const logger = new Logger();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {

  getPhotoUrl(msg).then(photoUrl => {
    logger.writeUser(msg, photoUrl)
    .then(res => {
      res ? emitter.emit('userWritten') : null;
    })
  })
  
  logger.writeCommand('echo')
    .then(res => res)
  
  logger.writeStat(msg, 'echo')
    .then(res => res)

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
 
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

function getPhotoUrl(msg){
  return bot.getUserProfilePhotos(msg.from.id)
    .then(res => {
      let file_id = res.photos[0][0].file_id;
      return bot.getFile(file_id)
    }).then(res => {
      let file_path = res.file_path;
      let photo_url = `https://api.telegram.org/file/bot${token}/${file_path}`;
      photo_URL = photo_url;
      return photo_URL
    });
}
