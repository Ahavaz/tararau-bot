// import axios from './config/axios';
import dayjs from './config/dayjs';
import { outputMsgs } from './messages/output';
import { Meetup } from './models/Meetup';
import { User } from './models/User';
import { notification } from './msgOptions';
import { capitalize } from './utils/text';

const { bot } = global;

// Random generators
export const getRandomInt = (min = 2, max = 6): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomMsg = (array: string[]): string =>
  array[Math.floor(Math.random() * array.length)];

// Message builder
export const buildMsg = (array: string[]): string => {
  const msg = randomMsg(array);
  if (array === outputMsgs.tararau)
    return (
      msg.slice(0, 5) +
      msg.slice(5, 6).repeat(getRandomInt(1, 5)) +
      msg.slice(6)
    );
  if (array === outputMsgs.ayn)
    return msg
      .split('')
      .map((char) => char.repeat(getRandomInt(1, 2)))
      .join('');
  return msg.repeat(getRandomInt());
};

// Meetup functions
const filterMeetups = (chatId: string | number, meetups: Meetup[]) => {
  const filteredMeetups = meetups.reduce((array, meetup) => {
    const daysLeft = dayjs(meetup.date).diff(dayjs(), 's');

    if (daysLeft > 0) {
      array.push({ ...meetup, daysLeft });
    }
    // else {
    //   delete meetup.chatId;
    //   delete meetup.title;
    //   axios.post(`/roles/${chatId}`, meetup);
    // }

    return array;
  }, <Array<Meetup & { daysLeft: number }>>[]);

  const sortedMeetups = filteredMeetups.sort(
    (a, b) => dayjs(a.date).get('s') - dayjs(b.date).get('s'),
  );

  return sortedMeetups;
};

export const listMeetups = (
  chatId: string | number,
  meetups: Meetup[],
): string => {
  const filteredMeetups = filterMeetups(chatId, meetups);

  const formatedMeetups = filteredMeetups.map(
    (meetup) => `
➡️ *${meetup.title}*
Vai rolar ${dayjs(meetup.date).calendar().toLowerCase()} no(a) ${
      meetup.location
    }
_${capitalize(dayjs(meetup.date).fromNow())}${
      meetup.daysLeft < 1 ? '! 🚨' : ''
    }_
`,
  );

  const meetupsMessage = formatedMeetups.join('');

  return meetupsMessage;
};

// Seasons
const seasons = (isPlural = true) =>
  isPlural
    ? ['primaveras', 'verões', 'outonos', 'invernos']
    : ['primavera', 'verão', 'outono', 'inverno'];

// Birthday functions
const nextBirthday = (birthdate: dayjs.Dayjs) => {
  const date = birthdate.clone().year(dayjs().year());
  if (date.diff(dayjs(), 'days', true) < 0) date.add(1, 'years');
  return date;
};

const calcBirthday = (tararaus: (User & { birthdate: dayjs.Dayjs })[]) =>
  tararaus
    .map((tararau) => {
      const birthday = nextBirthday(tararau.birthdate);
      const daysLeft = birthday.diff(dayjs(), 'days');
      const age = dayjs().diff(tararau.birthdate, 'years') + 1;
      return { ...tararau, birthday, daysLeft, age };
    })
    .sort(
      (a, b) =>
        (a.birthday as unknown as number) - (b.birthday as unknown as number),
    );

export const listBirthdays = (
  tararaus: (User & { birthdate: dayjs.Dayjs })[],
): string[] =>
  calcBirthday(tararaus).map(
    (tararau) => `
${tararau.signSymbol} ${tararau.userName} vai completar ${tararau.age} ${
      tararau.age !== 1 ? randomMsg(seasons()) : randomMsg(seasons(false))
    } em ${tararau.birthday.format('DD/MM/YY')}
_${
      tararau.birthday.fromNow()[0].toUpperCase() +
      tararau.birthday.fromNow().slice(1)
    }${tararau.daysLeft < 1 ? '! 🎉' : ''}_
`,
  );

export const congratulate = (tararau: User): void => {
  const age = dayjs().diff(tararau.birthdate, 'years');
  bot.sendMessage(
    tararau.chatId,
    `*Parabéns* ${tararau.userName}!!! 🎉

Hoje você completa mais um ciclo de experiências e upa para o nível ${age}!
Aproveite o dia ao lado daqueles que são especiais para você!`,
    notification(),
  );
};
