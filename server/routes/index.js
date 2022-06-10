const express = require('express');
const router = express.Router(); //create router instance
const authRoute = require('./auth.route');

const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    }
];

routesIndex.forEach((route) =>{
    router.use(route.path, route.route)
})




module.exports = router;