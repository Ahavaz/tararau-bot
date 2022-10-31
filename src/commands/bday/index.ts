import axios from '../../config/axios';
import dayjs from '../../config/dayjs';
import { buildYesNoOptions } from '../../keyboardTemplates';
import { customKb, defaultKb } from '../../msgOptions';
import { getSign } from '../../signs';
import { isValidDate } from '../../utils/date';

const { bot, answerCallbacks } = global;

const tryAgain = (
  callbackId: string | number,
  chatId: string | number,
  userId: string | number,
  userFullName: string,
  userName: string,
): void => {
  answerCallbacks[callbackId] = async (answerConfirmation) => {
    const answerConfirmationId = answerConfirmation.message_id;
    const answerConfirmationMsg = answerConfirmation.text
      ? answerConfirmation.text.toLowerCase()
      : '';

    if (answerConfirmationMsg === 'sim' || answerConfirmationMsg === 's') {
      getBirthdate(
        callbackId,
        chatId,
        userId,
        answerConfirmationId,
        userFullName,
        userName,
      );
    } else if (
      answerConfirmationMsg === 'não' ||
      answerConfirmationMsg === 'nao' ||
      answerConfirmationMsg === 'n'
    ) {
      bot.sendMessage(
        chatId,
        'Processo cancelado...',
        defaultKb(answerConfirmationId),
      );
    } else {
      await bot.sendMessage(
        chatId,
        `🤔 Não entendi, tente novamente.`,
        customKb(answerConfirmationId, buildYesNoOptions()),
      );
      tryAgain(callbackId, chatId, userId, userFullName, userName);
    }
  };
};

const confirmedBirthdate = (
  callbackId: string | number,
  chatId: string | number,
  userId: string | number,
  userFullName: string,
  userName: string,
  date: dayjs.Dayjs,
): void => {
  answerCallbacks[callbackId] = async (answerConfirmation) => {
    const answerConfirmationId = answerConfirmation.message_id;
    const answerConfirmationMsg = answerConfirmation.text
      ? answerConfirmation.text.toLowerCase()
      : '';

    if (answerConfirmationMsg === 'sim' || answerConfirmationMsg === 's') {
      const sign = getSign(date).filter(({ range }) =>
        date.isBetween(range[0], range[1], null, '[]'),
      )[0];
      const tararau = {
        chatId,
        userId,
        userName,
        userFullName,
        signName: sign.name,
        signSymbol: sign.symbol,
        birthdate: date,
      };

      console.log(
        `Salvando tararau ${JSON.stringify(tararau)}... /tararaus/${chatId}`,
      );

      axios
        .post(`/tararaus/${chatId}`, tararau)
        .then(() => {
          bot.sendMessage(
            chatId,
            `Data registrada com sucesso... não sabia que seu signo era ${sign.name} ${sign.symbol}`,
            defaultKb(answerConfirmationId),
          );
        })
        .catch((e) => console.error(e));
    } else if (
      answerConfirmationMsg === 'não' ||
      answerConfirmationMsg === 'nao' ||
      answerConfirmationMsg === 'n'
    ) {
      getBirthdate(
        callbackId,
        chatId,
        userId,
        answerConfirmationId,
        userFullName,
        userName,
      );
    } else {
      await bot.sendMessage(
        chatId,
        '🤔 Não entendi, gostaria de tentar novamente?',
        customKb(answerConfirmationId, buildYesNoOptions()),
      );
      tryAgain(callbackId, chatId, userId, userFullName, userName);
    }
  };
};

const receivedBirthdate = (
  callbackId: string | number,
  chatId: string | number,
  userId: string | number,
  userFullName: string,
  userName: string,
): void => {
  answerCallbacks[callbackId] = async (answerBirthdate) => {
    const answerBirthdateId = answerBirthdate.message_id;

    if (isValidDate(answerBirthdate.text)) {
      const date = dayjs(answerBirthdate.text, 'D/M/YYYY');

      await bot.sendMessage(
        chatId,
        `Você nasceu dia ${date
          .format('D [de] MMMM [de] YYYY [(]dddd[)]')
          .toLowerCase()}?`,
        customKb(answerBirthdateId, buildYesNoOptions()),
      );
      confirmedBirthdate(
        callbackId,
        chatId,
        userId,
        userFullName,
        userName,
        date,
      );
    } else {
      await bot.sendMessage(
        chatId,
        `⚠️ *Data inválida*
Preste atenção no formato.

Gostaria de tentar novamente?`,
        customKb(answerBirthdateId, buildYesNoOptions()),
      );
      tryAgain(callbackId, chatId, userId, userFullName, userName);
    }
  };
};

export const getBirthdate = async (
  callbackId: string | number,
  chatId: string | number,
  userId: string | number,
  msgId: string | number,
  userFullName: string,
  userName: string,
): Promise<void> => {
  await bot.sendMessage(
    chatId,
    `Por gentileza, insira sua data (DD/MM/AAAA) de nascimento 🙂`,
    defaultKb(msgId, true),
  );
  receivedBirthdate(callbackId, chatId, userId, userFullName, userName);
};
