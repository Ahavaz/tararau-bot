import { SendMessageOptions, KeyboardButton } from 'node-telegram-bot-api';

export const customKb = (
  msgId: string | number,
  customKeyboard: KeyboardButton[][],
): SendMessageOptions => ({
  reply_to_message_id: Number(msgId),
  parse_mode: 'Markdown',
  reply_markup: {
    keyboard: customKeyboard,
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
    selective: true,
  },
});

export const defaultKb = (
  msgId: string | number,
  isReply = false,
): SendMessageOptions => ({
  reply_to_message_id: Number(msgId),
  parse_mode: 'Markdown',
  reply_markup: {
    remove_keyboard: true,
    force_reply: isReply,
    selective: true,
  },
});

export const notification = (): SendMessageOptions => ({
  parse_mode: 'Markdown',
  reply_markup: {
    remove_keyboard: true,
  },
});
