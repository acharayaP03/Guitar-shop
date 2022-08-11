
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
    },
    async deleteBrandById(req, res, next){
        try{
            const id = req.params.id;
            const brand = await brandService.deleteBrandById(id);

            res.json(brand);
        }catch (error){
            next(error);
        }
    },
    async getAllBrands(req, res, next){
        try{
            const brands = await brandService.getBrands(req.body);
            res.json(brands)
        }catch (error){
            next(error);
        }
    }
}

module.exports = brandControllers;