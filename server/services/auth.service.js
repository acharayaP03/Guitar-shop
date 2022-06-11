const { User } = require("../models/user");

/**
 * 
 * @param {*} email request 
 * @param {*} password 
 * @returns User instance of user model.
 */
const createUser = async (email, password) =>{
    try {

        if(await User.emailTaken(email)){
            console.log('user already Exist')
        }
        const user = new User({
            email, 
            password
        });
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Opps, problem creating user.')
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

module.exports = {createUser, genAuthToken};