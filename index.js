process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_CHATBOT_API_KEY
const bot = new TelegramBot(token, { polling: true })

const url = `https://maps.googleapis.com/maps/api/geocode/json?${parameters}&key=${GOOGLE_API_KEY}`

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
  tararau: /ta+ra+ra+u+/,
  ayn: /\b(a+(y|i)+n+)+\b/,
  laugh: /(kk+)|(ha(ha)+)|(ah(ah)+)|(uhas(uhas)+)|(hue(hue)+)|(ahu(ahu)+)|(hua(hua)+)/,
  top: /to+p/,
  greetings: ['oi', 'oir', 'oie', 'oe', 'oer', 'olá', 'e ae', 'fala ae', 'falae', 'olar', 'hello', 'hey', 'hallo', 'hola', 'salut'],
  farewells: ['tchau', 'tchaus', 'xau', 'xaus', 'flw', 'flws', 'vlw flw', 'adios', 'adeus', 'bye', 'goodbye', 'good bye', 'fuis', 'fuiz', 'até já', 'ateh jah', 'ateh ja', 'até mais', 'ateh mais', 'até logo', 'ateh logo', 'cya', 'see ya', 'see you', 'hasta la vista', 'ciao'],
  swearings: [' da puta', 'fdp', 'se foder', 'te foder', 'se foderem', 'te foderem', 'vsf', ' no cu', 'tnc'],
  ow: ['ow', 'ei', 'psiu', 'vei', 'mano'],
  shit: ['tolete', 'merda', 'bosta', 'cocô', 'shit', 'caguei', 'cagou', 'cagaram', 'cagando', 'cagar'],
  goodMorning: ['bom dia', 'bomdia', 'bon dia', 'bondia', 'bun dia', 'bundia', 'bun dinha', 'bundinha', 'bou dia', 'boudia', 'good morning', 'morning', 'bonjour', 'buenos dias'],
  goodNight: ['boa noit', 'boanoit', 'boua noit', 'bouanoit', 'boa night', 'boanight', 'boua night', 'bouanight', 'boa nait', 'boanait', 'boua nait', 'bouanait', 'good nait', 'goodnait', 'gud nait', 'gudnait', 'good night', 'goodnight', 'gud night', 'gudnight', 'buenas noches', 'buenasnoches']
}

const outputMsgs = {
  tararau: ['Tararau', 'TARARAU'],
  ayn: ['ayn', 'AYN'],
  laugh: ['ha', 'ah', 'kk', 'uhas', 'hue', 'ahu', 'hua'],
  top: ['Top', 'TOP', 'triceráTOPs', 'TOPázio', 'TOPizza', 'TOPeira', 'TOPster', 'TOPerson', 'TOPzera', 'TOPélio', 'TOPorens', 'TOPúlio', 'TOPorie', 'TOPucas', 'TOPinga', 'TOPleno', 'TOProfano', 'TOPrepotente', 'TOPolido', 'uTÓPico', 'isóTOPo', 'TOPada', 'TOPografia', 'TOPetada', 'TOPologia', 'orTOPedia', 'cenTOPeia', 'homoTOPia', 'ciTOPlasma', 'ecTOPlasma', 'onomaTOPeia', 'TOPovski'],
  greetings: ['E ae cutetu', 'E ae putetu', 'E ae cuzudu', 'E ae coroi', 'E ae tararau', 'Fala, cutetu', 'Fala, putetu', 'Fala, cuzudu', 'Fala, coroi', 'Fala, tararau'],
  farewells: ['Vlw flw', 'Vlw flws', 'Vlw cuteto', 'Vlws', 'Flw putetu', 'Flws', 'Xau tararau', 'Xaus', 'Hasta la vista, tararau', 'Até, cuzudu'],
  swearings: ['Lava essa boca, tararau', 'Que boca suja é essa?!'],
  ow: ['Diga', 'Fale', 'Hm?'],
  shit: ['Caguei', 'Caguei!', 'CAGUEI', 'CAGUEI!', 'K-gay'],
  goodMorning: ['Bom dia seus poha!', 'Bom dia é o caralho', 'Bundinhaaa', 'Bom dia bbs', 'Bom dia nenês', 'Bom dia cutets', 'Bom dia putets', 'Bom dia cuzuds', 'Bom dia tararaus'],
  goodNight: ['Boa noite cutetu', 'Boa noite putetu', 'Boa noite cuzudu', 'Boa noite tararau', 'Gudnait modafoca', 'Sonhe com as lhamas', 'Boa viagem astral']
}

const randomMsg = array =>
  array[Math.floor(Math.random() * array.length)]

const getRandomInt = (min = 2, max = 6) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const buildMsg = array => {
  let msg = randomMsg(array)
  if (array === outputMsgs.tararau)
    return msg.slice(0,5) + msg.slice(5,6).repeat(getRandomInt()) + msg.slice(6)
  if (array === outputMsgs.ayn)
    return msg.slice(0,1).repeat(getRandomInt()) + msg.slice(1)
  return msg.repeat(getRandomInt())
}

bot.on('message', msg => {
  const userMsg = msg.text.toString().toLowerCase()
  const userName = msg.from.first_name

  const greetMatches = filterMsg(userMsg, inputMsgs.greetings)

  const farewellMatches = filterMsg(userMsg, inputMsgs.farewells)

  const swearingsMatches = inputMsgs.swearings.filter(message => userMsg.includes(message))

  const owMatches = inputMsgs.ow.filter(message => userMsg === message)

  const shitMatches = inputMsgs.shit.filter(message => userMsg.includes(message))

  const goodMorningMatches = inputMsgs.goodMorning.filter(message => userMsg.startsWith(message))

  const goodNightMatches = inputMsgs.goodNight.filter(message => userMsg.startsWith(message))

  if (swearingsMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.swearings))
  } else if (goodMorningMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.goodMorning))
  } else if (goodNightMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.goodNight))
  } else if (inputMsgs.ayn.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.ayn))
  } else if (inputMsgs.tararau.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.tararau))
  } else if (inputMsgs.laugh.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.laugh))
  } else if (inputMsgs.top.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.top))
  } else if (owMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.ow))
  } else if (greetMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.greetings))
  } else if (farewellMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.farewells))
  } else if (shitMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.shit))
  }
})

bot.onText(/\/role/i, msg => {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Hoje' }],
        [{ text: 'Amanhã' }],
        [{ text: 'Esse FDS'}]
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      selective: true
    })
  }

  bot.sendMessage(msg.chat.id, 'Quando vocês querem meter o loko?', opts)

  // bot.on('location', msg => {
  //   console.log(msg.location.latitude)
  //   console.log(msg.location.longitude)
  // })
})

bot.onText(/\/help/i, msg => {
  bot.sendMessage(msg.chat.id, 'Boa sorte, porque eu não vou te ajudar kakaka')
})