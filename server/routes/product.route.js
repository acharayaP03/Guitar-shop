const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const { addProductValidator } = require('../middleware/validations');
const formidable = require('formidable');

router.post('/', auth('createAny', 'product'), addProductValidator, productController.addProduct)
/**
 * @get all product
 * */

router.route('/product/:id')
    .get(productController.getProductById)
    .patch(auth('updateAny', 'product'), productController.updateProductById)
    .delete(auth('deleteAny', 'product'), productController.deleteProductById);


router.get('/all', productController.getAllProducts)
router.post('/paginate/all', productController.paginateProduct)

// image upload
router.post('/upload', auth('createAny', 'product'), productController.imageUploader);

module.exports = router;