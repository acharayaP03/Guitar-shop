const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        user.password = hash;
    }

    next();
});

/**
 * The reason we create methods instead of statics is, at the this point in time, user doesnt exist on out db.
 * Static are called before the user instance exists. 
 * this needs to happen at after we save user then call this method to generate this token.
 * @returns user token that allows user to stay signed in 
 */
userSchema.methods.generateAuthToken = function(){
    let user = this;
    console.log(user)
    const userObj = { sub: user._id.toHexString()}

    const token = jwt.sign( userObj, process.env.DB_SECRET, {
        expiresIn: '1d'
    });
    return token;

}

/**
 * this will check if the password user entered is correct or not. 
 * @bcrypt provides a way to comparing hashed password where we can compare @candidate password to existing password in db
 * @param {*} passward 
 * @returns Boolean either true or false 
 */
userSchema.methods.comaprePassword = async function(candidatePassword){
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
}

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