const db = require('../../config/mysql');
const object_to_keys = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i);
    // for (let i in obj) keys.push(i.charAt(0).toUpperCase()+i.replaceAll("_",' ').slice(1));
    return keys;
}

const Table_title = (obj) => {
    let keys = [];
    for (let i in obj) keys.push(i.charAt(0).toUpperCase() + i.replaceAll("_", ' ').slice(1));
    return keys;
}

const paginationfilter =  (req, res) => {

    let limit = 10;
    let offset = parseInt(req.query.p) || 1;
    let month_year = req.query.month_year ? req.query.month_year.split("_") : [];
    let month = month_year[0] ? month_year[0] : "%";
    let year = month_year[1] ? month_year[1] : "%";
    // console.log(month, year);
    let limitString = `LIMIT ${limit * (offset - 1)}, ${limit}`;
    let filterString = `and attendence_date like "${year}-${month}-%"`;
    let sql_query_entire_record = `select studentMaster.student_id,CONCAT(student_name," ",student_surname) as student_full_name,student_mobile,student_location,student_gender,sum(attendence)as attendence,count(attendence) as total_days,CONCAT(ROUND(sum(attendence)/count(attendence)*100, 2)," %") as percentage from studentMaster join attendenceMaster on studentMaster.student_id = attendenceMaster.student_id GROUP BY student_id;`;

    let sql_query = `select studentMaster.student_id,CONCAT(student_name," ",student_surname) as student_full_name,student_mobile,student_location,student_gender,sum(attendence)as attendence,count(attendence) as total_days,CONCAT(ROUND(sum(attendence)/count(attendence)*100, 2)," %") as percentage from studentMaster join attendenceMaster on studentMaster.student_id = attendenceMaster.student_id ${filterString} GROUP BY student_id ${limitString} ;`;

    db.query(sql_query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("db execution");
            let students = Object.values(JSON.parse(JSON.stringify(result)));
            let table_keys = object_to_keys(students[0]);
            let table_title = Table_title(students[0]);
            db.query(sql_query_entire_record, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    let n = Object.values(JSON.parse(JSON.stringify(result))).length;
                    res.render('pagination/index.ejs', { table_title, students, table_keys, n, limit });
                    return;
                }
            });
            return;
        }
    });
}

module.exports = { paginationfilter }