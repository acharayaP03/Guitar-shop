
const express = require('express');
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();
const dbConnection = require('./services/db');

const app = express();
const routes = require('./routes');

/**
 * DB connection
 */

//const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`
const mongoUri = process.env.DATABASE.replace('<password>', process.env.DB_PASS)
dbConnection(mongoUri)

mongoose.Promise = global.Promise;

/**
 * @middlewares
 */
app.use(express.json()); // data sent from client, previously bodyParser.

app.use(xss()) // prevents script from executing in the server.
app.use(mongoSanitize());

/**
 * Ensure every thing related to routes has be after sanitization.
 */

app.use('/api',routes)
/**
 * @Port
 */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    // tslint:disable-next-line:no-console
    console.log(`Server is listening on port ${PORT}`)
});