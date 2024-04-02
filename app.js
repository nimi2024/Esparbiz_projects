
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/mysql');
const con = require('./config/mysql2');
const dynamicTable = require('./routes/dynamictable')
const main = require('./routes/main')
const kukucube = require('./routes/kukucube')
const tictactoe = require('./routes/tictactoe')
const website1 = require('./routes/website1')
const website2= require('./routes/website2')
const website3= require('./routes/website3')
const curdOperation = require('./routes/curdOperation.js')
const pagination = require('./routes/pagination.js')
const paginationindex = require('./routes/paginationResult/index.js')
const paginationstudent = require('./routes/paginationResult/student.js')
const paginationOrderBy = require('./routes/paginationOrderBy/index.js')
const formOperation = require('../gituplodeddata/routes/form/route.js')
const delimiter = require('./routes/delimiter/searching.js')
const formAuthentication = require('./routes/form-authentication/index.js')
const port = 3000;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));




app.use(dynamicTable,main,kukucube,tictactoe,website1,website2,website3,curdOperation,pagination,delimiter,paginationindex,paginationstudent,formOperation,paginationOrderBy,formAuthentication)


app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
});
