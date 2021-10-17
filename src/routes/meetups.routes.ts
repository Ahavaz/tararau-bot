import { Router } from 'express';

import { Meetup as MeetupModel } from '../models/Meetup';
import { MeetupsRepository } from '../repositories/MeetupsRepository';

const meetupsRoutes = Router();
const meetupsRepository = new MeetupsRepository();

meetupsRoutes.post('/:chat', async (req, res) => {
  const { userId, chatId, date, location, title }: MeetupModel = req.body;

  try {
    if (chatId && title) {
      const meetup = await meetupsRepository.create({
        userId,
        chatId,
        title,
        date,
        location,
      });

      res.status(201).json(meetup);
    } else {
      res.status(400).json({
        message: 'Request missing `chatId` and/or `title`',
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

meetupsRoutes.get('/:chat', async (req, res) => {
  const { chat }: { chat: string } = req.params;

  try {
    const meetups = await meetupsRepository.list({ chatId: Number(chat) });

    res.json(meetups);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export { meetupsRoutes };
