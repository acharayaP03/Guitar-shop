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
    /**
     *
     * @param req id
     * @param res
     * @param next if any error
     * @returns {Promise<void>} Product by Id
     */
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
    },

    async updateProductById(req, res, next){
        try{
            const _id = req.params.id;
            const product = await productService.updateProductById(_id, req.body);

            res.json(product);
        }catch (error) {
            next(error)
        }
    },

    async deleteProductById(req,res,next){
        try{
            const _id = req.params.id;
            const product = await productService.deleteProductById(_id);
            res.json(product)
        } catch(error){
            next(error)
        }
    },
};

module.exports = productController