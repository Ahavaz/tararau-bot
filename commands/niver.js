const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')
const { getSign } = require('../signs')
const { isValidDate } = require('../utils')
const { customKb, defaultKb } = require('../msgOptions')
const { buildYesNoOptions } = require('../keyboardTemplates')

const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')

const confirmBirthdate = (bot, tararaus, callbackId, chatId, userId, userFullName, userName, date) => {
  global.answerCallbacks[callbackId] = async answerConfirmation => {
    const answerConfirmationId = answerConfirmation.message_id

    if (answerConfirmation.text === 'Sim') {
      const sign = getSign(date).filter(signEl => date.within(signEl.range))[0]

      tararaus.push({
        chatId,
        userId,
        userName,
        userFullName,
        signName: sign.name,
        signSymbol: sign.symbol,
        birthdate: date
      })

      bot.sendMessage(
        chatId,
        `Data registrada com sucesso... não sabia que seu signo era ${sign.name} ${sign.symbol}`,
        defaultKb(answerConfirmationId)
      )
    } else if (answerConfirmation.text === 'Não') {
      await bot.sendMessage(chatId, 'Favor repetir o processo.', defaultKb(answerConfirmationId))
      getBirthdate(bot, tararaus, callbackId, chatId, userId, answerConfirmationId, userFullName, userName)
    } else {
      bot.sendMessage(chatId, 'Processo cancelado...', defaultKb(answerConfirmationId))
    }
  }
}

const receivedBirthdate = (bot, tararaus, callbackId, chatId, userId, userFullName, userName) => {
  global.answerCallbacks[callbackId] = async answerBirthdate => {
    const answerBirthdateId = answerBirthdate.message_id

    if (isValidDate(answerBirthdate.text, true)) {
      const date = moment(answerBirthdate.text, 'D/M/YYYY')

      await bot.sendMessage(
        chatId,
        `Você nasceu dia ${date.format('D [de] MMMM [de] YYYY [(]dddd[)]').toLowerCase()}?`,
        customKb(answerBirthdateId, buildYesNoOptions())
      )
      confirmBirthdate(bot, tararaus, callbackId, chatId, userId, userFullName, userName, date)
    } else {
      await bot.sendMessage(
        chatId,
        `⚠️ *Data inválida*
Preste atenção no formato.

Gostaria de tentar novamente?`,
        customKb(answerBirthdateId, buildYesNoOptions())
      )
      tryAgain(bot, tararaus, callbackId, chatId, userId, userFullName, userName)
    }
  }
}

const getBirthdate = async (bot, tararaus, callbackId, chatId, userId, msgId, userFullName, userName) => {
  await bot.sendMessage(chatId, `Por gentileza, insira sua data (DD/MM/AAAA) de nascimento 🙂`, defaultKb(msgId, true))
  receivedBirthdate(bot, tararaus, callbackId, chatId, userId, userFullName, userName)
}

const tryAgain = (bot, tararaus, callbackId, chatId, userId, userFullName, userName) => {
  global.answerCallbacks[callbackId] = async answerConfirmation => {
    const answerConfirmationId = answerConfirmation.message_id

    if (answerConfirmation.text === 'Sim') {
      getBirthdate(bot, tararaus, callbackId, chatId, userId, userFullName, userName)
    } else if (answerConfirmation.text === 'Não') {
      bot.sendMessage(chatId, 'Processo cancelado...', defaultKb(answerConfirmationId))
    } else {
      await bot.sendMessage(
        chatId,
        `🤔 Não entendi, tente novamente.`,
        customKb(answerConfirmationId, buildYesNoOptions())
      )
      tryAgain(bot, tararaus, callbackId, chatId, userId, userFullName, userName)
    }
  }
}
