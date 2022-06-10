const mongoose = require('mongoose');
const validator = require('validator');

require('dotenv').config()

const userSchema = new mongoose.Schema({
    email:{},
    password: {},
    role: {},
    firstname: {},
    lastname: {},
    cart: {},
    history: {},
    varified: {}
})

module.exports = userSchema;