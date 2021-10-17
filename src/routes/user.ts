// import prisma from '../config/prisma';

// export default {
//   save: async (req, res) => {
//     const {
//       chatId,
//       userId,
//       userName,
//       userFullName,
//       signName,
//       signSymbol,
//       birthdate,
//     } = req.body;

//     console.log('POST request', {
//       chatId,
//       userId,
//       userName,
//       userFullName,
//       signName,
//       signSymbol,
//       birthdate,
//     });

//     try {
//       const user = await prisma.user.create({
//         data: {
//           chatId,
//           userId,
//           userName,
//           userFullName,
//           signName,
//           signSymbol,
//           birthdate,
//         },
//       });

//       res.status(204).json({ data: user });
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   },

//   get: async (req, res) => {
//     const params = { ...req.params };

//     console.log('GET request', params);

//     try {
//       const user = await prisma.user.findFirst({
//         where: { chatId: params.chat },
//       });

//       res.status(200).json({ data: user });
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   },

//   list: async (req, res) => {
//     const params = { ...req.params };
//     const today = new Date();
//     const month = today.getMonth() + 1;
//     const day = today.getDate();

//     console.log('GET request', params);

//     try {
//       const user = await prisma.user.findMany({
//         where: {
//           birthdate: today,
//           // project: {
//           // userId: 1,
//           // chatId: 1,
//           // userName: 1,
//           // userFullName: 1,
//           // signName: 1,
//           // signSymbol: 1,
//           // birthdate: 1,
//           // month: { $month: '$birthdate' },
//           // day: { $dayOfMonth: '$birthdate' },
//           // },
//         },
//         orderBy: {
//           birthdate: 'desc',
//         },
//       });

//       res.status(200).json({ date: user });
//     } catch (err) {
//       res.status(500).send({ error: err });
//     }
//   },
// };

export {};
