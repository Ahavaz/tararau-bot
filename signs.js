const moment = require('./config/moment')

const getSign = date => [
  // Aries
  {
    name: 'áries',
    symbol: `♈️`,
    range: moment.range(moment(`${date.year()}-03-21`), moment(`${date.year()}-04-20`))
  },
  // Taurus
  {
    name: 'touro',
    symbol: `♉️`,
    range: moment.range(moment(`${date.year()}-04-21`), moment(`${date.year()}-05-20`))
  },
  // Gemini
  {
    name: 'gêmeos',
    symbol: `♊️`,
    range: moment.range(moment(`${date.year()}-05-21`), moment(`${date.year()}-06-20`))
  },
  // Cancer
  {
    name: 'câncer',
    symbol: `♋️`,
    range: moment.range(moment(`${date.year()}-06-21`), moment(`${date.year()}-07-21`))
  },
  // Leo
  {
    name: 'leão',
    symbol: `♌️`,
    range: moment.range(moment(`${date.year()}-07-22`), moment(`${date.year()}-08-22`))
  },
  // Virgo
  {
    name: 'virgem',
    symbol: `♍️`,
    range: moment.range(moment(`${date.year()}-08-23`), moment(`${date.year()}-09-22`))
  },
  // Libra
  {
    name: 'libra',
    symbol: `♎️`,
    range: moment.range(moment(`${date.year()}-09-23`), moment(`${date.year()}-10-22`))
  },
  // Scorpio
  {
    name: 'escorpião',
    symbol: `♏️`,
    range: moment.range(moment(`${date.year()}-10-23`), moment(`${date.year()}-11-21`))
  },
  // Sagittarius
  {
    name: 'sagitário',
    symbol: `♐️`,
    range: moment.range(moment(`${date.year()}-11-22`), moment(`${date.year()}-12-21`))
  },
  // Capricorn
  {
    name: 'capricórnio',
    symbol: `♑️`,
    range: moment.range(moment(`${date.year()}-12-22`), moment(`${date.year() + 1}-12-31`))
  },
  {
    name: 'capricórnio',
    symbol: `♑️`,
    range: moment.range(moment(`${date.year()}-01-01`), moment(`${date.year() + 1}-01-20`))
  },
  // Aquarius
  {
    name: 'aquário',
    symbol: `♒️`,
    range: moment.range(moment(`${date.year()}-01-21`), moment(`${date.year()}-02-19`))
  },
  // Pisces
  {
    name: 'peixes',
    symbol: `♓️`,
    range: moment.range(moment(`${date.year()}-02-20`), moment(`${date.year()}-03-20`))
  }
]

module.exports = {
  getSign
}
