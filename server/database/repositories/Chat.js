/*
 * Package Import
 */
import status from 'http-status';
import mongoose from 'mongoose';

/*
 * Local Import
 */
import APIError from '../../utils/APIError.js';
import Chat from '../models/Chat.js';

/**
 * Generate a new Chat
 * @param {Object} data - { usersIds, type }
 * @return {Promise<Chat, APIError>}
 */
export const createChat = (data) =>
  new Promise((resolve, reject) => {
    // ⚠️ No spread to avoid injection
    const usersIdsExists = typeof data.usersIds !== 'undefined';
    const chatData = {
      kind: data.kind,
      ...(usersIdsExists && {
        usersIds: data.usersIds.map((id) => mongoose.Types.ObjectId(id)),
      }),
    };

    // Save
    new Chat(chatData).save((error, chat) => {
      if (error) {
        // If the `chat` already exist in database
        if (error.code === 11000) {
          return reject(new APIError('chat_already_exists', status.CONFLICT));
        }

        // Or, if an other error occurred
        return reject(
          new APIError('create_chat_error_occurred', status.CONFLICT),
        );
      }
      // Otherwise, it's okay ✅
      return resolve(chat);
    });
  });

/**
 * Get a Chat
 * @param {Object} param - { _id: 123 }
 * @return {Promise<Chat, APIError>}
 */
export const getChat = (param) =>
  new Promise((resolve, reject) => {
    Chat.findOne(param, (error, chat) => {
      // If the chat is not found, or if we have an error.
      if (error || !chat) {
        return reject(new APIError('chat_not_found', status.NOT_FOUND));
      }

      // Otherwise, all is ok
      return resolve(chat);
    });
  });

/**
 * Get Chats from any data
 * @param {Object} param - {}
 * @return {Promise<Chats, APIError>}
 */
export const getChats = (param) =>
  new Promise((resolve, reject) => {
    Chat.find(param, (error, chats) => {
      // If chats are not found, or if we have an error
      if (error || !chats) {
        return reject(new APIError('list_chats_not_found', status.NOT_FOUND));
      }

      // Otherwise, all is ok
      return resolve(chats);
    });
  });

/**
 * Get a Chat by userId
 * @param {Object} param - { userId: 123 }
 * @return {Promise<Chat, APIError>}
 */
export const getChatByUserId = ({ userId }) =>
  getChats({
    usersIds: { $in: [mongoose.Types.ObjectId(userId)] },
    kind: 'private',
  });

/**
 * Update a Chat with new data
 * @param {Object} param - { _id: 123 }
 * @param {Object} newData - New data - { type, usersIds }
 * @return {Promise<Chat, APIError>}
 */
export const updateChat = (param) => (newData) =>
  new Promise((resolve, reject) => {
    Chat.findOneAndUpdate(param, newData, { new: true }, (error, chat) => {
      // If we have an error
      if (error || !chat) {
        return reject(new APIError('update_chat_failed', status.BAD_REQUEST));
      }

      return resolve(chat);
    });
  });
