import consign from 'consign';
import cors from 'cors';
import express from 'express';

import { meetupsRoutes } from './routes/meetups.routes';
// import { usersRoutes } from './routes/users.routes';

global.answerCallbacks = {};

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/roles', meetupsRoutes);
// app.use('/tararaus', usersRoutes);

consign({ cwd: 'src', extensions: ['.ts'] })
  // .then('./routes')
  // .then('./config/routers.ts')
  .then('./cronJob.ts')
  .into(app);

app.listen(port, () => {
  console.log(
    `-----------------------------------------------------------------
Server is listening
Mode:         ${app.settings.env}
Base URL:     ${process.env.BASE_URL}
Port:         ${port}
Database URL: ${process.env.DATABASE_URL}
-----------------------------------------------------------------`,
  );
});
