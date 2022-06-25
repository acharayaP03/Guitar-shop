const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const {register, signin, isAuthenticated, dog } = authController;

router.post('/register',register)
router.post('/signin',signin)
router.get('/isauthenticated', auth(), isAuthenticated) // checks if user is validated..
router.get('/dog',auth('createAny', 'dog'), dog);


module.exports = router;