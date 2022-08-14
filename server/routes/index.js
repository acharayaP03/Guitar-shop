const express = require('express');
const router = express.Router(); //create router instance
const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const brands = require('../routes/brand.route');
const productRoute = require('../routes/product.route');
const siteRoute = require('../routes/site.route.js')
const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: usersRoute
    },
    {
        path: '/brands',
        route: brands
    },
    {
        path: '/products',
        route: productRoute
    },
    {
        path: '/site',
        route: siteRoute
    }
];

routesIndex.forEach((route) =>{
    router.use(route.path, route.route)
})




module.exports = router;