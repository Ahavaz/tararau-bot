import dayjs from './config/dayjs';

export const getSign = (date) => [
  // Aries
  {
    name: 'áries',
    symbol: `♈️`,
    range: [dayjs(`${date.year()}-03-21`), dayjs(`${date.year()}-04-20`)],
  },
  // Taurus
  {
    name: 'touro',
    symbol: `♉️`,
    range: [dayjs(`${date.year()}-04-21`), dayjs(`${date.year()}-05-20`)],
  },
  // Gemini
  {
    name: 'gêmeos',
    symbol: `♊️`,
    range: [dayjs(`${date.year()}-05-21`), dayjs(`${date.year()}-06-20`)],
  },
  // Cancer
  {
    name: 'câncer',
    symbol: `♋️`,
    range: [dayjs(`${date.year()}-06-21`), dayjs(`${date.year()}-07-21`)],
  },
  // Leo
  {
    name: 'leão',
    symbol: `♌️`,
    range: [dayjs(`${date.year()}-07-22`), dayjs(`${date.year()}-08-22`)],
  },
  // Virgo
  {
    name: 'virgem',
    symbol: `♍️`,
    range: [dayjs(`${date.year()}-08-23`), dayjs(`${date.year()}-09-22`)],
  },
  // Libra
  {
    name: 'libra',
    symbol: `♎️`,
    range: [dayjs(`${date.year()}-09-23`), dayjs(`${date.year()}-10-22`)],
  },
  // Scorpio
  {
    name: 'escorpião',
    symbol: `♏️`,
    range: [dayjs(`${date.year()}-10-23`), dayjs(`${date.year()}-11-21`)],
  },
  // Sagittarius
  {
    name: 'sagitário',
    symbol: `♐️`,
    range: [dayjs(`${date.year()}-11-22`), dayjs(`${date.year()}-12-21`)],
  },
  // Capricorn
  {
    name: 'capricórnio',
    symbol: `♑️`,
    range: [dayjs(`${date.year()}-12-22`), dayjs(`${date.year() + 1}-01-20`)],
  },
  // Aquarius
  {
    name: 'aquário',
    symbol: `♒️`,
    range: [dayjs(`${date.year()}-01-21`), dayjs(`${date.year()}-02-19`)],
  },
  // Pisces
  {
    name: 'peixes',
    symbol: `♓️`,
    range: [dayjs(`${date.year()}-02-20`), dayjs(`${date.year()}-03-20`)],
  },
];
