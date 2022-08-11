const express = require('express');
const router = express.Router();
const { addBrand } = require('../controllers/brand.controller')
const auth = require('../middleware/auth');

router.post('/brand', auth('createAny', 'brand'), addBrand)

module.exports = router;