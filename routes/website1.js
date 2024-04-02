const express = require('express');
const route = express.Router();

route.get('/website1', (res, req) => {
    req.render('website1')
})

module.exports = route;