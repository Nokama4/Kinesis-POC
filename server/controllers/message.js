/* eslint-disable max-len */
/*
 * Package Import
 */
import status from 'http-status';

/*
 * Local Import
 */
import {
  createMessage,
  getMessage,
  getMessages,
  updateMessage,
} from '../database/repositories/Message.js';

/*
 * Create a new Message
 */
export const generateMessage = (req, res, next) => {
  createMessage(req.body)
    .then((message) => res.status(status.CREATED).json(message))
    .catch(next);
};

/*
 * Get a Message
 */
export const findMessage = (req, res, next) => {
  const { id } = req.params;

  getMessage({ _id: id })
    .then((message) => res.status(status.OK).json(message))
    .catch((error) => next(error));
};

/*
 * Get Messages
 */
export const findMessages = (req, res, next) => {
  const data = req.query;

  getMessages(data)
    .then((messages) => {
      const messagesIds = messages.map(({ _id }) => _id);
      const messageById = messages.reduce((acc, item) => {
        acc[item._id] = item;
        return acc
      }, {});
      res.status(status.OK).json(messages);
    })
    .catch(next);
};

/*
 * Update a Message
 */
export const setMessage = (req, res, next) => {
  const { param, newDatas } = req.body;

  updateMessage(param)(newDatas)
    .then((message) => res.status(status.OK).json(message))
    .catch(next);
};
