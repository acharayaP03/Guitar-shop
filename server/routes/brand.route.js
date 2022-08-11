const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand.controller')
const auth = require('../middleware/auth');


router.post('/brand', auth('createAny', 'brand'), brandController.addBrand)
/**
 * @get brand by id route
 */
router.route('/brand/:id')
    .get(brandController.getBrand)
    .delete( auth('deleteAny', 'brand'), brandController.deleteBrandById)

module.exports = router;
