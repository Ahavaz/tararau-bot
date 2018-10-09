const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')
const emoji = require('node-emoji')

const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')

const getSign = date => [
  // Aries
  {
    name: 'áries',
    symbol: emoji.find('aries').emoji,
    range: moment.range(moment(`${date.get('year')}-03-21`), moment(`${date.get('year')}-04-19`))
  },
  // Taurus
  {
    name: 'touro',
    symbol: emoji.find('taurus').emoji,
    range: moment.range(moment(`${date.get('year')}-04-20`), moment(`${date.get('year')}-05-20`))
  },
  // Gemini
  {
    name: 'gêmeos',
    symbol: emoji.find('gemini').emoji,
    range: moment.range(moment(`${date.get('year')}-05-21`), moment(`${date.get('year')}-06-21`))
  },
  // Cancer
  {
    name: 'câncer',
    symbol: emoji.find('cancer').emoji,
    range: moment.range(moment(`${date.get('year')}-06-22`), moment(`${date.get('year')}-07-22`))
  },
  // Leo
  {
    name: 'leão',
    symbol: emoji.find('leo').emoji,
    range: moment.range(moment(`${date.get('year')}-07-23`), moment(`${date.get('year')}-08-22`))
  },
  // Virgo
  {
    name: 'virgem',
    symbol: emoji.find('virgo').emoji,
    range: moment.range(moment(`${date.get('year')}-08-23`), moment(`${date.get('year')}-09-22`))
  },
  // Libra
  {
    name: 'libra',
    symbol: emoji.find('libra').emoji,
    range: moment.range(moment(`${date.get('year')}-09-23`), moment(`${date.get('year')}-10-22`))
  },
  // Scorpio
  {
    name: 'escorpião',
    symbol: emoji.find('scorpius').emoji,
    range: moment.range(moment(`${date.get('year')}-10-23`), moment(`${date.get('year')}-11-21`))
  },
  // Sagittarius
  {
    name: 'sagitário',
    symbol: emoji.find('sagittarius').emoji,
    range: moment.range(moment(`${date.get('year')}-11-22`), moment(`${date.get('year')}-12-21`))
  },
  // Capricorn
  {
    name: 'capricórnio',
    symbol: emoji.find('capricorn').emoji,
    range: moment.range(moment(`${date.get('year')}-12-22`), moment(`${date.get('year')}-01-19`))
  },
  // Aquarius
  {
    name: 'aquário',
    symbol: emoji.find('aquarius').emoji,
    range: moment.range(moment(`${date.get('year')}-01-20`), moment(`${date.get('year')}-02-18`))
  },
  // Pisces
  {
    name: 'peixes',
    symbol: emoji.find('pisces').emoji,
    range: moment.range(moment(`${date.get('year')}-02-19`), moment(`${date.get('year')}-03-20`))
  }
]

module.exports = {
  getSign
}
