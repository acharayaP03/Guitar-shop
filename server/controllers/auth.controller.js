const {authServices} = require('../services')

const authController = {
    async hello(){

        try {
            const userHello = authServices.helloService
            return userHello;
        } catch (error) {
            
        }
        
    }
}


module.exports = authController;