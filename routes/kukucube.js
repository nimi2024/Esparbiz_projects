const express = require('express');
const route = express.Router();


route.get('/kukucube', (res, req) => {
    req.render('kukucube');
})

module.exports = route;