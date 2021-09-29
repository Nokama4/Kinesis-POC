/*
 * Package Import
 */
import { Router } from 'express';

/*
 * Local Import
 */
import { findChat, findChats } from '../controllers/chat.js'
import { findUser, findUsers } from '../controllers/user.js'
import { findMessage, findMessages } from '../controllers/message.js'

/*
 * Init
 */
const apiRoutes = Router();
const chatRoutes = new Router();
const userRoutes = new Router();
const messageRoutes = new Router();

/*
 * Routes
 */
export default (app) => {
  /*
   * Init
   */
  app.use('/api', apiRoutes);

  /*
   * Api Routes
   */
  apiRoutes.use('/chats', chatRoutes);
  apiRoutes.use('/users', userRoutes);
  apiRoutes.use('/messages', userRoutes);

  /*
   * Chat Routes
   */
  chatRoutes.get('/find/:id', findChat);
  chatRoutes.get('/find', findChats);

  /*
   * User Routes
   */
  userRoutes.get('/find/:id', findUser);
  userRoutes.get('/find', findUsers);

  /*
   * Message Routes
   */
  messageRoutes.get('/find/:id', findMessage);
  messageRoutes.get('/find', findMessages);

};
