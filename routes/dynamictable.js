const express = require('express');
const route = express.Router();


route.get('/dynamictable', (res, req) => {
    req.render('dynamicTable');
})

module.exports = route;