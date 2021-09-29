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
  getUser,
  getUsers,
} from '../database/repositories/User.js';

/*
 * Get a User
 */
export const findUser = (req, res, next) => {
  const data = req.params;

  getUser({ _id: data.id })
    .then((user) => {
      const userFormat = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        name: `${user.firstname} ${user.lastname}`,
        avatar: user.avatar,
      };

      res.status(status.OK).json(userFormat);
    })
    .catch(next);
};

/*
 * Get Users
 */
export const findUsers = (req, res, next) => {
  const data = req.query;
  getUsers(data)
    .then((users) => {
      // Format data
      const usersIds = users.map(({ _id }) => _id);
      const userById = users.reduce((acc, item) => {
        acc[item._id] = item;
        return acc
      }, {});

      res.status(status.OK).send({ usersIds, userById });
    })
    .catch(next);
};
