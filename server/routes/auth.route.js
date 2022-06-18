const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

const {register, signin, isAuthenticated } = authController;

router.post('/register',register)
router.post('/signin',signin)
router.get('/isauthenticated', auth(), isAuthenticated) // checks if user is validated..

module.exports = router;