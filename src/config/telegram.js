const TelegramBot = require('node-telegram-bot-api')

const telegramToken = process.env.TELEGRAM_CHATBOT_API_KEY

global.bot = new TelegramBot(telegramToken, { polling: true })
