import prisma from '../config/prisma';

export default {
  save: async (req, res) => {
    console.log('POST request', req.body);

    const { chatId, title, date, location } = req.body;

    try {
      if (chatId && title) {
        const meetup = await prisma.meetup.create({
          data: {
            chatId,
            title,
            date,
            location,
          },
        });

        res.status(201).json({ data: meetup });
      } else {
        res.status(400).json({
          message: 'Request missing `chatId` and `title`',
        });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }

    // return chatId && title
    //   ? role
    //       .save()
    //       .then(() => res.status(204).send())
    //       .catch((err) => res.status(500).send(err))
    //   : Role.deleteOne({ date: role.date, location: role.location })
    //       .then(() => res.status(204).send())
    //       .catch((err) => res.status(500).send(err));
  },

  get: async (req, res) => {
    const { params } = req;

    console.log('GET request', params);

    try {
      const meetups = await prisma.meetup.findMany({
        where: { chatId: params.chat },
      });

      res.json(meetups);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
