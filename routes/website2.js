const express = require('express');
const route = express.Router();

route.get('/website2', (res, req) => {
    req.render('website2')
})

module.exports = route;