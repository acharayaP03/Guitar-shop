const { User } = require("../models/user");

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

const genAuthToken = (user) =>{
    const token = user.generateAuthToken();
    return token;
}

module.exports = {createUser, genAuthToken};