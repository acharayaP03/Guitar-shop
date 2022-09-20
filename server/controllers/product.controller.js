
const formidable = require('formidable')
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
    async getAllProducts(req, res, next){
        try{
            const products = await productService.getAllProducts(req);
            res.json(products)
        } catch(error){
            next(error)
        }
    },

    async paginateProduct(req, res, next){
        try{
            const products = await productService.paginateProduct(req);

            res.json(products)
        } catch(error){
            next(error)
        }
    },
    async imageUploader(req, res, next){
        try{
            const form = formidable({ multiple: true})
            form.parse(req, async (err, fields, files) =>{
                if(err){
                    next(err);
                    return;
                }
                const image = await  productService.imageUploader({files}).catch(err => err)
                res.json(image);
            })

        }catch (error){
            next(error)
        }
    }
};

module.exports = productController