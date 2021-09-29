/*
 * Package Import
 */
import express from 'express';
import bodyParser from 'body-parser';

/*
 * Local Import
 */
import routes from './routes/index.js';
import initializeDatabase from './database/index.js';

/*
 * Init
 */
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Routes
 */
routes(app);

/*
 * Server • Node.js
 */
app.listen(port, () => console.log(`Listening on port ${port}`));

/*
 * Initialize the Database
 */
initializeDatabase();
