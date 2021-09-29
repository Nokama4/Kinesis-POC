/*
 * Package Import
 */
import mongoose from 'mongoose';

/*
 * Local Import
 */

/*
 * Schema `User`
 */
const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is missing!'],
    },
    firstname: {
      type: String,
      required: [true, 'Firstname is missing!'],
    },
    connected: {
      type: Boolean,
      default: false,
    },
    away: {
      type: Boolean,
      default: false,
    },
    deactivatedAt: {
      type: Date,
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
export default mongoose.model('User', UserSchema);
