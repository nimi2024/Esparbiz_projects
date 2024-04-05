const fs = require('fs');
const basicdetailsget = (req, res) => {
    console.log("something");
    res.render('curdOperation/basicdetail.ejs');
}
const basicdetailpost = (req, res) => {
    console.log('hello')
    let unique_id = Date.now();
    let data = { unique_id, ...req.body };
    let userjson = fs.readFileSync('BasicDetail.json', "utf8");
    let user = JSON.parse(userjson);
    // console.log('user is',user)
    user.push(data);
    userjson = JSON.stringify(user);

    // fs.routeendFile('/home/chhotanumari-mishra/Documents/NodeJs/day22/BasicDetail.txt',  JSON.stringify(data));
    fs.writeFileSync('BasicDetail.json', userjson, "utf-8");
    console.log('user', user);
    res.render('curdOperation/userdetail.ejs', { user: user });
}
const userdata = (req, res) => {
    const user_id = req.params.user_Id;
    let unique_id = Date.now();
    let data = { unique_id, ...req.body };
    let userjson = fs.readFileSync('BasicDetail.json', "utf8");
    let user = JSON.parse(userjson);
    // console.log('user is',user)
    user.push(data);
    userjson = JSON.stringify(user);
    res.render('./curdOperation/userdata.ejs',{user:user})
}
module.exports = { basicdetailsget, basicdetailpost, userdata }