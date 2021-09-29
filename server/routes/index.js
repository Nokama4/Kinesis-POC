/*
 * Package Import
 */
import express from 'express';

/*
 * Local Import
 */

// Routes


/*
 * Init
 */

// Routers
const apiRoutes = express.Router();

/*
 * Routes
 */
export default (app) => {
  /*
   * Init
   */
  app.use('/api', apiRoutes);

  /*
   * Api Routes
   */
  apiRoutes.get('/chats', () => console.log('chats route'));
  apiRoutes.get('/users', () => console.log('users route'));

};
