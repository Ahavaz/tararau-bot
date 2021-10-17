import TelegramBot from 'node-telegram-bot-api';

declare global {
  namespace NodeJS {
    interface Global {
      bot: TelegramBot;
      answerCallbacks: AnswerCallbacks;
    }

    interface AnswerCallbacks {
      [index: string]: Callback;
    }

    type Callback = (message: TelegramBot.Message) => void;
  }
}

export {};
