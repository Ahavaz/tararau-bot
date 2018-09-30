process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_CHATBOT_API_KEY
const bot = new TelegramBot(token, { polling: true })

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
  ayn: /^a+y+n+$/,
  laugh: /(kk+)|(ha(ha)+)|(ah(ah)+)|(uhas(uhas)+)|(hue(hue)+)|(ahu(ahu)+)/,
  top: /to+p/,
  vei: ['vei', 'mano'],
  greetings: ['oi', 'oir', 'oie', 'oe', 'oer', 'olá', 'e ae', 'fala ae', 'falae', 'olar', 'hello', 'hey', 'hey there', 'hallo', 'hola', 'salut'],
  farewells: ['tchau', 'xau', 'xaus', 'flw', 'flws', 'vlw flw', 'adios', 'adeus', 'bye', 'goodbye', 'fui', 'até', 'ateh', 'até já', 'ateh jah', 'ateh ja', 'até mais', 'ateh mais', 'até logo', 'ateh logo', 'cya', 'see ya', 'see you', 'hasta la vista'],
  swearings: [' da puta', 'fdp', 'se foder', 'te foder', 'se foderem', 'te foderem', 'vsf', ' no cu', 'tnc'],
  ow: ['ow', 'ei', 'psiu'],
  shit: ['tolete', 'merda', 'bosta', 'cocô', 'shit', 'caguei', 'cagou', 'cagaram', 'cagando', 'cagar']
}

const outputMsgs = {
  laugh: ['ha', 'ah', 'kk', 'uhas', 'hue', 'ahu'],
  top: ['Top', 'TOP', 'triceráTOPs', 'TOPázio', 'TOPizza', 'TOPeira', 'TOPster', 'TOPerson', 'TOPzera', 'TOPélio', 'TOPorens', 'TOPúlio', 'TOPorie', 'TOPucas', 'TOPinga', 'TOPleno', 'TOProfano', 'TOPrepotente', 'TOPolido', 'uTÓPico', 'isóTOPo', 'TOPada', 'TOPografia', 'TOPetada', 'TOPologia', 'orTOPedia', 'cenTOPeia', 'homoTOPia', 'ciTOPlasma', 'ecTOPlasma', 'onomaTOPeia', 'TOPovski'],
  ayn: ['ayn'],
  tararau: ['Tararau', 'TARARAU']
}

const randomMsg = array =>
  array[Math.floor(Math.random() * array.length)]

const getRandomInt = (min = 1, max = 5) =>
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

  // const tararau = /ta+ra+ra+u+/
  // const ayn = /a+y+n+/
  // const laugh = /kk+/
  // const top = /to+p*/
  // const vei = ['vei', 'mano']
  // const greetings = ['oi', 'oir', 'oie', 'oe', 'oer', 'olá', 'e ae', 'fala ae', 'falae', 'olar', 'hello', 'hey', 'hey there', 'hallo', 'hola', 'salut']
  // const farewells = ['tchau', 'xau', 'xaus', 'flw', 'flws', 'vlw flw', 'adios', 'adeus', 'bye', 'goodbye', 'fui', 'até', 'ateh', 'até já', 'ateh jah', 'ateh ja', 'até mais', 'ateh mais', 'até logo', 'ateh logo', 'cya', 'see ya', 'see you', 'hasta la vista']
  // const swearings = [' da puta', 'fdp', 'se foder', 'te foder', 'se foderem', 'te foderem', 'vsf', ' no cu', 'tnc']
  // const ow = ['ow', 'ei', 'psiu']
  // const shit = ['tolete', 'merda', 'bosta', 'cocô', 'shit', 'caguei', 'cagou', 'cagaram', 'cagando', 'cagar']

  const greetMatches = filterMsg(userMsg, inputMsgs.greetings)

  const farewellMatches = filterMsg(userMsg, inputMsgs.farewells)

  const swearingsMatches = inputMsgs.swearings.filter(message => userMsg.includes(message))

  const owMatches = inputMsgs.ow.filter(message => userMsg === message)

  const shitMatches = inputMsgs.shit.filter(message => userMsg.includes(message))

  const veiMatches = inputMsgs.vei.filter(message => userMsg === message)

  if (swearingsMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, `Que boca suja é essa, ${userName}?!`)
  } else if (inputMsgs.ayn.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.ayn))
  } else if (inputMsgs.tararau.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.tararau))
  } else if (inputMsgs.laugh.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.laugh))
  } else if (inputMsgs.top.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.top))
  } else if (veiMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, 'Diga')
  } else if (greetMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, `E ae, ${userName}!`)
  } else if (farewellMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, `Flw, ${userName} o/`)
  } else if (owMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, 'Hm')
  } else if (shitMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, 'CAGUEI!')
  }
})

bot.onText(/\/role/, msg => {
  bot.sendMessage(msg.chat.id, 'Quando vocês querem meter o loko?')

  // const opts = {
  //   reply_markup: JSON.stringify({
  //     keyboard: [
  //       [{ text: 'Location', request_location: true }],
  //       [{ text: 'Contact', request_contact: true }],
  //     ],
  //     resize_keyboard: true,
  //     one_time_keyboard: true,
  //   })
  // }

  // bot.sendMessage(msg.chat.id, 'Contact and Location request', opts)

  // bot.on('location', msg => {
  //   console.log(msg.location.latitude)
  //   console.log(msg.location.longitude)
  // })
})