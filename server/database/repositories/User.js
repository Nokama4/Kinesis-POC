/*
 * Package Import
 */
import status from 'http-status';

/*
 * Local Import
 */
import APIError from '../../utils/APIError.js';
import User from '../models/User.js';

/**
 * Generate a new User
 * @param {Object} data - {
 * lastname*,
 * firstname*,
 * avatar }
 * @return {Promise<User, APIError>}
 */
export const createUser = (data) =>
  new Promise((resolve, reject) => {
    // ⚠️ No spread to avoid injection
    const userData = {
      lastname: data.lastname,
      firstname: data.firstname,
    };

    // Save
    new User(userData).save((error, user) => {
      if (error) {
        // If the `user` already exist in database
        if (error.code === 11000) {
          return reject(new APIError('user_already_exists', status.CONFLICT));
        }

        // Or, if an other error occurred
        return reject(
          new APIError('create_user_error_occurred', status.CONFLICT),
        );
      }

      // Otherwise, it's okay ✅
      return resolve(user);
    });
  });

/**
 * Get an User
 * @param {Object} param - { _id: 123 }
 * @return {Promise<User, APIError>}
 */
export const getUser = (param) =>
  new Promise((resolve, reject) => {
    User.findOne(param, (error, user) => {
      // If the user is not found, or if we have an error
      if (error || !user) {
        return reject(new APIError('user_not_found', status.NOT_FOUND));
      }

      // Otherwise, all is ok
      return resolve(user);
    });
  });

/**
 * Get Users from any data
 * @param {Object} param -
 *    {} => Get all users
 *    { firstname: "Nani" } => Get users whose firstname is "Nani"
 * @return {Promise<Users, APIError>}
 */
export const getUsers = (param) =>
  new Promise((resolve, reject) => {
    User.find(param, (error, users) => {
      // If users are not found, or if we have an error
      if (error || !users) {
        return reject(new APIError('list_users_not_found', status.NOT_FOUND));
      }
      // Otherwise, all is ok
      return resolve(users);
    });
  });

/**
 * Update an User with new data
 * @param {Object} param - { _id: 123 }
 * @param {Object} newData - { firstname, lastname }
 * @return {Promise<User, APIError>}
 */
export const updateUser = (param) => (newData) =>
  new Promise((resolve, reject) => {
    return User.findOneAndUpdate(
      param,
      { $set: newData },
      { new: true },
      (error, user) => {
        // If we have an error
        if (error || !user) {
          return reject(new APIError('update_user_failed', status.BAD_REQUEST));
        }
        return resolve(user);
      },
    );
  });



/**
 * Delete a User
 * @param {Object} param - { _id: 123 }
 * @return {Promise<(), APIError>}
 */
export const deleteUser = (param) =>
  new Promise((resolve, reject) => {
    User.findOneAndRemove(param, (error, user) => {
      // If we have an error
      if (error || !user) {
        return reject(new APIError('delete_user_failed', status.BAD_REQUEST));
      }

      return resolve(user);
    });
  });

/**
 * Deactive a User
 * @param {Object} param - { _id: 123 }
 * @param {Date} deactiveDate
 * @return {Promise<User, APIError>}
 */
export const deactiveUser = (param, deactiveDate) =>
  updateUser(param)({ deactivatedAt: deactiveDate });

/**
 * Reactivate a User
 * @param {Object} param - { _id: 123 }
 * @return {Promise<User, APIError>}
 */
export const resumeUser = (param) =>
  removePropertyFromUser(param)({ deactivatedAt: '' });
