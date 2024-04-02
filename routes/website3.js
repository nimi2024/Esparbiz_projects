const express = require('express');
const route = express.Router();

route.get('/website3', (res, req) => {
    req.render('website3')
})

module.exports = route;