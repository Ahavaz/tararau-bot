import axios from '../../config/axios';
import dayjs from '../../config/dayjs';
import { buildDayOptions } from '../../keyboardTemplates';
import { customKb, defaultKb } from '../../msgOptions';
import {
  isValidTime,
  isFutureDate,
  parseTime,
  setTime,
} from '../../utils/date';

const { bot, answerCallbacks } = global;

bot.onText(/^\/role$/i, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const msgId = msg.message_id;
  const callbackId = `${chatId}:${userId}`;

  bot
    .sendMessage(
      chatId,
      'Quando vocês querem meter o loko?',
      customKb(msgId, buildDayOptions(dayjs())),
    )
    .then(() => {
      answerCallbacks[callbackId] = (answerRoleDate) => {
        const answerRoleDateId = answerRoleDate.message_id;

        if (answerRoleDate.text === 'Outra data') {
          bot
            .sendMessage(
              chatId,
              'Digite uma data futura (DD/MM/AAAA)',
              defaultKb(answerRoleDateId, true),
            )
            .then(() => {
              answerCallbacks[callbackId] = (answerAnotherDate) => {
                const answerAnotherDateId = answerAnotherDate.message_id;

                if (isFutureDate(answerAnotherDate.text)) {
                  const date = dayjs(answerAnotherDate.text, 'L', true);

                  bot
                    .sendMessage(
                      chatId,
                      `${date
                        .format('L [(]dddd[)]')
                        .toLowerCase()}, qual horário (HH:mm)?`,
                      defaultKb(answerAnotherDateId, true),
                    )
                    .then(() => {
                      answerCallbacks[callbackId] = (answerRoleTime) => {
                        const answerRoleTimeId = answerRoleTime.message_id;
                        const time = answerRoleTime.text;

                        if (isValidTime(time, date)) {
                          const { hour, minute } = parseTime(time);
                          const fullDate = setTime(date, hour, minute);

                          bot
                            .sendMessage(
                              chatId,
                              `Digite o local do rolê`,
                              defaultKb(answerRoleTimeId, true),
                            )
                            .then(() => {
                              answerCallbacks[callbackId] = (
                                answerRoleLocation,
                              ) => {
                                const answerRoleLocationId =
                                  answerRoleLocation.message_id;
                                const location = answerRoleLocation.text;

                                bot
                                  .sendMessage(
                                    chatId,
                                    `Agora, dê um nome tararau para o rolê!`,
                                    defaultKb(answerRoleLocationId, true),
                                  )
                                  .then(() => {
                                    answerCallbacks[callbackId] = (
                                      answerRoleTitle,
                                    ) => {
                                      const answerRoleTitleId =
                                        answerRoleTitle.message_id;
                                      const title = answerRoleTitle.text;
                                      const role = {
                                        userId,
                                        chatId,
                                        title,
                                        date: fullDate,
                                        location,
                                      };

                                      axios
                                        .post(`/roles/${chatId}`, role)
                                        .then(() => {
                                          bot.sendMessage(
                                            chatId,
                                            `Rolê *${
                                              role.title
                                            }* marcado para ${role.date
                                              .calendar()
                                              .toLowerCase()} no(a) _${
                                              role.location
                                            }_!`,
                                            defaultKb(answerRoleTitleId),
                                          );
                                        })
                                        .catch((e) => console.error(e));
                                    };
                                  });
                              };
                            });
                        } else {
                          bot.sendMessage(
                            chatId,
                            `⚠️ *Data inválida*

Escolha uma data futura e preste atenção no formato`,
                            defaultKb(answerRoleTimeId),
                          );
                        }
                      };
                    });
                } else {
                  bot.sendMessage(
                    chatId,
                    `⚠️ *Data inválida*

Escolha uma data futura e preste atenção no formato`,
                    defaultKb(answerAnotherDateId),
                  );
                }
              };
            });
        } else if (answerRoleDate.text === 'Caguei, vai ter rolê mais não!!') {
          bot.sendMessage(chatId, `Então tá 👋`, defaultKb(answerRoleDateId));
        } else if (
          dayjs(
            answerRoleDate.text.match(/d{1,2}[/-]d{1,2}[/-]d+/) &&
              answerRoleDate.text.split('\n')[1]?.slice(1, -1),
            'L',
            true,
          ).isValid()
        ) {
          const date = dayjs(
            answerRoleDate.text.split('\n')[1].slice(1, -1),
            'L',
            true,
          );

          bot
            .sendMessage(
              chatId,
              `${date
                .format('L [(]dddd[)]')
                .toLowerCase()}, qual horário (HH:mm)?`,

              defaultKb(answerRoleDateId, true),
            )
            .then(() => {
              answerCallbacks[callbackId] = (answerRoleTime) => {
                const answerRoleTimeId = answerRoleTime.message_id;
                const time = answerRoleTime.text;

                if (isValidTime(time, date)) {
                  const { hour, minute } = parseTime(time);
                  const fullDate = setTime(date, hour, minute);

                  bot
                    .sendMessage(
                      chatId,
                      `Digite o local do rolê`,
                      defaultKb(answerRoleTimeId, true),
                    )
                    .then(() => {
                      answerCallbacks[callbackId] = (answerRoleLocation) => {
                        const answerRoleLocationId =
                          answerRoleLocation.message_id;
                        const location = answerRoleLocation.text;

                        bot
                          .sendMessage(
                            chatId,
                            `Agora, dê um nome tararau para o rolê!`,
                            defaultKb(answerRoleLocationId, true),
                          )
                          .then(() => {
                            answerCallbacks[callbackId] = (answerRoleTitle) => {
                              const answerRoleTitleId =
                                answerRoleTitle.message_id;
                              const title = answerRoleTitle.text;
                              const role = {
                                userId,
                                chatId,
                                title,
                                date: fullDate,
                                location,
                              };

                              axios
                                .post(`/roles/${chatId}`, role)
                                .then(() => {
                                  bot.sendMessage(
                                    chatId,
                                    `Rolê *${
                                      role.title
                                    }* marcado para ${role.date
                                      .calendar()
                                      .toLowerCase()} no(a) _${
                                      role.location
                                    }_!`,
                                    defaultKb(answerRoleTitleId),
                                  );
                                })
                                .catch((e) => console.error(e));
                            };
                          });
                      };
                    });
                } else {
                  bot.sendMessage(
                    chatId,
                    `⚠️ *Data inválida*

Escolha uma data futura e preste atenção no formato`,
                    defaultKb(answerRoleTimeId),
                  );
                }
              };
            });
        } else if (!answerRoleDate.text.match(/d{1,2}[/-]d{1,2}[/-]d+/)) {
          bot.sendMessage(
            chatId,
            `Use os botões, dert 🙄`,
            defaultKb(answerRoleDateId),
          );
        }
      };
    });
});
