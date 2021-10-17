import { Meetup } from './Meetup';
import { User } from './User';

export type Chat = {
  id?: number;
  createdAt?: Date;
  users: User[];
  meetups: Meetup[];
};
