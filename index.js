process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')
const emoji = require('node-emoji')
const { msgMatches } = require('./msgMatches')
const { getSign } = require('./signs')
const { buildDayOptions, buildYesNoOptions, getBirthdays } = require('./utils')

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

  const callback = answerCallbacks[`${chatId}:${userId}`]
  if (callback) {
    delete answerCallbacks[`${chatId}:${userId}`]
    return callback(msg)
  }

  msgMatches(chatId, msgId, userMsg, userName, bot)

  return true
})

const customKb = (msgId, customKeyboard) => ({
  reply_to_message_id: msgId,
  parse_mode: 'Markdown',
  reply_markup: {
    keyboard: customKeyboard,
    force_reply: true,
    resize_keyboard: true,
    one_time_keyboard: true,
    selective: true
  }
})

const defaultKb = (msgId, isReply = false) => ({
  reply_to_message_id: msgId,
  parse_mode: 'Markdown',
  reply_markup: {
    force_reply: isReply,
    remove_keyboard: true,
    selective: true
  }
})

const isValidDate = date =>
  moment(date, 'D/M/YY', 'pt-br', true).isValid() && moment().isSameOrBefore(moment(date, 'D/M/YY'), 'day')

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
            if (isValidDate(answerAnotherDate.text)) {
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
  if (tararaus.filter(tararau => tararau.userId === msg.from.id).length !== 0) {
    bot.sendMessage(msg.chat.id, 'Você já inseriu sua data de nascimento', defaultKb(msg.message_id))
  } else {
    bot
      .sendMessage(
        msg.chat.id,
        `Por gentileza, insira a data (DD/MM/AAAA) em que sua mãe te pariu ${
          emoji.find('slightly_smiling_face').emoji
        }`,
        defaultKb(msg.message_id, true)
      )
      .then(() => {
        answerCallbacks[`${msg.chat.id}:${msg.from.id}`] = answerBirthdate => {
          if (moment(answerBirthdate.text, 'D/M/YYYY', 'pt-br', true).isValid()) {
            const date = moment(answerBirthdate.text, 'D/M/YYYY')
            bot
              .sendMessage(
                chatId,
                `Você nasceu dia ${date.format('D [de] MMMM [de] YYYY [(]dddd[)]').toLowerCase()}?`,
                {
                  reply_to_message_id: answerBirthdate.message_id,
                  reply_markup: {
                    force_reply: true,
                    keyboard: buildYesNoOptions(),
                    resize_keyboard: true,
                    one_time_keyboard: true,
                    selective: true
                  }
                }
              )
              .then(() => {
                answerCallbacks[`${msg.chat.id}:${msg.from.id}`] = answerConfirmation => {
                  if (answerConfirmation.text === 'Certamente') {
                    const sign = getSign(date).filter(signEl => date.within(signEl.range))[0]
                    tararaus.push({
                      userId: msg.from.id,
                      userName: msg.from.first_name,
                      signName: sign.name,
                      signSymbol: sign.symbol,
                      birthdate: date
                    })
                    bot.sendMessage(
                      msg.chat.id,
                      `Data registrada com sucesso... não sabia que seu signo era ${sign.name} ${sign.symbol}`,
                      {
                        reply_to_message_id: answerConfirmation.message_id,
                        reply_markup: {
                          remove_keyboard: true,
                          selective: true
                        }
                      }
                    )
                  } else {
                    bot.sendMessage(msg.chat.id, 'Repita o processo e vê se não erra dessa vez', {
                      reply_to_message_id: answerConfirmation.message_id,
                      reply_markup: {
                        remove_keyboard: true,
                        selective: true
                      }
                    })
                  }
                }
              })
          } else {
            bot.sendMessage(msg.chat.id, 'Data inválida, preste atenção no formato', {
              reply_to_message_id: answerBirthdate.message_id,
              reply_markup: {
                remove_keyboard: true,
                selective: true
              }
            })
          }
        }
      })
  }
})

bot.onText(/^\/bdays\b/i, msg => {
  bot.sendMessage(
    msg.chat.id,
    `*Próximos aniversariantes* ${emoji.find('birthday').emoji}
${getBirthdays(tararaus).join('')}`,
    {
      reply_to_message_id: msg.message_id,
      parse_mode: 'Markdown',
      reply_markup: {
        remove_keyboard: true,
        selective: true
      }
    }
  )
})

bot.onText(/^\/clear\b/i, msg => {
  bot.sendMessage(msg.chat.id, 'Teclado aniquilado com sucesso', {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      remove_keyboard: true,
      selective: true
    }
  })
})

bot.onText(/^\/help\b/i, msg => {
  bot.sendMessage(
    msg.chat.id,
    `Posso te ajudar a marcar rolês, registrar datas de nascimento da galera para listar os próximos aniversariantes e, claro, encher o saco do pessoal.`,
    {
      reply_to_message_id: msg.message_id,
      parse_mode: 'Markdown',
      reply_markup: {
        remove_keyboard: true,
        selective: true
      }
    }
  )
})

bot.onText(/^\/(?!(role|niver|bdays|clear|help)\b).*/i, msg => {
  bot.sendMessage(msg.chat.id, 'Este comando _non ecziste_!', {
    reply_to_message_id: msg.message_id,
    parse_mode: 'Markdown',
    reply_markup: {
      remove_keyboard: true,
      selective: true
    }
  })
})

bot.on('polling_error', error => {
  console.log(error)
})
