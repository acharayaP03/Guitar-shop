const { Brand } = require("../models/brand");
const httpStatus = require("http-status");
const { ApiError } = require('../middleware/apiError')

const addBrand = async ( brandname ) =>{
    try {
        const brand = new Brand({
            name: brandname
        });
        await brand.save();

        return brand;
    }catch (error){
        throw error;
    }
}

const getBrandById = async (id) =>{
    try {
        const brand = await Brand.findById(id);
        if(!brand) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found...');

        return brand;
    }catch (error){
        throw error;
    }
}

const deleteBrandById = async (id) =>{
    try {
        const brand = await Brand.findByIdAndDelete(id);
        if(!brand) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found... couldnt remove it ..');
        return brand;
    }catch (error){
        throw error;
    }
}

/**
 * here we need to return brands and limit its response like 10 per page or so.
 * @args will have all the params that was sent by user
 * @returns {Promise<void>}
 */
const getBrands = async (args) =>{
    try {
        //if user passes empty args by chance
        let order = args.order ? args.order : "asc";
        let limit = args.limit ? args.limit : 5;

        const brands = await Brand
            .find({})
            .sort([
                ['_id', order]
            ])
            .limit(limit)
        if(!brands) throw new ApiError(httpStatus.NOT_FOUND, 'Brands not found...!');

        return brands;
    }catch (error){
        throw error;
    }
}

module.exports = {
    addBrand,
    getBrandById,
    deleteBrandById,
    getBrands
}