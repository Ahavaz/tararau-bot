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

bot.onText(/^\/role\b/i, msg => {
  bot
    .sendMessage(msg.chat.id, 'Quando vocês querem meter o loko?', {
      reply_to_message_id: msg.message_id,
      reply_markup: {
        force_reply: true,
        keyboard: buildDayOptions(moment()),
        resize_keyboard: true,
        one_time_keyboard: true,
        selective: true
      }
    })
    .then(() => {
      answerCallbacks[`${msg.chat.id}:${msg.from.id}`] = answerRoleDate => {
        if (answerRoleDate.text === 'Outra data') {
          bot
            .sendMessage(msg.chat.id, 'Digite uma data (DD/MM/AA) futura', {
              reply_to_message_id: answerRoleDate.message_id,
              reply_markup: {
                force_reply: true,
                remove_keyboard: true,
                selective: true
              }
            })
            .then(() => {
              answerCallbacks[
                `${msg.chat.id}:${msg.from.id}`
              ] = answerAnotherDate => {
                if (
                  moment(
                    answerAnotherDate.text,
                    'D/M/YY',
                    'pt-br',
                    true
                  ).isValid() &&
                  moment().isSameOrBefore(
                    moment(answerAnotherDate.text, 'D/M/YY'),
                    'day'
                  )
                ) {
                  const date = moment(answerAnotherDate.text, 'D/M/YY')
                  bot.sendMessage(
                    msg.chat.id,
                    `${date
                      .format('DD/MM/YY [(]dddd[)]')
                      .toLowerCase()}, qual horário (HH:mm)?`,
                    {
                      reply_to_message_id: answerAnotherDate.message_id,
                      reply_markup: {
                        remove_keyboard: true,
                        selective: true
                      }
                    }
                  )
                } else {
                  bot.sendMessage(
                    msg.chat.id,
                    'Data inválida, escolha uma data futura e preste atenção no formato',
                    {
                      reply_to_message_id: answerAnotherDate.message_id,
                      reply_markup: {
                        remove_keyboard: true,
                        selective: true
                      }
                    }
                  )
                }
              }
            })
        } else if (answerRoleDate.text === 'Mudei de ideia') {
          bot.sendMessage(
            msg.chat.id,
            `Vai ti toma no cu então ${answerRoleDate.from.first_name} ${
              emoji.find('upside_down_face').emoji
            }`,
            {
              reply_to_message_id: answerRoleDate.message_id,
              reply_markup: {
                remove_keyboard: true,
                selective: true
              }
            }
          )
        } else if (
          moment(
            answerRoleDate.text.split('\n')[1].slice(1, -1),
            'D/MMM/YY',
            'pt-br',
            true
          ).isValid()
        ) {
          const date = moment(
            answerRoleDate.text.split('\n')[1].slice(1, -1),
            'D/MMM/YY'
          )
          bot.sendMessage(
            msg.chat.id,
            `${date
              .format('DD/MM/YY [(]dddd[)]')
              .toLowerCase()}, qual horário (HH:mm)?`,
            {
              reply_to_message_id: answerRoleDate.message_id,
              reply_markup: {
                remove_keyboard: true,
                selective: true
              }
            }
          )
        } else {
          bot.sendMessage(
            msg.chat.id,
            `Use os botões, energúmeno ${
              emoji.find('face_with_rolling_eyes').emoji
            }`,
            {
              reply_to_message_id: answerRoleDate.message_id,
              reply_markup: {
                remove_keyboard: true,
                selective: true
              }
            }
          )
        }
      }
    })
})

bot.onText(/^\/niver\b/i, msg => {
  if (tararaus.filter(tararau => tararau.userId === msg.from.id).length !== 0) {
    bot.sendMessage(msg.chat.id, 'Você já inseriu sua data de nascimento', {
      reply_to_message_id: msg.message_id,
      reply_markup: {
        remove_keyboard: true,
        selective: true
      }
    })
  } else {
    bot
      .sendMessage(
        msg.chat.id,
        `Por gentileza, insira a data (DD/MM/AAAA) em que sua mãe te pariu ${
          emoji.find('slightly_smiling_face').emoji
        }`,
        {
          reply_to_message_id: msg.message_id,
          reply_markup: {
            force_reply: true,
            remove_keyboard: true,
            selective: true
          }
        }
      )
      .then(() => {
        answerCallbacks[`${msg.chat.id}:${msg.from.id}`] = answerBirthdate => {
          if (
            moment(answerBirthdate.text, 'D/M/YYYY', 'pt-br', true).isValid()
          ) {
            const date = moment(answerBirthdate.text, 'D/M/YYYY')
            bot
              .sendMessage(
                msg.chat.id,
                `Você nasceu dia ${date
                  .format('D [de] MMMM [de] YYYY [(]dddd[)]')
                  .toLowerCase()}?`,
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
                answerCallbacks[
                  `${msg.chat.id}:${msg.from.id}`
                ] = answerConfirmation => {
                  if (answerConfirmation.text === 'Certamente') {
                    const sign = getSign(date).filter(signEl =>
                      date.within(signEl.range)
                    )[0]
                    tararaus.push({
                      userId: msg.from.id,
                      userName: msg.from.first_name,
                      signName: sign.name,
                      signSymbol: sign.symbol,
                      birthdate: date
                    })
                    bot.sendMessage(
                      msg.chat.id,
                      `Data armazenada com sucesso... bom saber que você é do signo de ${
                        sign.name
                      } ${sign.symbol}`,
                      {
                        reply_to_message_id: answerConfirmation.message_id,
                        reply_markup: {
                          remove_keyboard: true,
                          selective: true
                        }
                      }
                    )
                  } else {
                    bot.sendMessage(
                      msg.chat.id,
                      'Repita o processo e vê se não erra dessa vez',
                      {
                        reply_to_message_id: answerConfirmation.message_id,
                        reply_markup: {
                          remove_keyboard: true,
                          selective: true
                        }
                      }
                    )
                  }
                }
              })
          } else {
            bot.sendMessage(
              msg.chat.id,
              'Data inválida, preste atenção no formato',
              {
                reply_to_message_id: answerBirthdate.message_id,
                reply_markup: {
                  remove_keyboard: true,
                  selective: true
                }
              }
            )
          }
        }
      })
  }
})

bot.onText(/^\/bdays\b/i, msg => {
  bot.sendMessage(
    msg.chat.id,
    `*Próximos aniversariantes* ${emoji.find('birthday').emoji}
${getBirthdays(tararaus).join()}`,
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
