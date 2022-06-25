const express = require('express');
const router = express.Router(); //create router instance
const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: usersRoute
    }
];

routesIndex.forEach((route) =>{
    router.use(route.path, route.route)
})




module.exports = router;