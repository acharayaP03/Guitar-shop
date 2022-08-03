const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {profile, updateProfile, updateUserEmailController, verifyAccount} = require('../controllers/users.controller');



/**
 * create a user profile route.
 */
router.route('/profile')
.get(auth('readOwn', 'profile'), profile)
.patch(auth('updateOwn', 'profile'), updateProfile)

router.patch('/email', auth('updateOwn','profile'), updateUserEmailController);
router.get('/verify', verifyAccount)
module.exports = router;