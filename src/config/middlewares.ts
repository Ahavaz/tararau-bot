import cors from 'cors';
import express, { Express } from 'express';

module.exports = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};
