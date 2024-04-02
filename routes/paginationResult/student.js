const express = require('express');
const route = express.Router();
const db = require('../../config/mysql');
const { object_to_keys, Table_title, sql_query_for_getStudentResult, sql_for_get_student_name } = require('../../controller/paginationresult/index');


route.get('/student/:student_id', (req, res) => {
    const student_id = +req.params.student_id;
    console.log(student_id);
    let sql_query_studentResult = sql_query_for_getStudentResult(student_id);
    let sql_query_student_name = sql_for_get_student_name(student_id);
    db.query(sql_query_studentResult, function (err, result) {
        if (err) {
            throw err;
        } else {
            let records_for_student_result = Object.values(JSON.parse(JSON.stringify(result)));
            let table_keys = object_to_keys(records_for_student_result[0]);
            let table_title = Table_title(records_for_student_result[0]);
            db.query(sql_query_student_name, function (err, result_1) {
                if (err) {
                    throw err;
                } else {
                    let student_name = JSON.parse(JSON.stringify(result_1))[0].full_name;
                    console.log(student_name);
                    res.render('paginationResult/student.ejs', { student_name, table_title, records_for_student_result, table_keys });
                    return;
                }
            });

        }
    });
});
module.exports = route;