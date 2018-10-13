process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')
// const mongoose = require('mongoose')
const { msgMatches } = require('./msgMatches')
const { getBirthdays, hasBirthdays, isValidDate, isFutureDate } = require('./utils')
const { customKb, defaultKb } = require('./msgOptions')
const { buildDayOptions } = require('./keyboardTemplates')
const { getBirthdate } = require('./commands/niver')

// const mongoUri = process.env.MONGODB_URI
const telegramToken = process.env.TELEGRAM_CHATBOT_API_KEY
global.bot = new TelegramBot(telegramToken, { polling: true })
const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')
// const url = `https://maps.googleapis.com/maps/api/geocode/json?${parameters}&key=${process.env.GOOGLE_API_KEY}`

// const db = mongoose.connect(mongoUri)
// db.tararaus.find()

// const roles = []

// const places = []

const tararaus = []

global.answerCallbacks = {}

global.bot.on('message', msg => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const msgId = msg.message_id
  const userMsg = msg.text.toString().toLowerCase()
  const userFirstName = msg.from.first_name
  const callbackId = `${chatId}:${userId}`

  const callback = global.answerCallbacks[callbackId]
  if (callback) {
    delete global.answerCallbacks[callbackId]
    return callback(msg)
  }

  if (!userMsg.startsWith('/')) {
    msgMatches(chatId, msgId, userMsg, userFirstName)
  }

  return true
})

global.bot.onText(/^\/role\b/i, msg => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const msgId = msg.message_id
  const callbackId = `${chatId}:${userId}`

  global.bot
    .sendMessage(chatId, 'Quando vocês querem meter o loko?', customKb(msgId, buildDayOptions(moment())))
    .then(() => {
      global.answerCallbacks[callbackId] = answerRoleDate => {
        const answerRoleDateId = answerRoleDate.message_id

        if (answerRoleDate.text === 'Outra data') {
          global.bot
            .sendMessage(chatId, 'Digite uma data (DD/MM/AA) futura', defaultKb(answerRoleDateId, true))
            .then(() => {
              global.answerCallbacks[callbackId] = answerAnotherDate => {
                const answerAnotherDateId = answerAnotherDate.message_id

                if (isValidDate(answerAnotherDate.text) && isFutureDate(answerAnotherDate.text)) {
                  const date = moment(answerAnotherDate.text, 'D/M/YY')

                  global.bot.sendMessage(
                    chatId,
                    `${date.format('DD/MM/YY [(]dddd[)]').toLowerCase()}, qual horário (HH:mm)?`,
                    defaultKb(answerAnotherDateId, true)
                  )
                } else {
                  global.bot.sendMessage(
                    chatId,
                    `*Data inválida* ⚠️
Escolha uma data futura e preste atenção no formato`,
                    defaultKb(answerAnotherDateId)
                  )
                }
              }
            })
        } else if (answerRoleDate.text === 'Mudei de ideia') {
          global.bot.sendMessage(chatId, `Vai ti toma no cu então poha 😒`, defaultKb(answerRoleDateId))
        } else if (moment(answerRoleDate.text.split('\n')[1].slice(1, -1), 'D/MMM/YY', 'pt-br', true).isValid()) {
          const date = moment(answerRoleDate.text.split('\n')[1].slice(1, -1), 'D/MMM/YY')

          global.bot.sendMessage(
            chatId,
            `${date.format('DD/MM/YY [(]dddd[)]').toLowerCase()}, qual horário (HH:mm)?`,
            defaultKb(answerRoleDateId, true)
          )
        } else {
          global.bot.sendMessage(chatId, `Use os botões, energúmeno 🙄`, defaultKb(answerRoleDateId))
        }
      }
    })
})

global.bot.onText(/^\/niver\b/i, async msg => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const msgId = msg.message_id
  const callbackId = `${chatId}:${userId}`
  const userFullName = `${msg.from.first_name} ${msg.from.last_name || ''}`.trim()
  const userName = `[${userFullName}](tg://user?id=${userId})`

  if (tararaus.filter(tararau => tararau.chatId === chatId && tararau.userId === userId).length) {
    global.bot.sendMessage(chatId, 'Você já registrou sua data de nascimento ⚠️', defaultKb(msgId))
  } else {
    getBirthdate(tararaus, callbackId, chatId, userId, msgId, userFullName, userName)
  }
})

global.bot.onText(/^\/bdays\b/i, msg => {
  global.bot.sendMessage(
    msg.chat.id,
    hasBirthdays(msg.chat.id, tararaus)
      ? `*Próximos aniversariantes* 🎂
${getBirthdays(msg.chat.id, tararaus).join('')}`
      : `Nenhuma data de nascimento foi registrada ainda 🙁

Envie o comando /niver para registrar a sua!`,
    defaultKb(msg.message_id)
  )
})

global.bot.onText(/^\/clear\b/i, msg => {
  global.bot.sendMessage(msg.chat.id, 'Teclado aniquilado com sucesso', defaultKb(msg.message_id))
})

global.bot.onText(/^\/(help\b|$)/i, msg => {
  global.bot.sendMessage(
    msg.chat.id,
    `Posso te ajudar a marcar rolês, registrar a data de nascimento da galera e te lembrar dos próximos aniversariantes.

Você pode fazer isso enviando os seguintes comandos:

/role - marque o rolê da galera 😎
/niver - registre sua data de nascimento para o pessoal não deixar seu níver passar em branco 🎉
/bdays - liste os próximos aniversariantes do grupo 🎂`,
    defaultKb(msg.message_id)
  )
})

global.bot.onText(/^\/(?!(role|niver|bdays|clear|help|start|stop)\b).+/i, msg => {
  global.bot.sendMessage(msg.chat.id, 'Este comando _non ecziste_!', defaultKb(msg.message_id))
})

global.bot.on('polling_error', error => {
  console.log(error)
})
