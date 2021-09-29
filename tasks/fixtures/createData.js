/* eslint-disable no-console */
/*
 * Local Import
 */
import { createUser, updateUser } from '../../server/database/repositories/User.js';
import { createChat, updateChat } from '../../server/database/repositories/Chat.js';
// import { createMessage } from 'server/database/repositories/Message';

// Helpers
import CHATS from '../../server/constants/chats.js';
import * as data from './data.js';

/**
 * Create new messages fixture
 * @param  {Array}  users
 * @param  {String}  chatId
 * @return {Promise}
 */
// const newMessages = async ({ users, chatId }) => {
//   try {
//     const messages = await Promise.all(
//       data.messages.map((message) => {
//         const randomIndex = getRandomIndex(users.length - 1);
//
//         return createMessage({
//           userId: users[randomIndex],
//           chatId,
//           ...message,
//         });
//       }),
//     );
//
//     return messages;
//   }
//   catch (error) {
//     throw new Error(error);
//   }
// };

/**
 * Create fixtures
 * { Users, Chats, Messages }
 */
export const createData = async () => {
  try {

    const generalChat = await createChat({
      kind: CHATS.GENERAL,
    });

    /*
     * Create users
     */
    const users = await Promise.all(
      data
        .getUsers()
        .map((user) => createUser(user)),
    );

    const usersIds = await Promise.all(
      users.map(async ({ _id }) => {
        await updateUser({ _id })({
          avatar: `https://i.pravatar.cc/150?u=${_id}`,
        });
        return _id;
      }),
    );

    // Hydrate usersIds of general chat
    await updateChat({ _id: generalChat._id })({ usersIds });

    /*
     * Create messages on private chats
     */
    // await Promise.all(
    //   chats.map((chat) =>
    //     newMessages({
    //       users: chat.usersIds,
    //       chatId: chat._id,
    //     }),
    //   ),
    // );

    /*
     * Create messages on general chat
     */
    // await newMessages({ users: usersIds, chatId: generalChat._id });

    const formatedUsers = users.map((user) => ({
      firstname: user.firstname,
      lastname: user.lastname,
    }));

    console.table(formatedUsers);
  }
  catch (err) {
    throw new Error(err);
  }
};
