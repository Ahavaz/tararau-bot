process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const moment = require('moment-timezone')
const emoji = require('node-emoji')

const token = process.env.TELEGRAM_CHATBOT_API_KEY
const bot = new TelegramBot(token, { polling: true })

moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')
// const url = `https://maps.googleapis.com/maps/api/geocode/json?${parameters}&key=${process.env.GOOGLE_API_KEY}`

const roles = []

const tararaus = []

const answerCallbacks = {}

const filterMsg = (userMsg, options) =>
  options.filter(
    option =>
      userMsg === option ||
      userMsg.startsWith(`${option} `) ||
      userMsg.startsWith(`${option},`) ||
      userMsg.startsWith(`${option}.`) ||
      userMsg.startsWith(`${option};`) ||
      userMsg.startsWith(`${option}:`) ||
      userMsg.startsWith(`${option}!`) ||
      userMsg.startsWith(`${option}?`)
  )

const inputMsgs = {
  tararau: /\bta+ra+ra+u+\b/,
  ayn: /\b(a+(y|i)+n+)+\b/,
  laugh: /(kk+)|(ha(ha)+)|(ah(ah)+)|(uhas(uhas)+)|(hue(hue)+)|(ahu(ahu)+)|(hua(hua)+)/,
  top: /to+p/,
  amor: /\ba+m(a|o)+r+|ca+sa+(r+|me+n+to+)|re+la+(ci+o+na+me+n+to+|(c|ç)(a|ã)+o+)\s*s(e|é)+ri+(o|a)+|co+m+pro+(mi+ss+o+|me+ti+me+n+to+)\b/,
  greeting: [
    'nhae',
    'oi',
    'oir',
    'oie',
    'oe',
    'oer',
    'olá',
    'e ae',
    'fala ae',
    'falae',
    'olar',
    'hello',
    'hey',
    'hallo',
    'hola',
    'salut'
  ],
  farewell: [
    'tchau',
    'tchaus',
    'xau',
    'xaus',
    'flw',
    'flws',
    'vlw flw',
    'adios',
    'adeus',
    'bye',
    'goodbye',
    'good bye',
    'fuis',
    'fuiz',
    'até já',
    'ateh jah',
    'ateh ja',
    'até mais',
    'ateh mais',
    'até logo',
    'ateh logo',
    'cya',
    'see ya',
    'see you',
    'hasta la vista',
    'ciao'
  ],
  swearings: [
    ' da puta',
    'duma puta',
    'fdp',
    'se foder',
    'te foder',
    'se foderem',
    'te foderem',
    'se foda',
    'te foda',
    'vsf',
    'seu cu',
    'teu cu',
    'tnc',
    'tomanocu',
    'tomanucu',
    'toma no cu',
    'tomar no cu',
    'te pariu',
    'te paril',
    'pqp',
    'viado',
    'veado',
    'viadinho',
    'veadinho',
    'viadão',
    'viadao',
    'veadão',
    'veadao',
    'cuzao',
    'cuzão',
    'gay',
    'baitola',
    'bichona',
    'imbecil',
    'retardado'
  ],
  ow: ['ow', 'ei', 'psiu', 'vei', 'véi', 'mano', 'cara', 'bicho'],
  shit: [
    'tolete',
    'merda',
    'mierda',
    'bosta',
    'boxta',
    'cocô',
    'shit',
    'caguei',
    'cagou',
    'cagaram',
    'cagando',
    'cagar',
    `${emoji.find('poop').emoji}`,
    'bostinha',
    'merdinha'
  ],
  goodMorning: [
    'bom dia',
    'bomdia',
    'bon dia',
    'bondia',
    'bun dia',
    'bundia',
    'bun dinha',
    'bundinha',
    'bou dia',
    'boudia',
    'good morning',
    'morning',
    'bonjour',
    'buenos dias'
  ],
  goodNight: [
    'boa noit',
    'boanoit',
    'boua noit',
    'bouanoit',
    'boa night',
    'boanight',
    'boua night',
    'bouanight',
    'boa nait',
    'boanait',
    'boua nait',
    'bouanait',
    'good nait',
    'goodnait',
    'gud nait',
    'gudnait',
    'good night',
    'goodnight',
    'gud night',
    'gudnight',
    'buenas noches',
    'buenasnoches'
  ],
  miou: /\bn((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\s*(va+(y|i)+|vo+(u|w|y)*)\s*(da+r+|ro+la+r+|ma+(i|y)*s+|po+de+r+)\b|\b(va+(y|i)+|vo+(u|w|y)*)\s*(da+r+|ro+la+r+|ma+(i|y)*s+|po+de+r+)\s*n((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\b|^\s*n((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\s*(va+(y|i)+|vo+(u|w|y)*)\s*$|^\s*(va+(y|i)+|vo+(u|w|y)*)\s*n((a|ã)*(o|u)+(m|n)*|e+(i|y)*(m|n)+)?\s*$/,
  love: ['te amo'],
  hate: ['te odeio'],
  enfia: [
    'enfia no cu',
    'enfia no rabo',
    'enfie no cu',
    'enfie no rabo',
    'enfiar no cu',
    'enfiar no rabo'
  ],
  foda: [
    'ta foda',
    'tá foda',
    'ta osso',
    'tá osso',
    'ta tenso',
    'tá tenso',
    'ta dificil',
    'tá difícil'
  ]
}

const outputMsgs = {
  tararau: ['Tararau', 'TARARAU'],
  ayn: ['ayn', 'AYN'],
  laugh: ['ha', 'ah', 'kk', 'uhas', 'hue', 'ahu', 'hua'],
  top: [
    `Top ${emoji.find('ok_hand').emoji}`,
    'TOP',
    'triceráTOPs',
    'TOPázio',
    'TOPizza',
    'TOPeira',
    'TOPster',
    'TOPerson',
    'TOPzera',
    'TOPélio',
    'TOPorens',
    'TOPúlio',
    'TOPorie',
    'TOPucas',
    'TOPinga',
    'TOPleno',
    'TOProfano',
    'TOPrepotente',
    'TOPolido',
    'TOPada',
    'TOPografia',
    'TOPetada',
    'TOPologia',
    'TOPológico',
    'TOPa ou não TOPa?',
    'TOPuto',
    'orTOPedia',
    'cenTOPeia',
    'homoTOPia',
    'ciTOPlasma',
    'ecTOPlasma',
    'onomaTOPeia',
    'TOPovski',
    'uTÓPico',
    'disTÓPico',
    'isóTOPo'
  ],
  amor: ['Deus me free', 'Tô fora', 'Nem fodendo', 'God me livre!'],
  greeting: [
    'E ae cutetu',
    'E ae putetu',
    'E ae cuzudu',
    'E ae coroi',
    'E ae tararau',
    'Fala, cutetu',
    'Fala, putetu',
    'Fala, cuzudu',
    'Fala, coroi',
    'Fala, tararau',
    'Manda bala xuxu',
    'Oi nenê <3 '
  ],
  farewell: [
    'Vlw flw',
    'Vlw flws',
    'Vlw cuteto',
    'Vlws',
    'Flw putetu',
    'Flws',
    'Xau tararau',
    'Xaus',
    'Hasta la vista, tararau',
    'Até, cuzudu',
    'Falorens',
    'Falorinha',
    'Falélio',
    'Falúlio',
    'Falucas',
    'до свидания'
  ],
  swearings: [
    'Lava essa boca, tararau',
    'Mas que boca suja é essa?!',
    'É com essa boca que você beija sua mamai?',
    'Teu cu!',
    'TEU CU',
    `${emoji.find('point_up_2').emoji}${emoji.find('point_right').emoji}${
      emoji.find('ok_hand').emoji
    }`
  ],
  ow: [
    'Diga..',
    'Fale',
    'Vemk e me conta bb',
    `Lá vem ${emoji.find('face_with_rolling_eyes').emoji}`,
    `Vemk e fala no meu ouvidinho digital... ${emoji.find('smirk').emoji}`
  ],
  shit: ['Caguei!', 'CAGUEI', 'K-gay', `${emoji.find('poop').emoji}`],
  goodMorning: userName => [
    `Bom dia seus poha! ${emoji.find('angry').emoji}`,
    `Bom dia é o caralho ${emoji.find('middle_finger').emoji}`,
    'Bundinha seus troxa',
    `Boudia bbs ${emoji.find('high_brightness').emoji}`,
    `Bom dia nenês ${emoji.find('sunny').emoji}`,
    `Bom dia cutetu ${userName}`,
    `Bom dia putetu ${userName}`,
    `Bom dia ${userName} cuzudin`,
    `Bom dia ${userName} - tararau`,
    'Hello world seus pirocetudos!!!'
  ],
  goodNight: [
    'Boa noite cutetu',
    'Boa noite putetu',
    'Boa noite cuzudu',
    'Boa noite tararau',
    'Gudnait modafoca',
    'Sonhe com as lhamas',
    'Boa viagem astral',
    'Beijinhos meu nenê'
  ],
  miou: [
    'É UM POHA',
    'MAS É UM POHA',
    'É UM POHA MESMO',
    'MAS É UM POHA MESMO',
    'FoodaC',
    'Nobody yes door',
    'Se fodeu',
    'Tomou no meio',
    'A PRONTO!',
    'OLHA AÍ A MADAME!'
  ],
  love: [`${emoji.find('purple_heart').emoji}`, 'FooodaC', 'C-A-G-A-Y'],
  hate: [`${emoji.find('broken_heart').emoji}`, 'FooodaC', 'C-A-G-A-Y'],
  enfia: ['Enfia no teu!', 'Me obrigue!', 'Por favor, insira no seu boga!'],
  foda: userName => [
    'Não tá fácil pra ninguém',
    'Eu acredito em você e acredito em um mundo mais TARARAU!',
    'SEEEGUUUUUUUUUUUUURA PEÃO!',
    `Lembre-se de quem você é ${userName}, você já lutou tanto para chegar até aqui, tenho certeza que irá sobreviver!`,
    `${userName}, você é o resultado de bilhões de ano de evolução, aja como tal!`,
    'Respira e vai!',
    `Fica sussa, relaxa o esfíncter que dá tudo certo ${
      emoji.find('ok_hand').emoji
    }`
  ]
}

const randomMsg = array => array[Math.floor(Math.random() * array.length)]

const getRandomInt = (min = 2, max = 6) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const buildMsg = array => {
  const msg = randomMsg(array)
  if (array === outputMsgs.tararau)
    return (
      msg.slice(0, 5) +
      msg.slice(5, 6).repeat(getRandomInt(1, 5)) +
      msg.slice(6)
    )
  if (array === outputMsgs.ayn)
    return msg
      .split('')
      .map(char => char.repeat(getRandomInt(1, 2)))
      .join('')
  return msg.repeat(getRandomInt())
}

const getNext = date => {
  date.add(1, 'days')
  return `${date.format('dddd')}\n(${date.format('D/MMM/YY')})`
}

const buildDayOptions = date => [
  [
    `Hoje\n(${date.format('D/MMM/YY')})`,
    `Amanhã\n(${date.add(1, 'days').format('D/MMM/YY')})`
  ],
  [`${getNext(date)}`, `${getNext(date)}`],
  [`${getNext(date)}`, `${getNext(date)}`],
  [`${getNext(date)}`, `Outra data`],
  ['Mudei de ideia']
]

const buildYesNoOptions = () => [['Sim', 'Não, errei']]

const getSign = date => [
  // Aries
  {
    name: 'áries',
    symbol: emoji.find('aries').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 03 - 21`),
      moment(`${date.get('year')} - 04 - 19`)
    )
  },
  // Taurus
  {
    name: 'touro',
    symbol: emoji.find('taurus').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 04 - 20`),
      moment(`${date.get('year')} - 05 - 20`)
    )
  },
  // Gemini
  {
    name: 'gêmeos',
    symbol: emoji.find('gemini').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 05 - 21`),
      moment(`${date.get('year')} - 06 - 21`)
    )
  },
  // Cancer
  {
    name: 'câncer',
    symbol: emoji.find('cancer').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 06 - 22`),
      moment(`${date.get('year')} - 07 - 22`)
    )
  },
  // Leo
  {
    name: 'leão',
    symbol: emoji.find('leo').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 07 - 23`),
      moment(`${date.get('year')} - 08 - 22`)
    )
  },
  // Virgo
  {
    name: 'virgem',
    symbol: emoji.find('virgo').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 08 - 23`),
      moment(`${date.get('year')} - 09 - 22`)
    )
  },
  // Libra
  {
    name: 'libra',
    symbol: emoji.find('libra').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 09 - 23`),
      moment(`${date.get('year')} - 10 - 22`)
    )
  },
  // Scorpio
  {
    name: 'escorpião',
    symbol: emoji.find('scorpius').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 10 - 23`),
      moment(`${date.get('year')} - 11 - 21`)
    )
  },
  // Sagittarius
  {
    name: 'sagitário',
    symbol: emoji.find('sagittarius').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 11 - 22`),
      moment(`${date.get('year')} - 12 - 21`)
    )
  },
  // Capricorn
  {
    name: 'capricórnio',
    symbol: emoji.find('capricorn').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 12 - 22`),
      moment(`${date.get('year')} - 01 - 19`)
    )
  },
  // Aquarius
  {
    name: 'aquário',
    symbol: emoji.find('aquarius').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 01 - 20`),
      moment(`${date.get('year')} - 02 - 18`)
    )
  },
  // Pisces
  {
    name: 'peixes',
    symbol: emoji.find('pisces').emoji,
    range: moment.range(
      moment(`${date.get('year')} - 02 - 19`),
      moment(`${date.get('year')} - 03 - 20`)
    )
  }
]

const calcBirthday = () =>
  tararaus
    .reduce((array, tararau) => {
      const birthday = moment([
        moment().get('year'),
        tararau.birthdate.get('month'),
        tararau.birthdate.get('date')
      ])
      if (birthday.diff(moment(), 'days') < 0) birthday.add(1, 'years')
      const countdown = birthday.diff(moment(), 'days')
      const age = moment().diff(tararau.birthdate, 'years')
      array.push({ ...tararau, birthday, countdown, age })
      return array
    }, [])
    .sort((a, b) => a.countdown - b.countdown)

const getBirthdays = () =>
  calcBirthday().map(
    tararau =>
      `${tararau.signSymbol}(${tararau.birthday}) ${
        tararau.userName
      } \nvai completar ${tararau.age + 1} invernos \nem ${
        tararau.countdown
      } dia${tararau.countdown === 1 ? '' : 's'}\n`
  )

bot.on('message', msg => {
  const callback = answerCallbacks[`${msg.chat.id}:${msg.from.id}`]
  if (callback) {
    delete answerCallbacks[`${msg.chat.id}:${msg.from.id}`]
    return callback(msg)
  }

  const userMsg = msg.text.toString().toLowerCase()
  // const userName = msg.from.first_name
  // const userId = msg.from.id

  const greetingMatches = filterMsg(userMsg, inputMsgs.greeting)
  const farewellMatches = filterMsg(userMsg, inputMsgs.farewell)
  const swearingsMatches = inputMsgs.swearings.filter(message =>
    userMsg.includes(message)
  )
  const owMatches = inputMsgs.ow.filter(message => userMsg === message)
  const shitMatches = inputMsgs.shit.filter(message =>
    userMsg.includes(message)
  )
  const goodMorningMatches = inputMsgs.goodMorning.filter(message =>
    userMsg.startsWith(message)
  )
  const goodNightMatches = inputMsgs.goodNight.filter(message =>
    userMsg.startsWith(message)
  )
  const loveMatches = inputMsgs.love.filter(message =>
    userMsg.includes(message)
  )
  const hateMatches = inputMsgs.hate.filter(message =>
    userMsg.includes(message)
  )
  const enfiaMatches = inputMsgs.enfia.filter(message =>
    userMsg.includes(message)
  )
  const fodaMatches = inputMsgs.foda.filter(message =>
    userMsg.includes(message)
  )

  if (swearingsMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.swearings), {
      reply_to_message_id: msg.message_id
    })
  } else if (enfiaMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.enfia), {
      reply_to_message_id: msg.message_id
    })
  } else if (fodaMatches.length !== 0) {
    bot.sendMessage(
      msg.chat.id,
      randomMsg(outputMsgs.foda(msg.from.first_name)),
      { reply_to_message_id: msg.message_id }
    )
  } else if (inputMsgs.miou.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.miou), {
      reply_to_message_id: msg.message_id
    })
  } else if (goodMorningMatches.length !== 0) {
    bot.sendMessage(
      msg.chat.id,
      randomMsg(outputMsgs.goodMorning(msg.from.first_name)),
      { reply_to_message_id: msg.message_id }
    )
  } else if (goodNightMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.goodNight), {
      reply_to_message_id: msg.message_id
    })
  } else if (loveMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.love), {
      reply_to_message_id: msg.message_id
    })
  } else if (hateMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.hate), {
      reply_to_message_id: msg.message_id
    })
  } else if (inputMsgs.amor.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.amor), {
      reply_to_message_id: msg.message_id
    })
  } else if (inputMsgs.top.test(userMsg)) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.top), {
      reply_to_message_id: msg.message_id
    })
  } else if (owMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.ow), {
      reply_to_message_id: msg.message_id
    })
  } else if (greetingMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.greeting), {
      reply_to_message_id: msg.message_id
    })
  } else if (farewellMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.farewell), {
      reply_to_message_id: msg.message_id
    })
  } else if (shitMatches.length !== 0) {
    bot.sendMessage(msg.chat.id, randomMsg(outputMsgs.shit), {
      reply_to_message_id: msg.message_id
    })
  } else if (inputMsgs.tararau.test(userMsg)) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.tararau))
  } else if (inputMsgs.ayn.test(userMsg) && getRandomInt(1, 2) === 1) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.ayn))
  } else if (inputMsgs.laugh.test(userMsg) && getRandomInt(1, 3) === 1) {
    bot.sendMessage(msg.chat.id, buildMsg(outputMsgs.laugh))
  }
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
                    `${date.format('DD/MM/YY')} (${date
                      .format('dddd')
                      .toLowerCase()}), qual horário (HH:mm)?`,
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
                    'Data inválida, preste atenção no formato',
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
            `${date.format('DD/MM/YY')} (${date
              .format('dddd')
              .toLowerCase()}), qual horário (HH:mm)?`,
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
            }\nE faça tudo de novo pra deixar de ser besta`,
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
    bot.sendMessage(msg.chat.id, `Você já inseriu sua data de nascimento`, {
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
                `Você nasceu dia ${date.format(
                  'D [de] MMMM [de] YYYY'
                )} (${date.format('dddd').toLowerCase()})?`,
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
                  console.log(
                    JSON.stringify(
                      answerCallbacks[`${msg.chat.id}:${msg.from.id}`],
                      answerConfirmation,
                      answerConfirmation.text
                    )
                  )
                  if (answerConfirmation.text === 'Sim') {
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
                    // console.log(JSON.stringify(answerConfirmation.text, sign, tararaus))
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
                    // .catch(error => {
                    //   console.log(error.code)
                    //   console.log(error.response.body)
                    // })
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
    `Próximos aniversariantes ${
      emoji.find('birthday').emoji
    } \n${getBirthdays().join()} `,
    {
      reply_to_message_id: msg.message_id,
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
    'Boa sorte, porque eu não vou te ajudar kakaka',
    { reply_to_message_id: msg.message_id }
  )
})

bot.onText(/^\/status\b/i, msg => {
  bot.sendMessage(
    msg.chat.id,
    `answerCallbacks: ${JSON.stringify(answerCallbacks)} `,
    { reply_to_message_id: msg.message_id }
  )
})

bot.on('polling_error', error => {
  console.log(error)
  // console.log(error.response && error.response.body)
})
