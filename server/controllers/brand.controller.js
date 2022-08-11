
/**
 * @brandController
 *
 * */
const { brandService } = require('../services')
const { addBrand, getBrandById } = brandService;
const brandControllers = {
    async addBrand(req, res, next){
        try{
            const { brandname } = req.body
            const brand = await addBrand(brandname);
            res.json(brand)
        }catch (error){
            next(error);
        }
    },
    async getBrand(req, res, next){
        try{
            const id = req.params.id;
            const brand = await getBrandById(id)
            res.json(brand);
        }catch (error){
            next(error);
        }
    }
}

module.exports = brandControllers;