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

module.exports = { getStudents, totalRecords };