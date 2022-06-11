const { User } = require("../models/user");
const httpStatus = require('http-status');
const { ApiError } = require("../middleware/apiError");
const userService = require('../services/user.service')
/**
 * 
 * @param {*} email request 
 * @param {*} password 
 * @returns User instance of user model.
 */
const createUser = async (email, password) =>{
    try {

        if(await User.emailTaken(email)){
            throw new ApiError( httpStatus.BAD_REQUEST, 'Sorry, that email is already taken.')
        }
        const user = new User({
            email, 
            password
        });
        await user.save();
        return user;
    } catch (error) {
        throw error
    }
}

/**
 * 
 * @param {*} user user instance of user model
 * @returns token. it runs userSchema methods available at the time when user instance is created. then returns the @jwt token.
 */
const genAuthToken = (user) =>{
    const token = user.generateAuthToken();
    return token;
}

const signInWithEmailAndPassword = async (email, password) =>{
    try {
        const user = await userService.findUserByEmail(email)
        if(!user){
            throw new ApiError( httpStatus.UNAUTHORIZED, 'Sorry, email not found.')
        }
        if(!(await user.comaprePassword(password))){
            throw new ApiError( httpStatus.UNAUTHORIZED, 'Sorry, bad password.')
        }
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {createUser, genAuthToken, signInWithEmailAndPassword};