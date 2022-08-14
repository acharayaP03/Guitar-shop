const { productService } = require('../services');

const productController = {
    async addProduct(req, res, next) {
        try{
            const product = await productService.addProduct(req.body);
            res.json(product);
        }catch (error){
            next(error);
        }
    },

    async getProductById(req, res, next) {
        try{
            const _id = req.params.id;
            const product = await productService.getProductById(
                _id
            );

            res.json(product);
        }catch (error) {
            next(error)
        }
    }
};

module.exports = productController