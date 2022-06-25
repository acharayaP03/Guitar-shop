const {userServices, authServices} = require('../services')
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError')


const { findUserById, updateUserProfile, updateUserEmail} = userServices;
const {genAuthToken } = authServices;

const usersController = {
    async profile ( req,res, next){
        try {
            const user = await findUserById(req.user._id)
            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
            }
            
            /**
             * first permission will be set on roles, 
             * eg: for user profile, we have profile where we can read:own set to all. but users are prohibited to see their
             * password and _id.
             * this permisson will be passed into @auth middleware where it will set to res.locals.permission
             * from their we will evaluate what user will receive.
             * 
             * @user is all data
             * @permitted is a user data that is set what they can see. See @roles
             */
            const permited = res.locals.permission.filter(user._doc);

            res.json(permited)
        } catch (error) {
            next(error)
        }
    },
    async updateProfile(req, res, next) {
        try {
            const user = await updateUserProfile(req)
            return res.json(user)
        } catch (error) {
            next(error)
        }
    },

    /**
     * Few things we need to do before we update user email.
     * we need to varify them by sending new token to their email. then this change will be done.
     * @param {*} req request object
     * @param {*} res response sent to user
     * @param {*} next middleware 
     */
    async updateUserEmailController(req, res, next){
        try {

            const user = await updateUserEmail(req);
            const token = await genAuthToken(user);

            //send email to varify acctount
            res.cookie('x-access-token', token).send({
                user, token
            })
        } catch (error) {
            next(error)
        }
    }
}



module.exports = usersController;