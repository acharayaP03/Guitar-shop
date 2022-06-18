const { User } = require('../models/user');
require('dotenv').config()

const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')

const jwtOptions = {
    secretOrKey : process.env.DB_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) =>{
    try {
        // Since the user id is already extracted by jwt in user model with 'sub' property.
        const user = await User.findById(payload.sub);
        if(!user){
            //done callback has two args, err and payload, in this case we will not be sending err but 
            // false as a payload.
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy
}