/*
 * Package Import
 */
import mongoose from 'mongoose';

/*
 * Local Import
 */
import CHATS from '../../constants/chats.js';

/*
 * Enum
 */
export const ChatTypes = Object.freeze({
  General: CHATS.GENERAL,
  Private: CHATS.PRIVATE,
  Group: CHATS.GROUP,
});

/*
 * Schema `Chat`
 */
const ChatSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      enum: Object.values(ChatTypes),
      default() {
        return this.usersIds.length > 2 ? CHATS.GENERAL : CHATS.PRIVATE;
      },
      required: [true, 'chat kind is missing'],
    },
    unread: {
      type: Number,
      default: 0,
    },
    usersIds: {
      type: Array,
      default(val) {
        return !val && [];
      },
      validate(val) {
        if (this.kind === CHATS.GENERAL) {
          return true;
        }
        return val.length === 2;
      },
    },
    deactivatedAt: {
      type: Date,
    },
  },
  { minimize: false },
  {
    // Create fields `createdAt` and `updatedAt`
    timestamps: true,
  },
);

/*
 * Statics
 */
Object.assign(ChatSchema.statics, {
  ChatTypes,
});

/*
 * Export
 */
export default mongoose.model('Chat', ChatSchema);
