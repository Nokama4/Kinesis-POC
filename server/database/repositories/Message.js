/*
 * Package Import
 */
import status from 'http-status';
import mongoose from 'mongoose';

/*
 * Local Import
 */
 import APIError from '../../utils/APIError.js';
import Message from '../models/Message.js';

/**
 * Generate a new Message
 * @param {Object} data - { chatId, userId, content }
 * @return {Promise<Message, APIError>}
 */
export const createMessage = (data) =>
  new Promise((resolve, reject) => {
    // ⚠️ No spread to avoid injection
    const messageData = {
      userId: mongoose.Types.ObjectId(data.userId),
      chatId: mongoose.Types.ObjectId(data.chatId),
      content: data.content,
    };

    // save message schema
    const newMessage = new Message(messageData);

    // Save
    newMessage.save((error, message) => {
      if (error) {
        // If the `message` already exist in database
        if (error.code === 11000) {
          return reject(
            new APIError('message_already_exists', status.CONFLICT),
          );
        }

        // Or, if an other error occurred
        return reject(
          new APIError('create_message_error_occurred', status.CONFLICT),
        );
      }

      // Otherwise, it's okay ✅
      return resolve(message);
    });
  });

/**
 * Get a Message
 * @param {Object} param - { _id: 123 }
 * @return {Promise<Message, APIError>}
 */
export const getMessage = (param) =>
  new Promise((resolve, reject) => {
    Message.findOne(param, (error, message) => {
      // If the message is not found, or if we have an error
      if (error || !message) {
        return reject(new APIError('message_not_found', status.NOT_FOUND));
      }

      // Otherwise, all is ok
      return resolve(message);
    });
  });

/**
 * Get Messages from any data.
 * @param {Object} param - {}
 * @return {Promise<Messages, APIError>}
 */
export const getMessages = (param, limit) =>
  new Promise((resolve, reject) => {
    Message.find(param, (error, messages) => {
      // If messages are not found, or if we have an error
      if (error || !messages) {
        return reject(
          new APIError('list_messages_not_found', status.NOT_FOUND),
        );
      }

      // Otherwise, all is ok
      return resolve(messages);
    })
      .sort({ createdAt: -1 })
      .limit(limit);
  });


/**
 * Update a Message with new data
 * @param {Object} param - { _id: 123 }
 * @param {Object} newData - New data - { userId, type, content, reactions }
 * @return {Promise<Message, APIError>}
 */
export const updateMessage = (param) => (newData) =>
  new Promise((resolve, reject) => {
    Message.findOneAndUpdate(
      param,
      newData,
      { new: true },
      (error, message) => {
        // If we have an error
        if (error || !message) {
          return reject(
            new APIError('update_message_failed', status.BAD_REQUEST),
          );
        }

        return resolve(message);
      },
    );
  });


/**
 * Delete a Message
 * @param {Object} param - { _id: 123 }
 * @return {Promise<(), APIError>}
 */
export const deleteMessage = (param) =>
  new Promise((resolve, reject) => {
    Message.deleteOne(param, (error, message) => {
      // If we have an error
      if (error || message.n === 0) {
        return reject(
          new APIError('delete_message_failed', status.BAD_REQUEST),
        );
      }

      return resolve(message);
    });
  });
