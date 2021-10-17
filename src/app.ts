import './config/telegram';
import './server';

import TelegramBot from 'node-telegram-bot-api';

import { getBirthdate } from './commands/bday';
import axios from './config/axios';
import dayjs from './config/dayjs';
import { msgMatches } from './msgMatches';
import { defaultKb } from './msgOptions';
import { listBirthdays } from './utils';
import './commands/role';
import './commands/roles';
// import './commands/bday';

process.env.NTBA_FIX_319 = '1';

const { bot, answerCallbacks } = global;

// const maps = `https://maps.googleapis.com/maps/api/geocode/json?${parameters}&key=${process.env.GOOGLE_API_KEY}`;
// const places = [];

function cleanCallback(
  answerCallbacks: NodeJS.AnswerCallbacks,
  callbackId: string,
  message: TelegramBot.Message,
) {
  const callback = answerCallbacks[callbackId];

  if (callback) {
    delete answerCallbacks[callbackId];
    return callback(message);
  }
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const msgId = msg.message_id;
  const userMsg = msg.text?.toLowerCase();
  const userFirstName = msg.from.first_name;
  const userName = `[${userFirstName}](tg://user?id=${userId})`;
  const callbackId = `${chatId}:${userId}`;

  cleanCallback(answerCallbacks, callbackId, msg);

  if (userMsg && !userMsg.startsWith('/')) {
    msgMatches(chatId, msgId, userMsg, userName);
  }

  return true;
});

bot.onText(/^\/bday$/i, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const msgId = msg.message_id;
  const callbackId = `${chatId}:${userId}`;
  const userFullName = `${msg.from.first_name} ${
    msg.from.last_name || ''
  }`.trim();
  const userName = `[${userFullName}](tg://user?id=${userId})`;
  const { data } = await axios.get(`/tararaus/${chatId}`);
  const tararaus = data;

  if (
    tararaus.filter(
      (tararau) => tararau.userId === userId && tararau.chatId === chatId,
    ).length
  ) {
    bot.sendMessage(
      chatId,
      'Você já registrou sua data de nascimento ⚠️',
      defaultKb(msgId),
    );
  } else {
    getBirthdate(callbackId, chatId, userId, msgId, userFullName, userName);
  }
});

bot.onText(/^\/bdays$/i, async (msg) => {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;
  const { data } = await axios.get(`/tararaus/${chatId}`);
  const tararaus = data.map((tararau) => ({
    ...tararau,
    birthdate: dayjs(tararau.birthdate),
  }));

  bot.sendMessage(
    chatId,
    tararaus.length
      ? `*Próximos Aniversariantes* 🎂
${listBirthdays(tararaus).join('')}`
      : `Nenhuma data de nascimento foi registrada ainda 🙁

Envie o comando /bday para registrar a sua!`,
    defaultKb(msgId),
  );
});

bot.onText(/^\/clear$/i, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Teclado aniquilado com sucesso',
    defaultKb(msg.message_id),
  );
});

bot.onText(/^\/(help$|$)/i, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Posso te ajudar a marcar rolês, registrar a data de nascimento da galera e te lembrar dos próximos rolês e aniversariantes.

Você pode fazer isso enviando os seguintes comandos:

/role - marque o rolê com a galera 😎
/roles - veja os próximos rolês do grupo 🍻
/bday - registre sua data de nascimento para o pessoal não deixar seu níver passar em branco 🎉
/bdays - liste os próximos aniversariantes registrados 🎂`,
    defaultKb(msg.message_id),
  );
});

bot.onText(
  /^\/(?!(role|roles|bday|bdays|clear|help|start|stop)$).+/i,
  (msg) => {
    bot.sendMessage(
      msg.chat.id,
      'Este comando _non ecziste_!',
      defaultKb(msg.message_id),
    );
  },
);

bot.on('polling_error', (err) => {
  console.error(err);
});
