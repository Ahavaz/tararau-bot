const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')

const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')

const getSign = date => [
  // Aries
  {
    name: 'áries',
    symbol: `♈️`,
    range: moment.range(moment(`${date.get('year')}-03-21`), moment(`${date.get('year')}-04-20`))
  },
  // Taurus
  {
    name: 'touro',
    symbol: `♉️`,
    range: moment.range(moment(`${date.get('year')}-04-21`), moment(`${date.get('year')}-05-20`))
  },
  // Gemini
  {
    name: 'gêmeos',
    symbol: `♊️`,
    range: moment.range(moment(`${date.get('year')}-05-21`), moment(`${date.get('year')}-06-20`))
  },
  // Cancer
  {
    name: 'câncer',
    symbol: `♋️`,
    range: moment.range(moment(`${date.get('year')}-06-21`), moment(`${date.get('year')}-07-21`))
  },
  // Leo
  {
    name: 'leão',
    symbol: `♌️`,
    range: moment.range(moment(`${date.get('year')}-07-22`), moment(`${date.get('year')}-08-22`))
  },
  // Virgo
  {
    name: 'virgem',
    symbol: `♍️`,
    range: moment.range(moment(`${date.get('year')}-08-23`), moment(`${date.get('year')}-09-22`))
  },
  // Libra
  {
    name: 'libra',
    symbol: `♎️`,
    range: moment.range(moment(`${date.get('year')}-09-23`), moment(`${date.get('year')}-10-22`))
  },
  // Scorpio
  {
    name: 'escorpião',
    symbol: `♏️`,
    range: moment.range(moment(`${date.get('year')}-10-23`), moment(`${date.get('year')}-11-21`))
  },
  // Sagittarius
  {
    name: 'sagitário',
    symbol: `♐️`,
    range: moment.range(moment(`${date.get('year')}-11-22`), moment(`${date.get('year')}-12-21`))
  },
  // Capricorn
  {
    name: 'capricórnio',
    symbol: `♑️`,
    range: moment.range(moment(`${date.get('year')}-12-22`), moment(`${date.get('year') + 1}-12-31`))
  },
  {
    name: 'capricórnio',
    symbol: `♑️`,
    range: moment.range(moment(`${date.get('year')}-01-01`), moment(`${date.get('year') + 1}-01-20`))
  },
  // Aquarius
  {
    name: 'aquário',
    symbol: `♒️`,
    range: moment.range(moment(`${date.get('year')}-01-21`), moment(`${date.get('year')}-02-19`))
  },
  // Pisces
  {
    name: 'peixes',
    symbol: `♓️`,
    range: moment.range(moment(`${date.get('year')}-02-20`), moment(`${date.get('year')}-03-20`))
  }
]

module.exports = {
  getSign
}
