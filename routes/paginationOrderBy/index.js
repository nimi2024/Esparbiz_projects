const express = require('express');
const route = express.Router();
const { getStudents, totalRecords } = require('../../controller/paginationOrderBy/index.js');
const db = require('../../config/mysql.js');

route.get('/pagiorderby', (req, res) => {
    let limit = 10;
    let offset = parseInt(req.query.p) || 1;
    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let order = req.query.sort === 'unique_id_des' ? "DESC" : "ASC";
    let orderString = order ? `ORDER BY unique_id ${order}` : ``;
    //if pagination base desc order (but bug in this query)
    // let sql = order === "DESC" ? `SELECT * FROM student_Master WHERE student_id < ${limit * (offset - 1) + limit + 1}` : `SELECT * FROM student_Master`;
    let sql = `SELECT * FROM student_Master`;

    db.query(`SELECT * FROM student_Master`, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("db execution");
            let local_users = Object.values(JSON.parse(JSON.stringify(result)));
            let n = local_users.length;
            getStudents(res, sql, n, limit, limitString, orderString);
        }
    });

})

module.exports = route;