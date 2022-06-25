/**
 * @params admin<any>, user<specified>
 * 
 * @return User specified roles 
 */

const AccessControl = require('accesscontrol');
const allRights = {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*']
    }

let grantObject ={
    admin: {
        profile: allRights
    },
    user: {
        profile:{
            'read:own': ['*'],
            'update:own': ['*']
        }
    }
}

const roles = new AccessControl(grantObject);

module.exports = { roles }