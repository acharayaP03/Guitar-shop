const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {profile} = require('../controllers/users.controller');



/**
 * create a user profile route.
 */
router.route('/profile')
.get(auth('readOwn', 'profile'), profile)


module.exports = router;