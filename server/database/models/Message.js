/*
 * Package Import
 */
import mongoose from 'mongoose';

/*
 * Local Import
 */

/*
 * Schema `Message`
 */
const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Chat',
      required: [true, 'Chat _id is missing!'],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User _id is missing!'],
    },
    content: {
      type: String,
      required: [true, 'Content is missing!'],
    },
    reactions: {
      type: [
        {
          name: {
            type: String,
          },
          users: {
            type: [
              {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
              },
            ],
          },
        },
      ],
      default: [],
    },
  },
  {
    // Create fields `createdAt` and `updatedAt`
    timestamps: true,
  },
);

/*
 * Export
 */
export default mongoose.model('Message', MessageSchema);
