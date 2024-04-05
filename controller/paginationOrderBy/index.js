const db = require('../../config/mysql');

const getStudents = (res, sql, n, limit, limitString, orderString) => {
    let sql_query = `${sql} ${orderString} ${limitString};`;
    console.log(sql_query);
    let global_users = [];
    db.query(sql_query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("db execution");
            let local_users = Object.values(JSON.parse(JSON.stringify(result)));
            global_users = [...local_users];
            // console.log(global_users);
            res.render('paginationOrderBy/index.ejs', { global_users, limit, n });
        }
    });
    return global_users.length;
}

const totalRecords = (sql_query) => {

    return db.query(sql_query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("db execution for total");
            let local_users = Object.values(JSON.parse(JSON.stringify(result)));
            return local_users.length;
        }
    });

}

const paginationOrderBy =  (req, res) => {
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

}

module.exports = {paginationOrderBy };