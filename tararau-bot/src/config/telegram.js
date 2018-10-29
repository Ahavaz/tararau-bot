const TelegramBot = require('node-telegram-bot-api')

const telegramToken = process.env.TELEGRAM_CHATBOT_API_KEY

const bot = new TelegramBot(telegramToken, { polling: true })

module.exports = {
  bot
}
