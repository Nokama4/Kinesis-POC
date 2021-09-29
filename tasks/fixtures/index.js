/* eslint-disable no-console */
/*
 * Package Import
 */
import config from 'config';
import mongoose from 'mongoose';

/*
 * Local Import
 */
import { createData } from './createData.js';

/*
 * Init
 */
const { options, uri } = config.get('Database');

/*
 * Code
 */
const init = async () => {
  try {
    // Connect to the Database
    await mongoose.connect(uri, options);

    // Drop the database before load fixtures
    await mongoose.connection.db.dropDatabase();

    // Launch the fixture task
    await createData();

    // It's a success !
    console.log('Fixtures were successfully created');
  }
  catch (error) {
    // It's a fail
    console.log(error);
  }

  // Stop the process
  process.exit(0);
};

/*
 * Init
 */
init();
