import { inputMsgs } from './messages/input';
import { outputMsgs } from './messages/output';
import { defaultKb } from './msgOptions';
import { randomMsg, getRandomInt, buildMsg } from './utils';

const { bot } = global;

export const msgMatches = (
  chatId: string | number,
  msgId: string | number,
  userMsg: string,
  userName: string,
): void => {
  const swearingsMatches = inputMsgs.swearings.filter((message) =>
    userMsg.includes(message),
  );
  const shitMatches = inputMsgs.shit.filter((message) =>
    userMsg.includes(message),
  );
  const goodMorningMatches = inputMsgs.goodMorning.filter((message) =>
    userMsg.startsWith(message),
  );
  const goodNightMatches = inputMsgs.goodNight.filter((message) =>
    userMsg.startsWith(message),
  );
  const loveMatches = inputMsgs.love.filter((message) =>
    userMsg.includes(message),
  );
  const hateMatches = inputMsgs.hate.filter((message) =>
    userMsg.includes(message),
  );
  const enfiaMatches = inputMsgs.enfia.filter((message) =>
    userMsg.includes(message),
  );
  const fodaMatches = inputMsgs.foda.filter((message) =>
    userMsg.includes(message),
  );

  if (swearingsMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.swearings), defaultKb(msgId));
  } else if (enfiaMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.enfia), defaultKb(msgId));
  } else if (fodaMatches.length !== 0) {
    bot.sendMessage(
      chatId,
      randomMsg(outputMsgs.foda(userName)),
      defaultKb(msgId),
    );
  } else if (inputMsgs.miou.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.miou), defaultKb(msgId));
  } else if (goodMorningMatches.length !== 0) {
    bot.sendMessage(
      chatId,
      randomMsg(outputMsgs.goodMorning(userName)),
      defaultKb(msgId),
    );
  } else if (goodNightMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.goodNight), defaultKb(msgId));
  } else if (loveMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.love), defaultKb(msgId));
  } else if (hateMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.hate), defaultKb(msgId));
  } else if (inputMsgs.amor.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.amor), defaultKb(msgId));
  } else if (inputMsgs.top.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.top), defaultKb(msgId));
  } else if (inputMsgs.ow.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.ow), defaultKb(msgId));
  } else if (inputMsgs.greeting.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.greeting), defaultKb(msgId));
  } else if (inputMsgs.farewell.test(userMsg)) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.farewell), defaultKb(msgId));
  } else if (shitMatches.length !== 0) {
    bot.sendMessage(chatId, randomMsg(outputMsgs.shit), defaultKb(msgId));
  } else if (inputMsgs.tararau.test(userMsg)) {
    bot.sendMessage(chatId, buildMsg(outputMsgs.tararau));
  } else if (inputMsgs.ayn.test(userMsg) && getRandomInt(1, 2) === 1) {
    bot.sendMessage(chatId, buildMsg(outputMsgs.ayn));
  } else if (inputMsgs.laugh.test(userMsg) && getRandomInt(1, 3) === 1) {
    bot.sendMessage(chatId, buildMsg(outputMsgs.laugh));
  }
};
