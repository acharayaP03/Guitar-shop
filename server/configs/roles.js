/**
 * @params admin<any>, user<specified>
 * 
 * @return User specified roles 
 */

const AccessControl = require('accesscontrol');


let grantObject ={
    admin: {
        dog:{
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user: {}
}

const roles = new AccessControl(grantObject);

module.exports = { roles }