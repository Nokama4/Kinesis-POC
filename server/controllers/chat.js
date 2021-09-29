/* eslint-disable consistent-return */
/*
 * Package Import
 */
import status from 'http-status';
import mongoose from 'mongoose';

/*
 * Local Import
 */
import {
  getChat,
  getChats,
} from '../database/repositories/Chat.js';

/*
 * Get a Chat
 */
export const findChat = (req, res, next) => {
  const data = req.params;

  getChat({ _id: data.id })
    .then((chat) => {

      res.status(status.OK).json(chat);
    })
    .catch(next);
};

/*
 * Get Chats
 */
export const findChats = (req, res, next) => {
  const data = req.query;
  getChats(data)
    .then((chats) => {
      // Format data
      const chatsIds = chats.map(({ _id }) => _id);
      const chatById = chats.reduce((acc, item) => {
        acc[item._id] = item;
        return acc
      }, {});

      res.status(status.OK).send({ chatsIds, chatById });
    })
    .catch(next);
};
