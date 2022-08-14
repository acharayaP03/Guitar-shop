const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status')
/**\
 * @express validator which validates against model.
 * @type {ValidationChain[]}
 */
const addProductValidator = [
    check('model')
        .trim().not().isEmpty().withMessage('You need to add a model.').bail()
        .isLength({ min: 3}).withMessage('You need to '),
    check('brand')
        .trim().not().isEmpty().withMessage('You need to a add brand.'),
    /**
     * @check will validate models, then if any errors, it will pass it to below call back function
     * */
    (req,res, next) =>{
        const errors = validationResult(req);
        //if there is any errors, we will send status with error message.
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next();
    }
]


module.exports = {
    addProductValidator
}