/*
 * Package Import
 */
import config from 'config';
import mongoose from 'mongoose';

/*
 * Local Import
 */

/*
 * Init
 */

// Mongoose
const { options, uri } = config.get('Database');

// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise;

/*
 * Database Mongoose
 */
const connectDatabase = () => {
  // Create the database connection
  mongoose.connect(uri, options);

  // Event : {Open}
  mongoose.connection.once('open', () => {
    console.log(`🤖  MongoDB is running to URI ${uri}`);
  });

  // Event : {Disconnected}
  mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB is disconnected');
  });

  // Event : {Reconnected}
  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB is reconnected');
  });

  // Event : {Error}
  mongoose.connection.on('error', (error) => {
    console.error('🚫  Impossible to connect at the Database.');
    if (
      error.message
      && error.message.match(/failed to connect to server .* on first connect/)
    ) {
      console.error(`🚫  Error: ${error}`);
      console.error('Please check if your MongoDB is correctly connected');
      console.error('Retrying first connect in 30 seconds');

      // Wait for a bit,
      setTimeout(() => {
        // Try to connect again
        console.log('Retrying first connect...');
        mongoose.connect(uri, options).catch(() => {});
      }, 30000);
    }
    else {
      // Some other error occurred, console.log it
      console.error(`🚫  Error: ${error}`);
    }
  });
};

/*
 * Export
 */
export default connectDatabase;
