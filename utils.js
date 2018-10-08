const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')
const {
  outputMsgs: { tararau: tararauArray, aynArray }
} = require('./messages/output')

const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')

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

const randomMsg = array => array[Math.floor(Math.random() * array.length)]

const getRandomInt = (min = 2, max = 6) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const buildMsg = array => {
  const msg = randomMsg(array)
  if (array === tararauArray)
    return (
      msg.slice(0, 5) +
      msg.slice(5, 6).repeat(getRandomInt(1, 5)) +
      msg.slice(6)
    )
  if (array === aynArray)
    return msg
      .split('')
      .map(char => char.repeat(getRandomInt(1, 2)))
      .join('')
  return msg.repeat(getRandomInt())
}

const getNext = date => {
  date.add(1, 'days')
  return `${date.format('dddd')}
(${date.format('D/MMM/YY')})`
}

const buildDayOptions = date => [
  [
    `Hoje
(${date.format('D/MMM/YY')})`,
    `Amanhã
(${date.add(1, 'days').format('D/MMM/YY')})`
  ],
  [`${getNext(date)}`, `${getNext(date)}`],
  [`${getNext(date)}`, `${getNext(date)}`],
  [`${getNext(date)}`, 'Outra data'],
  ['Mudei de ideia']
]

const buildYesNoOptions = () => [['Certamente', 'Não, errei']]

const nextBirthday = birthdate => {
  const date = birthdate.clone().year(moment().get('year'))
  if (date.diff(moment(), 'days') < 0) date.add(1, 'years')
  return date
}

const calcBirthday = tararaus =>
  tararaus
    .reduce((array, tararau) => {
      const birthday = nextBirthday(tararau.birthdate)
      const countdown = birthday.diff(moment(), 'days')
      const age = moment().diff(tararau.birthdate, 'years')
      array.push({ ...tararau, birthday, countdown, age })
      return array
    }, [])
    .sort((a, b) => a.countdown - b.countdown)

const getBirthdays = tararaus =>
  calcBirthday(tararaus).map(
    tararau =>
      `${tararau.signSymbol} ${tararau.userName} vai completar ${tararau.age +
        1} inverno${tararau.age !== 1 ? 's' : ''} em ${tararau.birthday.format(
        'DD/MM/YY'
      )}
      Falta${tararau.age !== 1 ? 'm' : ''} ${tararau.countdown} dia${
        tararau.countdown !== 1 ? 's' : '!'
      }
      `
  )

module.exports = {
  filterMsg,
  randomMsg,
  getRandomInt,
  buildMsg,
  buildDayOptions,
  buildYesNoOptions,
  getBirthdays
}
