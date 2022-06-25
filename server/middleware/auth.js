 const passport  = require('passport');
 const { ApiError } = require('./apiError');
 const httpStatus = require('http-status');
 const { roles } = require('../configs/roles');

 /**
 *  @rights are the user permission that we pass from roles, 
 *  this needs to be set during user authentication on both @verify and @auth
 *
 */


 const verify = (req, res, resolve, reject, rights ) => async(err, user) =>{

    if ( err || !user){
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, access denied.'))
    }
    // req.user needs to be set when we check for permissions.
    req.user = user;

    if(rights.length){
        const action = rights[0] // this is either createAny / deleteAny / updateAny vice verca.
        const resource = rights[1] // profile, user or whatever that we pass to the auth.

        //since roles is the instance of AccessControl, we have access to its method eg: can() 
        const permission = roles.can(req.user.role)[action](resource)
        if(!permission.granted){
            return reject(new ApiError(httpStatus.FORBIDDEN, "Sorry, you don't have enough rights to access this resouce."))
        }
        // if granted, set response permission to permission 
        res.locals.permission = permission;
    }

    resolve();
 }




 /**
  * @auth will compare token that was generated during user signin or register action.
  * 
  * @param  {...any} rights 
  * @returns valid token 
  */

 const auth = (...rights) => async(req, res, next) =>{
    return new Promise((resolve, reject) =>{
        passport.authenticate('jwt', 
            { session: false }, 
            verify(req, res, resolve, reject, rights)
        )(req, res, next)
    }).then(() => next())
    .catch((err) => next(err))
 }


 module.exports = auth;