import { Dayjs } from 'dayjs';
import { KeyboardButton } from 'node-telegram-bot-api';

const getNext = (date: Dayjs, days: number) => {
  const newDate = date.add(days, 'd');
  return `${newDate.format('dddd')}
${newDate.format('[(]L[)]')}`;
};

export const buildDayOptions = (date: Dayjs): KeyboardButton[][] => [
  [
    {
      text: `Hoje
(${date.format('L')})`,
    },
    {
      text: `Amanhã
(${date.add(1, 'd').format('L')})`,
    },
  ],
  [{ text: `${getNext(date, 2)}` }, { text: `${getNext(date, 3)}` }],
  [{ text: `${getNext(date, 4)}` }, { text: `${getNext(date, 5)}` }],
  [{ text: `${getNext(date, 6)}` }, { text: 'Outra data' }],
  [{ text: 'Caguei, vai ter rolê mais não!!' }],
];

export const buildYesNoOptions = (): KeyboardButton[][] => [
  [{ text: 'Sim' }, { text: 'Não' }],
];
