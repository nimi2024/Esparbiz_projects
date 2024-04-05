
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/mysql');
const con = require('./config/mysql2');
const dynamicTable = require('./routes')
const main = require('./routes')
const kukucube = require('./routes')
const tictactoe = require('./routes')
const website1 = require('./routes')
const website2= require('./routes')
const website3= require('./routes')
const curdOperation = require('./routes')
const paginationfilter = require('./routes')
const paginationindex = require('./routes')
const paginationstudent = require('./routes')
const paginationOrderBy = require('./routes')
const formOperation = require('./routes')
const delimiter = require('./routes')
const formAuthentication = require('./routes')

const port = 3000;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));




app.use(dynamicTable,main,kukucube,tictactoe,website1,website2,website3,curdOperation,paginationfilter,delimiter,paginationindex,paginationstudent,formOperation,paginationOrderBy,formAuthentication)


app.listen(port, () => {
    console.log(`Example app listening on port ${port} http://localhost:${port}`);
});
