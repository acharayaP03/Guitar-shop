const {authServices} = require('../services')
const httpStatus = require('http-status')

const authController = {

    /**
     * 
     * @param {*} req  request sent from the client
     * @param {*} res response from server with status
     * @param {*} next middleware 
     * 
     * request from client is handled here. we simply take user information fron request body then pass it to authService createUser.
     * then we generate token for user activity persistance.
     */
    async register(req, res, next){

        try {
            const { email, password } = req.body;

            const user = await authServices.createUser(email, password);
            const token = await authServices.genAuthToken(user);
            
            //save token generated from user schema methods
            res.cookie('x-access-token', token).status(httpStatus.CREATED).send({
                user, token
            })
        } catch (error) {
            next(error)
        }
        
    },
    async signin(req, res, next){
        try {
            const { email, password } = req.body
            const user = await authServices.signInWithEmailAndPassword(email, password);
            const token = await authServices.genAuthToken(user);
            
            //save token generated from user schema methods
            res.cookie('x-access-token', token).send({
                user, token
            })
            res.send( { user })
        } catch (error) {
            next(error)
        }
    },
    async isAuthenticated(req, res, next){
        res.json(req.user)
    }
}


module.exports = authController;