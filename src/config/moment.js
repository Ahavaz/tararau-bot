const Moment = require('moment-timezone')
const { extendMoment } = require('moment-range')

const moment = extendMoment(Moment)
moment.locale('pt-br')
moment.updateLocale('pt-br', {
  calendar: {
    lastWeek: 'dddd [passada(o)]',
    lastDay: '[Ontem]',
    sameDay: '[Hoje às] H[h]mm',
    nextDay: '[Amanhã às] H[h]mm',
    nextWeek: 'dddd [às] H[h]mm',
    sameElse: 'D [de] MMMM [de] YYYY [(]dddd[)] [às] H[h]mm'
  }
})
moment.tz.setDefault('America/Sao_Paulo')

module.exports = {
  moment
}
