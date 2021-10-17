import { Meetup } from '.prisma/client';

import prisma from '../config/prisma';
import { Meetup as MeetupModel } from '../models/Meetup';

class MeetupsRepository {
  async create({ userId, chatId, title, date, location }: MeetupModel) {
    const meetup = await prisma.meetup.create({
      data: {
        title,
        date,
        location,
        chat: {
          connectOrCreate: {
            where: {
              id: chatId,
            },
            create: {
              id: chatId,
              users: {
                connectOrCreate: [
                  {
                    where: {
                      id: userId,
                    },
                    create: {
                      id: userId,
                    },
                  },
                ],
              },
            },
          },
        },
      },
    });

    return meetup;
  }

  async list({ chatId }: { chatId: number }): Promise<Meetup[]> {
    const meetups = await prisma.meetup.findMany({
      where: { chatId },
    });

    return meetups;
  }
}

export { MeetupsRepository };
