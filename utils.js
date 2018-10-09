const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')
const {
  outputMsgs: { tararau: tararauArray, ayn: aynArray }
} = require('./messages/output')

const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')

// Random generators
const getRandomInt = (min = 2, max = 6) => Math.floor(Math.random() * (max - min + 1)) + min

const randomMsg = array => array[Math.floor(Math.random() * array.length)]

// Message builder
const buildMsg = array => {
  const msg = randomMsg(array)
  if (array === tararauArray) return msg.slice(0, 5) + msg.slice(5, 6).repeat(getRandomInt(1, 5)) + msg.slice(6)
  if (array === aynArray)
    return msg
      .split('')
      .map(char => char.repeat(getRandomInt(1, 2)))
      .join('')
  return msg.repeat(getRandomInt())
}

// Birthday functions
const seasons = (isPlural = true) =>
  isPlural ? ['primaveras', 'verões', 'outonos', 'invernos'] : ['primavera', 'verão', 'outono', 'inverno']

const nextBirthday = birthdate => {
  const date = birthdate.clone().year(moment().get('year'))
  if (date.diff(moment(), 'days') < 0) date.add(1, 'years')
  return date
}

const calcBirthday = (chatId, tararaus) =>
  tararaus
    .reduce((array, tararau) => {
      if (tararau.chatId === chatId) {
        const birthday = nextBirthday(tararau.birthdate)
        const countdown = birthday.diff(moment(), 'days')
        const age = moment().diff(tararau.birthdate, 'years')
        array.push({ ...tararau, birthday, countdown, age })
      }
      return array
    }, [])
    .sort((a, b) => a.countdown - b.countdown)

const getBirthdays = (chatId, tararaus) =>
  calcBirthday(chatId, tararaus).map(
    tararau => `
${tararau.signSymbol} ${tararau.userName} vai completar ${tararau.age + 1} ${
      tararau.age !== 1 ? randomMsg(seasons()) : randomMsg(seasons(false))
    } em ${tararau.birthday.format('DD/MM/YY')}
_Falta${tararau.age !== 1 ? 'm' : ''} ${tararau.countdown} dia${tararau.countdown !== 1 ? 's_' : '!_'}
`
  )

const hasBirthdays = (chatId, tararaus) => tararaus.filter(tararau => tararau.chatId === chatId).length !== 0

// Date validators
const isValidDate = (date, isFullYear = false) =>
  isFullYear ? moment(date, 'D/M/YYYY', 'pt-br', true).isValid() : moment(date, 'D/M/YY', 'pt-br', true).isValid()

const isFutureDate = date => moment().isSameOrBefore(moment(date, 'D/M/YY'), 'day')

module.exports = {
  getRandomInt,
  randomMsg,
  buildMsg,
  getBirthdays,
  hasBirthdays,
  isValidDate,
  isFutureDate
}
