process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const moment = require('moment-timezone')
const emoji = require('node-emoji')
const token = process.env.TELEGRAM_CHATBOT_API_KEY
const bot = new TelegramBot(token, { polling: true })

moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')
// const url = `https://maps.googleapis.com/maps/api/geocode/json?${parameters}&key=${process.env.GOOGLE_API_KEY}`

const filterMsg = (userMsg, options) =>
  options.filter(option => userMsg === option
    || userMsg.startsWith(option + ' ')
    || userMsg.startsWith(option + ',')
    || userMsg.startsWith(option + '.')
    || userMsg.startsWith(option + ';')
    || userMsg.startsWith(option + ':')
    || userMsg.startsWith(option + '!')
    || userMsg.startsWith(option + '?'))

const inputMsgs = {
  tararau: /\bta+ra+ra+u+\b/,
  ayn: /\b(a+(y|i)+n+)+\b/,
  laugh: /(kk+)|(ha(ha)+)|(ah(ah)+)|(uhas(uhas)+)|(hue(hue)+)|(ahu(ahu)+)|(hua(hua)+)/,
  top: /to+p/,
  amor: /\ba+m(a|o)+r+|ca+sa+(r+|me+n+to+)|re+la+(ci+o+na+me+n+to+|(c|ç)(a|ã)+o+)\s*s(e|é)+ri+(o|a)+|co+m+pro+(mi+ss+o+|me+ti+me+n+to+)\b/,
  greeting: ['nhae', 'oi', 'oir', 'oie', 'oe', 'oer', 'olá', 'e ae', 'fala ae', 'falae', 'olar', 'hello', 'hey', 'hallo', 'hola', 'salut'],
  farewell: ['tchau', 'tchaus', 'xau', 'xaus', 'flw', 'flws', 'vlw flw', 'adios', 'adeus', 'bye', 'goodbye', 'good bye', 'fuis', 'fuiz', 'até já', 'ateh jah', 'ateh ja', 'até mais', 'ateh mais', 'até logo', 'ateh logo', 'cya', 'see ya', 'see you', 'hasta la vista', 'ciao'],
  swearings: [' da puta', 'duma puta', 'fdp', 'se foder', 'te foder', 'se foderem', 'te foderem', 'se foda', 'te foda', 'vsf', 'seu cu', 'teu cu', 'tnc', 'tomanocu', 'tomanucu', 'te pariu', 'te paril', 'pqp', 'viado', 'veado', 'viadinho', 'veadinho', 'viadão', 'viadao', 'veadão', 'veadao', 'cuzao', 'cuzão', 'gay', 'baitola', 'bichona'],
  ow: ['ow', 'ei', 'psiu', 'vei', 'véi', 'mano', 'cara', 'bicho'],
  shit: ['tolete', 'merda', 'mierda', 'bosta', 'boxta', 'cocô', 'shit', 'caguei', 'cagou', 'cagaram', 'cagando', 'cagar', emoji.emojify(':poop:'), 'bostinha', 'merdinha'],
  goodMorning: ['bom dia', 'bomdia', 'bon dia', 'bondia', 'bun dia', 'bundia', 'bun dinha', 'bundinha', 'bou dia', 'boudia', 'good morning', 'morning', 'bonjour', 'buenos dias'],
  goodNight: ['boa noit', 'boanoit', 'boua noit', 'bouanoit', 'boa night', 'boanight', 'boua night', 'bouanight', 'boa nait', 'boanait', 'boua nait', 'bouanait', 'good nait', 'goodnait', 'gud nait', 'gudnait', 'good night', 'goodnight', 'gud night', 'gudnight', 'buenas noches', 'buenasnoches'],
  miou: /\bn((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\s*(va+(y|i)+|vo+(u|w|y)*)\s*(da+r+|ro+la+r+|ma+(i|y)*s+|po+de+r+)\b|\b(va+(y|i)+|vo+(u|w|y)*)\s*(da+r+|ro+la+r+|ma+(i|y)*s+|po+de+r+)\s*n((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\b|^\s*n((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\s*(va+(y|i)+|vo+(u|w|y)*)\s*$|^\s*(va+(y|i)+|vo+(u|w|y)*)\s*n((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\s*$/,
  love: ['te amo'],
  hate: ['te odeio'],
  enfia: ['enfia no cu', 'enfia no rabo', 'enfie no cu', 'enfie no rabo', 'enfiar no cu', 'enfiar no rabo'],
  foda: ['ta foda', 'tá foda', 'ta osso', 'tá osso', 'ta tenso', 'tá tenso', 'ta dificil', 'tá difícil']
}

const outputMsgs = {
  tararau: ['Tararau', 'TARARAU'],
  ayn: ['ayn', 'AYN'],
  laugh: ['ha', 'ah', 'kk', 'uhas', 'hue', 'ahu', 'hua'],
  top: [emoji.emojify('Top :ok_hand:'), 'TOP', 'triceráTOPs', 'TOPázio', 'TOPizza', 'TOPeira', 'TOPster', 'TOPerson', 'TOPzera', 'TOPélio', 'TOPorens', 'TOPúlio', 'TOPorie', 'TOPucas', 'TOPinga', 'TOPleno', 'TOProfano', 'TOPrepotente', 'TOPolido', 'uTÓPico', 'isóTOPo', 'TOPada', 'TOPografia', 'TOPetada', 'TOPologia', 'orTOPedia', 'cenTOPeia', 'homoTOPia', 'ciTOPlasma', 'ecTOPlasma', 'onomaTOPeia', 'TOPovski'],
  amor: ['Deus me free', 'Tô fora', 'Nem fodendo'],
  greeting: ['E ae cutetu', 'E ae putetu', 'E ae cuzudu', 'E ae coroi', 'E ae tararau', 'Fala, cutetu', 'Fala, putetu', 'Fala, cuzudu', 'Fala, coroi', 'Fala, tararau'],
  farewell: ['Vlw flw', 'Vlw flws', 'Vlw cuteto', 'Vlws', 'Flw putetu', 'Flws', 'Xau tararau', 'Xaus', 'Hasta la vista, tararau', 'Até, cuzudu'],
  swearings: ['Lava essa boca, tararau', 'Mas que boca suja é essa?!', 'Teu cu!', 'TEU CU', '', emoji.emojify(':point_up_2::point_right::ok_hand:')],
  ow: [emoji.emojify('Diga :face_with_rolling_eyes:'), 'Fale', 'Hm?'],
  shit: ['Caguei!', 'CAGUEI', 'K-gay', emoji.emojify(':poop:')],
  goodMorning: [emoji.emojify('Bom dia seus poha! :angry:'), emoji.emojify('Bom dia é o caralho :middle_finger:'), 'Bundinha seus troxa', emoji.emojify('Bom dia bbs :high_brightness:'), emoji.emojify('Bom dia nenês :sunny:'), 'Bom dia cutets', 'Bom dia putets', 'Bom dia cuzuds', 'Bom dia tararaus'],
  goodNight: ['Boa noite cutetu', 'Boa noite putetu', 'Boa noite cuzudu', 'Boa noite tararau', 'Gudnait modafoca', 'Sonhe com as lhamas', 'Boa viagem astral'],
  miou: ['É UM POHA', 'MAS É UM POHA', 'É UM POHA MESMO', 'MAS É UM POHA MESMO', 'FoodaC', 'Nobody yes door', 'Se fodeu', 'Tomou no meio'],
  love: [emoji.emojify(':purple_heart:'), 'FooodaC', 'C-A-G-A-Y'],
  hate: [emoji.emojify(':broken_heart:'), 'FooodaC', 'C-A-G-A-Y'],
  enfia: ['Enfia no teu!', 'Me obrigue!'],
  foda: ['Não tá fácil pra ninguém', emoji.emojify('Fica sussa, relaxa o ânus que DÁ tudo certo :ok_hand:')]
}

const randomMsg = array =>
  array[Math.floor(Math.random() * array.length)]

const getRandomInt = (min = 2, max = 6) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const buildMsg = array => {
  let msg = randomMsg(array)
  if (array === outputMsgs.tararau)
    return msg.slice(0, 5) + msg.slice(5, 6).repeat(getRandomInt(1, 5)) + msg.slice(6)
  if (array === outputMsgs.ayn)
    return msg.split('').map(char => char.repeat(getRandomInt(1, 2))).join('')
  return msg.repeat(getRandomInt())
}

const getNext = date => {
  date.add(1, 'days')
  return `${date.format('dddd')} (${date.format('D MMM YY')})`
}

const buildDayOptions = date => [
  [`Hoje (${date.format('D MMM')})`, `Amanhã (${date.add(1, 'days').format('D MMM')})`],
  [`${getNext(date)}`, `${getNext(date)}`],
  [`${getNext(date)}`, `${getNext(date)}`],
  [`${getNext(date)}`, `Outra data`]
]

const answerCallbacks = {}

bot.on('message', msg => {
  const callback = answerCallbacks[msg.chat.id]
  if (callback) {
    delete answerCallbacks[msg.chat.id]
    return callback(msg)
  }

  const userMsg = msg.text.toString().toLowerCase()
  // const userName = msg.from.first_name

  const greetingMatches = filterMsg(userMsg, inputMsgs.greeting)
  const farewellMatches = filterMsg(userMsg, inputMsgs.farewell)
  const swearingsMatches = inputMsgs.swearings.filter(message => userMsg.includes(message))
  const owMatches = inputMsgs.ow.filter(message => userMsg === message)
  const shitMatches = inputMsgs.shit.filter(message => userMsg.includes(message))
  const goodMorningMatches = inputMsgs.goodMorning.filter(message => userMsg.startsWith(message))
  const goodNightMatches = inputMsgs.goodNight.filter(message => userMsg.startsWith(message))
  const loveMatches = inputMsgs.love.filter(message => userMsg.includes(message))
  const hateMatches = inputMsgs.hate.filter(message => userMsg.includes(message))
  const enfiaMatches = inputMsgs.enfia.filter(message => userMsg.includes(message))
  const fodaMatches = inputMsgs.foda.filter(message => userMsg.includes(message))

  if (swearingsMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.swearings), { reply_to_message_id: msg.message_id })
  } else if (enfiaMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.enfia), { reply_to_message_id: msg.message_id })
  } else if (fodaMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.foda), { reply_to_message_id: msg.message_id })
  } else if (inputMsgs.miou.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.miou), { reply_to_message_id: msg.message_id })
  } else if (goodMorningMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.goodMorning), { reply_to_message_id: msg.message_id })
  } else if (goodNightMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.goodNight), { reply_to_message_id: msg.message_id })
  } else if (loveMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.love), { reply_to_message_id: msg.message_id })
  } else if (hateMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.hate), { reply_to_message_id: msg.message_id })
  } else if (inputMsgs.amor.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.amor), { reply_to_message_id: msg.message_id })
  } else if (inputMsgs.top.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.top), { reply_to_message_id: msg.message_id })
  } else if (owMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.ow), { reply_to_message_id: msg.message_id })
  } else if (greetingMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.greeting), { reply_to_message_id: msg.message_id })
  } else if (farewellMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.farewell), { reply_to_message_id: msg.message_id })
  } else if (shitMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.shit), { reply_to_message_id: msg.message_id })
  } else if (inputMsgs.tararau.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.tararau))
  } else if (inputMsgs.ayn.test(userMsg) && getRandomInt(1, 2) === 1) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.ayn))
  } else if (inputMsgs.laugh.test(userMsg) && getRandomInt(1, 3) === 1) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.laugh))
  }
})

bot.onText(/^\/role/i, msg => {
  bot.sendMessage(msg.chat.id, 'Quando vocês querem meter o loko?', {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      force_reply: true,
      keyboard: buildDayOptions(moment()),
      resize_keyboard: true,
      one_time_keyboard: true,
      selective: true
    }
  }).then(() => {
    answerCallbacks[chatId] = answer => {
      bot.sendMessage(msg.chat.id, `Você selecionou ${answer}`, {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          remove_keyboard: true,
          selective: true
        }
      })
    }
  })
})

bot.onText(/^\/clear/i, msg => {
  bot.sendMessage(msg.chat.id, emoji.emojify('Finalmente conseguiu se livrar desse teclado dos infernos hein :clap:'), {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      remove_keyboard: true,
      selective: true
    }
  })
})

bot.onText(/^\/help/i, msg => {
  bot.sendMessage(msg.chat.id, 'Boa sorte, porque eu não vou te ajudar kakaka', { reply_to_message_id: msg.message_id })
})