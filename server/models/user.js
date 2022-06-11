const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

require('dotenv').config()

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        } 
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstname: {
        type: String,
        maxlength: 100,
        trim:true,
        default: ''
    },
    lastname: {
        type: String,
        maxlength: 100,
        trim:true,
        default: ''
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    varified: {
        type: Boolean,
        default: false
    }
});



/***
 * @param { password }
 * @this refers to the userschema where we access password property.
 * then we salt it and apply that salt to passward via hash function
 * if block is provided to prevent password being rehased if user wants to modifiy other field.
 *  
 * once process is completed it will call next which will then proceed to save method.
 * 
 */

userSchema.pre('save', async function(next){
    let user = this; // access user property from schema

    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
    }

    user.password = hash;
    next();
})

/**
 * 
 * @param {*} email check user entered email before saving it to MongoDb
 * @returns Boolean
 */

userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user;
}

const User = mongoose.model('User', userSchema)
module.exports = { User };