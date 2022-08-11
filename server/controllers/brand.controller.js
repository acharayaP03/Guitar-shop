
/**
 * @brandController
 *
 * */
const { brandService } = require('../services')
const { addBrand } = brandService;
const brandControllers = {
    async addBrand(req, res, next){
        try{
            const { brandname } = req.body
            const brand = await addBrand(brandname);
            res.json(brand)
        }catch (error){
            next(error);
        }
    }
}

module.exports = brandControllers;