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

bot.on('message', msg => {
  const userMsg = msg.text.toString().toLowerCase()

  const tararau = /ta+ra+ra+u+/
  const ayn = /a+y+n+/
  const kkk = /kk+/
  const vei = ['vei', 'mano']
  const greetings = ['oi', 'oir', 'oie', 'oe', 'oer', 'olá', 'e ae', 'fala ae', 'falae', 'olar', 'hello', 'hey', 'hey there', 'hallo', 'hola', 'salut']
  const farewells = ['tchau', 'xau', 'xaus', 'flw', 'flws', 'vlw flw', 'adios', 'adeus', 'bye', 'goodbye', 'fui', 'até', 'ateh', 'até já', 'ateh jah', 'ateh ja', 'até mais', 'ateh mais', 'até logo', 'ateh logo', 'cya', 'see ya', 'see you', 'hasta la vista']
  const swearings = [' da puta', 'fdp', 'se foder', 'te foder', 'se foderem', 'te foderem', 'vsf', ' no cu', 'tnc']
  const ow = ['ow', 'ei', 'psiu']
  const shit = ['tolete', 'merda', 'bosta', 'cocô', 'shit', 'caguei', 'cagou', 'cagaram', 'cagando', 'cagar']

  const greetMatches = filterMsg(userMsg, greetings)

  const farewellMatches = filterMsg(userMsg, farewells)

  const swearingsMatches = swearings.filter(message => userMsg.includes(message))

  const owMatches = ow.filter(message => userMsg === message)

  const shitMatches = shit.filter(message => userMsg.includes(message))

  const veiMatches = vei.filter(message => userMsg === message)

  if (tararau.test(userMsg)) {
    bot.sendMessage(msg.chat.id, 'TARARAAAAAU')
  } else if (ayn.test(userMsg)) {
    bot.sendMessage(msg.chat.id, 'Ayn')
  } else if (kkk.test(userMsg)) {
    bot.sendMessage(msg.chat.id, 'Hahaha')
  } else if (veiMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, 'Diga')
  } else if (greetMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, `E ae, ${msg.from.first_name}!`)
  } else if (farewellMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, `Flw, ${msg.from.first_name} o/`)
  } else if (swearingsMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, `Mas que boca suja é essa, ${msg.from.first_name}?!`)
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