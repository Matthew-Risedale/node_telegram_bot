const TelegramBot = require('node-telegram-bot-api');
const Logger = require('./logger');
const emitter = require('./emitter')

const token = '470596377:AAGUPgVwBp-1XAVKPiVZOMaCrQil5iwucOM';
const logger = new Logger();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  
  logger.writeUser(msg)
    .then(res => {
      res ? emitter.emit('userWritten') : null;
    })
  
  logger.writeCommand('echo')
    .then(res => console.log(emitter))
  
  logger.writeStat(msg, 'echo')
    .then(res => console.log(emitter))

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
