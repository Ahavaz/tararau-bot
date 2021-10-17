import { Chat } from './Chat';

export type Meetup = {
  id?: number;
  createdAt?: Date;
  title: string;
  date: Date;
  location: string;
  chat?: Chat;
  chatId?: number;
  userId?: number;
};
