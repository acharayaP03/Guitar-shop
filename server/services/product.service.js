const {Product} = require("../models/product");
const httpStatus = require("http-status");
const { ApiError } = require('../middleware/apiError')

const addProduct = async (body) =>{
    try{
        const product = new Product({
            ...body
        });

        await product.save();
        return product;
    }catch (error){
        throw error;
    }
}

const getProductById = async (id) =>{
    try{
        const product = await Product.findById(id)
        if(!product){
            throw new ApiError(httpStatus.NOT_FOUND, 'Your product not found, please try again.')
        }

        return product;
    }catch (error){
        throw error;
    }
}

module.exports = {
    addProduct,
    getProductById
}