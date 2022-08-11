const express = require('express');
const router = express.Router(); //create router instance
const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const brands = require('../routes/brand.route');

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
        path: '/brands/:id',
        route: brands
    }
];

routesIndex.forEach((route) =>{
    router.use(route.path, route.route)
})




module.exports = router;