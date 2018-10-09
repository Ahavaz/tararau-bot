process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')
const emoji = require('node-emoji')
const { msgMatches } = require('./msgMatches')
const { getSign } = require('./signs')
const { getBirthdays, hasBirthdays, isValidDate, isFutureDate } = require('./utils')
const { customKb, defaultKb } = require('./msgOptions')
const { buildDayOptions, buildYesNoOptions } = require('./keyboardTemplates')

const token = process.env.TELEGRAM_CHATBOT_API_KEY
const bot = new TelegramBot(token, { polling: true })
const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')
// const url = `https://maps.googleapis.com/maps/api/geocode/json?${parameters}&key=${process.env.GOOGLE_API_KEY}`

// const roles = []

// const places = []

const tararaus = []

const answerCallbacks = {}

bot.on('message', msg => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const msgId = msg.message_id
  const userMsg = msg.text.toString().toLowerCase()
  const userName = msg.from.first_name
  const callbackId = `${chatId}:${userId}`

  const callback = answerCallbacks[callbackId]
  if (callback) {
    delete answerCallbacks[callbackId]
    return callback(msg)
  }

  msgMatches(chatId, msgId, userMsg, userName, bot)

  return true
})

bot.onText(/^\/role\b/i, msg => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const msgId = msg.message_id
  const callbackId = `${chatId}:${userId}`

  bot.sendMessage(chatId, 'Quando vocês querem meter o loko?', customKb(msgId, buildDayOptions(moment()))).then(() => {
    answerCallbacks[callbackId] = answerRoleDate => {
      const answerRoleDateId = answerRoleDate.message_id

      if (answerRoleDate.text === 'Outra data') {
        bot.sendMessage(chatId, 'Digite uma data (DD/MM/AA) futura', defaultKb(answerRoleDateId, true)).then(() => {
          answerCallbacks[callbackId] = answerAnotherDate => {
            const answerAnotherDateId = answerAnotherDate.message_id

            if (isValidDate(answerAnotherDate.text) && isFutureDate(answerAnotherDate.text)) {
              const date = moment(answerAnotherDate.text, 'D/M/YY')

              bot.sendMessage(
                chatId,
                `${date.format('DD/MM/YY [(]dddd[)]').toLowerCase()}, qual horário (HH:mm)?`,
                defaultKb(answerAnotherDateId, true)
              )
            } else {
              bot.sendMessage(
                chatId,
                'Data inválida, escolha uma data futura e preste atenção no formato',
                defaultKb(answerAnotherDateId)
              )
            }
          }
        })
      } else if (answerRoleDate.text === 'Mudei de ideia') {
        bot.sendMessage(
          chatId,
          `Vai ti toma no cu então ${answerRoleDate.from.first_name} ${emoji.find('upside_down_face').emoji}`,
          defaultKb(answerRoleDateId)
        )
      } else if (moment(answerRoleDate.text.split('\n')[1].slice(1, -1), 'D/MMM/YY', 'pt-br', true).isValid()) {
        const date = moment(answerRoleDate.text.split('\n')[1].slice(1, -1), 'D/MMM/YY')

        bot.sendMessage(
          chatId,
          `${date.format('DD/MM/YY [(]dddd[)]').toLowerCase()}, qual horário (HH:mm)?`,
          defaultKb(answerRoleDateId, true)
        )
      } else {
        bot.sendMessage(
          chatId,
          `Use os botões, energúmeno ${emoji.find('face_with_rolling_eyes').emoji}`,
          defaultKb(answerRoleDateId)
        )
      }
    }
  })
})

bot.onText(/^\/niver\b/i, msg => {
  const chatId = msg.chat.id
  const userId = msg.from.id
  const msgId = msg.message_id
  const callbackId = `${chatId}:${userId}`
  const userName = msg.from.first_name

  if (tararaus.filter(tararau => tararau.chatId === chatId && tararau.userId === userId).length !== 0) {
    bot.sendMessage(chatId, 'Você já registrou sua data de nascimento', defaultKb(msgId))
  } else {
    bot
      .sendMessage(
        chatId,
        `Por gentileza, insira sua data (DD/MM/AAAA) de nascimento ${emoji.find('slightly_smiling_face').emoji}`,
        defaultKb(msgId, true)
      )
      .then(() => {
        answerCallbacks[callbackId] = answerBirthdate => {
          const answerBirthdateId = answerBirthdate.message_id

          if (isValidDate(answerBirthdate.text, true)) {
            const date = moment(answerBirthdate.text, 'D/M/YYYY')

            bot
              .sendMessage(
                chatId,
                `Você nasceu dia ${date.format('D [de] MMMM [de] YYYY [(]dddd[)]').toLowerCase()}?`,
                customKb(answerBirthdateId, buildYesNoOptions())
              )
              .then(() => {
                answerCallbacks[callbackId] = answerConfirmation => {
                  const answerConfirmationId = answerConfirmation.message_id

                  if (answerConfirmation.text === 'Certamente') {
                    const sign = getSign(date).filter(signEl => date.within(signEl.range))[0]

                    tararaus.push({
                      chatId,
                      userId,
                      userName,
                      signName: sign.name,
                      signSymbol: sign.symbol,
                      birthdate: date
                    })

                    bot.sendMessage(
                      chatId,
                      `Data registrada com sucesso... não sabia que seu signo era ${sign.name} ${sign.symbol}`,
                      defaultKb(answerConfirmationId)
                    )
                  } else {
                    bot.sendMessage(
                      chatId,
                      'Repita o processo e vê se não erra dessa vez',
                      defaultKb(answerConfirmationId)
                    )
                  }
                }
              })
          } else {
            bot.sendMessage(chatId, 'Data inválida, preste atenção no formato', defaultKb(answerBirthdateId))
          }
        }
      })
  }
})

bot.onText(/^\/bdays\b/i, msg => {
  bot.sendMessage(
    msg.chat.id,
    hasBirthdays(msg.chat.id, tararaus)
      ? `*Próximos aniversariantes* ${emoji.find('birthday').emoji}

${getBirthdays(msg.chat.id, tararaus).join('')}`
      : `Nenhuma data de nascimento foi registrada ainda ${emoji.find('slightly_frowning_face').emoji}
      
Envie o comando /niver para registrar a sua!`,
    defaultKb(msg.message_id)
  )
})

bot.onText(/^\/clear\b/i, msg => {
  bot.sendMessage(msg.chat.id, 'Teclado aniquilado com sucesso', defaultKb(msg.message_id))
})

bot.onText(/^\/(help\b|$)/i, msg => {
  bot.sendMessage(
    msg.chat.id,
    `Posso te ajudar a marcar rolês, registrar a data de nascimento da galera e te lembrar dos próximos aniversariantes.

Você pode fazer isso enviando os seguintes comandos:

/role - marque o rolê da galera ${emoji.find('sunglasses').emoji}
/niver - registre sua data de nascimento pro pessoal não deixar seu níver passar em branco ${emoji.find('tada').emoji}
/bdays - liste os próximos aniversariantes do grupo ${emoji.find('birthday').emoji}`,
    defaultKb(msg.message_id)
  )
})

bot.onText(/^\/(?!(role|niver|bdays|clear|help)\b).+/i, msg => {
  bot.sendMessage(msg.chat.id, 'Este comando _non ecziste_!', defaultKb(msg.message_id))
})

bot.on('polling_error', error => {
  console.log(error)
})
