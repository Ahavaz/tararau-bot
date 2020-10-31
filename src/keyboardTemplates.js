const getNext = date => {
  date.add(1, 'days')
  return `${date.format('dddd')}
${date.format('[(]D/MMM/YY[)]')}`
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
  ['Caguei, vai ter rolê mais não!!']
]

const buildYesNoOptions = () => [['Sim', 'Não']]

module.exports = {
  buildDayOptions,
  buildYesNoOptions
}
