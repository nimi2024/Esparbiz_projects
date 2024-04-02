const express = require('express');
const route = express.Router();
const db = require('../../config/mysql.js');




route.get("/searching",(req,res,next) =>{
    const page = req.query.page || 1;
    const limit = 5;
    
    
    var obf = req.query.obf;
    console.log(obf);
    var ord = req.query.ord;
    console.log(ord);
    
    if((obf && ord) == undefined){
        obf = 'student_Id';
        ord = 'asc';
    }
    
    const offset = (page - 1) * limit;
    const sql = `SELECT * FROM student_master ORDER BY ${obf} ${ord} limit ${offset},${limit}`;
    let str="";
    console.log(sql);
    db.query(sql,function(err,data){
        if(err) throw err;
            data=JSON.parse(JSON.stringify(data));
            console.log(data);
            res.render('/home/chhotanumari-mishra/Documents/NodeJs/delimeter/searching.ejs',{student:data,page:page,limit:limit,obf:obf,ord:ord,str:str});
    })
});

route.post("/searching",(req,res) =>{
    let str = req.body.str;
    console.log(str,'str is:');

    let result = str.split(/([:{}$\\^\\_])/);
    let rslt = result.filter((res) =>{
    return res.trim() != '';
    });

    var obj = {
        firstName : [],
        lastName : [],
        age : [],
        contactNo : [],
        gender : [],
        city : []
    }

    for (let i = 0;i< rslt.length;i++){
    // console.log(str[i]);
    switch(rslt[i]){
        case "_":
            obj.firstName.push(rslt[i+1]);
            break;
        case "^":
            obj.lastName.push(rslt[i+1]);
            break;
        case "$":
            obj.age.push(rslt[i+1]);
            break;
        case "}":
            obj.contactNo.push(rslt[i+1]);
            break;
        case "{":
            obj.gender.push(rslt[i+1]);
            break;
        case ":":
            obj.city.push(rslt[i+1]);
            break;
    }
    }
    console.log(rslt);
    console.log("firstName",obj.firstName);
    console.log("lastName",obj.lastName);
    console.log("age",obj.age);
    console.log("contactNo",obj.contactNo);
    console.log("gender",obj.gender);
    console.log("city",obj.city);

    let page = 1;
    let limit =20;
    // const sql = `SELECT * FROM student_master where firstfirstName in("${obj.firstfirstName}") and surfirstName in("${obj.lastName}") and age in (${obj.age}) and contactNO in(${obj.contactNo}) and gender in("${obj.gender}") and city in("${obj.city}");`;
    let sql = 'select * from student_master where';

    Object.entries(obj).forEach(([key,value]) => {
        // console.log(kys.length)
        if(value.length != 0){
           console.log("2");
           if(value.length > 1){
              console.log("3");
              sql = `${sql} (`
              for(let i = 0;i<value.length;i++){
                    sql = `${sql} ${key} like '%${value[i]}%' or`
                 }
        
              sql=sql.slice(0,-3) + ') and';
              // console.log(obj[key][i]);
           }
           else if(value.length == 1)
           {
              console.log("4")
              sql = `${sql} ${key} like '%${value}%' and`
           }
           else{
              sql = `${sql}`
           }
        }
     });                                            
    sql = sql.slice(0,-3) + ';';
    console.log(sql);
    db.query(sql,function(err,data){
        if(err){
            console.log(err.sqlMessage);
        };
        data=JSON.parse(JSON.stringify(data));
        res.render('/home/chhotanumari-mishra/Documents/NodeJs/delimeter/searching.ejs',{student:data,page:page,limit:limit,str:str});
    })
})


module.exports = route;