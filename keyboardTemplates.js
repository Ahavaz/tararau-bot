// const Moment = require('moment-timezone')
// const { extendMoment } = require('moment-range')

// const moment = extendMoment(Moment)
// moment.locale('pt-br')
// moment.tz.setDefault('America/Sao_Paulo')

const getNext = date => {
  date.add(1, 'days')
  return `${date.format(`dddd
[(]'D/MMM/YY'[)]`)}`
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

module.exports = {
  buildDayOptions,
  buildYesNoOptions
}
