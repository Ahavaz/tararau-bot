import { Meetup } from '.prisma/client';

import axios from '../../config/axios';
import { defaultKb } from '../../msgOptions';
import { listMeetups } from '../../utils';

const { bot } = global;

bot.onText(/^\/roles$/i, async (msg) => {
  const chatId = msg.chat.id;
  const msgId = msg.message_id;
  const { data: meetups }: { data: Meetup[] } = await axios.get(
    `/roles/${chatId}`,
  );

  bot.sendMessage(
    chatId,
    meetups.length
      ? `*Próximos Rolês* 🍻
  ${listMeetups(chatId, meetups)}`
      : `Nenhum rolê foi marcado ainda 🙁

  Envie o comando /role para marcar o próximo!`,
    defaultKb(msgId),
  );
});
