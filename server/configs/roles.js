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
        profile: allRights,
        brand: allRights
    },
    user: {
        profile:{
            'read:own': ['*' ,'!password', '!_id'], // controlling what user will see, ids and password is not needed.
            'update:own': ['*']
        },
        brand: { 'read:any': ['*'] }
    }
}

const roles = new AccessControl(grantObject);

module.exports = { roles }