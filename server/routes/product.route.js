const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth')
router.post('/', auth('createAny', 'product'), productController.addProduct)
module.exports = router;