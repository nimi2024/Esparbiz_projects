const express = require('express');
const route = express.Router();
const db = require('../../config/mysql');
 const { object_to_keys, Table_title,query_for_entire_records,sql_query_for_pagination } = require('../../controller/paginationresult/index');


route.get('/paginationresult', (req, res) => {
    let limit = 11;
    let offset = parseInt(req.query.p) || 1;
    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let sql_query_entire_record = query_for_entire_records;
    let sql_query = sql_query_for_pagination(limitString);
    
    db.query(sql_query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("db execution");
            let records = Object.values(JSON.parse(JSON.stringify(result)));
            let table_keys = object_to_keys(records[0]);
            let table_title = Table_title(records[0]);
            db.query(sql_query_entire_record, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    let n = Object.values(JSON.parse(JSON.stringify(result))).length;
                    res.render('paginationResult/index.ejs', { table_title, records, table_keys, n, limit });
                    return;
                }
            });
            return;
        }
    });
})

module.exports = route;