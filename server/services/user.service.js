const { User } = require("../models/user")
const httpStatus = require('http-status')
const { ApiError } = require('../middleware/apiError')
const jwt = require('jsonwebtoken')

const validateToken = async ( token ) => {
    return jwt.verify( token, process.env.DB_SECRET)
}
const findUserByEmail = async (email) =>{
    return await User.findOne({ email })
}

const findUserById = async ( _id ) => {
    return await User.findById(_id);
}

const updateUserProfile = async (req) =>{
    try {
        // just remember auth has req user which has id already
        const user = await User.findOneAndUpdate(
            {_id: req.user._id },
            {
                '$set': {...req.body.record}
            },
            { new: true} // gives you new data after db update.
        );

        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found.')
        }

        return user;
    } catch (error) {
        throw error
    }
}


const updateUserEmail = async (req) =>{
    try {
        //check if the email user trying to update is already exist
        if(await User.emailTaken(req.body.newemail)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry, that email is already taken.')
        }

        const user = await User.findOneAndUpdate(
            {_id: req.user._id, email: req.user.email },
            {
                '$set': {
                    email: req.body.newemail,
                    varified: false 
                }
            },
            { new: true} // gives you new data after db update.
        );

        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found.')
        }

        return user;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateToken
}