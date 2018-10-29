const { bot } = require('./config/telegram')
const { axios } = require('./config/axios')
const { moment } = require('./config/moment')
const { notification } = require('./msgOptions')
const {
  outputMsgs: { tararau: tararauArray, ayn: aynArray }
} = require('./messages/output')

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

// Role functions
const calcRole = (chatId, roles) =>
  roles
    .reduce((array, role) => {
      const daysLeft = role.date.diff(moment(), 'days', true)
      if (daysLeft > 0) {
        array.push({ ...role, daysLeft })
      } else {
        delete role.chatId
        delete role.title
        axios.post(`/roles/${chatId}`, role)
      }
      return array
    }, [])
    .sort((a, b) => a.date - b.date)

const listRoles = (chatId, roles) =>
  calcRole(chatId, roles).map(
    role => `
➡️ *${role.title}*
Vai rolar ${role.date
      .calendar(null, { sameElse: '[em] D [de] MMMM [de] YYYY [(]dddd[)] [às] H[h]mm' })
      .toLowerCase()} no(a) ${role.location}
_${role.date.fromNow()[0].toUpperCase() + role.date.fromNow().slice(1)}${role.daysLeft < 1 ? '! 🚨' : ''}_
`
  )

// Seasons
const seasons = (isPlural = true) =>
  isPlural ? ['primaveras', 'verões', 'outonos', 'invernos'] : ['primavera', 'verão', 'outono', 'inverno']

// Birthday functions
const nextBirthday = birthdate => {
  const date = birthdate.clone().year(moment().year())
  if (date.diff(moment(), 'days', true) < 0) date.add(1, 'years')
  return date
}

const calcBirthday = tararaus =>
  tararaus
    .map(tararau => {
      const birthday = nextBirthday(tararau.birthdate)
      const daysLeft = birthday.diff(moment(), 'days')
      const age = moment().diff(tararau.birthdate, 'years') + 1
      return { ...tararau, birthday, daysLeft, age }
    })
    .sort((a, b) => a.birthday - b.birthday)

const listBirthdays = tararaus =>
  calcBirthday(tararaus).map(
    tararau => `
${tararau.signSymbol} ${tararau.userName} vai completar ${tararau.age} ${
      tararau.age !== 1 ? randomMsg(seasons()) : randomMsg(seasons(false))
    } em ${tararau.birthday.format('DD/MM/YY')}
_${tararau.birthday.fromNow()[0].toUpperCase() + tararau.birthday.fromNow().slice(1)}${
      tararau.daysLeft < 1 ? '! 🎉' : ''
    }_
`
  )

const congratulate = tararau => {
  const age = moment().diff(tararau.birthdate, 'years')
  bot.sendMessage(
    tararau.chatId,
    `*Parabéns* ${tararau.userName}!!! 🎉

Hoje você completa mais um ciclo de experiências e upa para o nível ${age}!
Aproveite o dia ao lado daqueles que são especiais para você!`,
    notification()
  )
}

// Date/Time validators
const isValidTime = (time, date) => {
  try {
    time = time.split(':').map(num => parseInt(num, 10))
    const hour = time[0]
    const minutes = time[1]
    return hour >= 0 && hour <= 23 && minutes >= 0 && minutes <= 59
      ? moment().isSameOrBefore(date.hour(hour).minutes(minutes))
      : false
  } catch (e) {
    console.error(e)
    return false
  }
}

const isValidDate = (date, isFullYear = false) =>
  isFullYear ? moment(date, 'D/M/YYYY', 'pt-br', true).isValid() : moment(date, 'D/M/YY', 'pt-br', true).isValid()

const isFutureDate = date => moment().isSameOrBefore(moment(date, 'D/M/YY'), 'day')

module.exports = {
  getRandomInt,
  randomMsg,
  buildMsg,
  listRoles,
  listBirthdays,
  congratulate,
  isValidTime,
  isValidDate,
  isFutureDate
}
