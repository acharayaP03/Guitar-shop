const {Product} = require("../models/product");
const httpStatus = require("http-status");
const { ApiError } = require('../middleware/apiError')
const mongoose = require('mongoose');
const {flatten} = require("express/lib/utils");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
})

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
/**
 *
 * @param id
 * @returns {Promise<Query<Document<any, any, unknown>, Document<any, any, unknown>, {}, unknown>>}
 */
const getProductById = async (id) =>{
    try{
        const product = await Product.findById(id).populate('brand');
        if(!product){
            throw new ApiError(httpStatus.NOT_FOUND, 'Your product not found, please try again.')
        }

        return product;
    }catch (error){
        throw error;
    }
}
/**
 * @_id id sent from controller,
 * $set updates the body of the product.
 * @returns new Product
 * */
const updateProductById = async (_id, body) =>{
    try {
        const product = await Product.findOneAndUpdate(
            { _id },
            { "$set": body },
            { new: true}
        );
        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found.');

        return product;
    }catch (error){
        throw error
    }
}

const deleteProductById = async( _id  ) => {
    try {
        const product = await Product.findByIdAndRemove(_id);
        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product
    } catch(error) {
        throw error
    }
}

const getAllProducts = async( req  ) => {
    try {
        const products = await Product
            .find({})
            .populate('brand')
            .sort([
                [req.query.sort_by, req.query.order]
            ])
            .limit(parseInt(req.query.limit))
        return products
    } catch(error) {
        throw error
    }
}

/**
 *
 * @param req
 * @returns {Promise<Product>} matching users params
 *
 * eg:
 * const example = {
 *     "keywords": "user typed keywords",
 *     "brand" : "id of brand",
 *     "lt": 200,
 *     "gt": 500,
 *     "frets": 24
 * }
 */

const paginateProduct = async( req ) => {
    try {
        let aggQueryArray = [];

        // filter with keywords.

        if(req.body.keywords && req.body.keywords !== ''){
            const regex = new RegExp(`${req.body.keywords}`, 'gi');
            /**
             * here we are trying to match users request keyword int aggQueryArray to
             * match with product model/title
             */
            aggQueryArray.push({
                $match: {
                    model: { $regex: regex }
                }
            })
        }

        // filter with brands
        if(req.body.brand && req.body.brand.length > 0){
            let newBrandsArray = req.body.brand.map( (item) => (
                //convert item into the type of object that mongoose can understand.
                mongoose.Types.ObjectId(item)
            ));

            aggQueryArray.push({
                $match:{
                    brand: {
                        $in: newBrandsArray
                    }
                }
            })
        }

        //filter by frets
        if(req.body.frets && req.body.frets.length > 0 ){
            aggQueryArray.push({
                $match : {
                    frets: { $in: req.body.frets }
                }
            })
        }

        //filter by frets
        if(req.body.min && req.body.min > 0 || req.body.max && req.body.max < 5000){

            if(req.body.min){
                aggQueryArray.push({
                    $match : {
                        price: { $gt: req.body.min }
                    }
                })
            }

            if(req.body.max){
                aggQueryArray.push({
                    $match : {
                        price: { $lt: req.body.max }
                    }
                })
            }
        }

        //add populate
        aggQueryArray.push({
            $lookup:{
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand"
            }
        },
            {
                $unwind: '$brand' // with out this $unwind, it will return object wrapped in array.
            }
        )
        let aggQuery = Product.aggregate(aggQueryArray);
        const options = {
            page: req.body.page,
            limit: 6,
            sort: { date: 'desc'}
        }

        const product = await Product.aggregatePaginate(aggQuery, options)
        return product
    } catch(error) {
        throw error
    }
}

const imageUploader = async (req) => {
    try{
        const upload = await cloudinary.uploader.upload(req.files.file.filepath, {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            public_id: `${Date.now()}`,
            folder: 'guitar-shop'
        });

        return {
            public_id: upload.public_id,
            url: upload.url
        }
    }catch (error){
        throw error
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts,
    paginateProduct,
    imageUploader
}