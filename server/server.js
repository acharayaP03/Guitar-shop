
const express = require('express');
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

/**
 * @middlewares
 */
app.use(xss()) // prevents script from executing in the server.
app.use(mongoSanitize());

/**
 * @Port
 */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    // tslint:disable-next-line:no-console
    console.log(`Server is listening on port ${PORT}`)
});