const express = require('express');
const bodyparser = require('body-parser')
const route = express.Router();
// const route = express();
const fs = require('fs');
// route.set('view engine', 'ejs');
// route.use(express.static('public'));
route.use(bodyparser.json())
route.use(bodyparser.urlencoded({ extended: true }))
// route.use(express.static(__dirname + '/public'));


route.get('/form', (req, res) => {
    console.log("something");
    res.render('curdOperation/basicdetail.ejs');
});

route.post('/form', (req, res) => {


    let unique_id = Date.now();
    let data = { unique_id, ...req.body };
    let userjson = fs.readFileSync('BasicDetail.json', "utf8");
    let user = JSON.parse(userjson);
    user.push(data);
    userjson = JSON.stringify(user);

    // fs.routeendFile('/home/chhotanumari-mishra/Documents/NodeJs/day22/BasicDetail.txt',  JSON.stringify(data));
    fs.writeFileSync('BasicDetail.json', userjson, "utf-8");
    console.log('user');
    res.render('curdOperation/userdetail.ejs',{ user });

  
});
route.get("/userdata/:user_Id",(req,res) =>{

    // throw Error("Error ai he ai he  error ai he ")
    const user_id = req.params.user_Id;
    res.render('/curdOperation/userdata')
                                           
})





module.exports = route;