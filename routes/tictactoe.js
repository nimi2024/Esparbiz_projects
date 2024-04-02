const express = require('express');
const route = express.Router();

route.get('/tictactoe', (res, req) => {
    req.render('tictactoe')
})

module.exports = route;