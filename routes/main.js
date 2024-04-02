const express = require('express');
const route = express.Router();

route.get('/index', (res, req) => {
    req.render('main')
})

module.exports = route;