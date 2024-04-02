const express = require('express');
const route = express.Router();
const db = require('../../config/mysql2');
const mysql = require('mysql2/promise');
const md5 = require('md5');
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


const secretKey = 'mysecret';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'march_7_job_application',
    waitForConnections: true,
    connectionLimit: 10, // The limit based on needs
    queueLimit: 0
})


route.get('/', (req, res) => {
    res.render('form-authentication/index.ejs');
})
route.post('/', (req, res) => {
    let ele = req.body;
    const salt = "mysecret"
    console.log(ele);
    let sql1 = `insert into users(username,address,dob,pincode,course,email,gender,salt) values(?,?,?,?,?,?,?,?)`;
    const result = db.query(sql1, [ele.username, ele.address, ele.dob, ele.pincode, ele.course, ele.email, ele.gender, (salt)]);
    console.log(result);
})

route.get('/generate-activation-link', (req, res) => {

    res.render('form-authentication/generateLink')
})

route.get('/showResponse',(req,res) => {
    res.send("Your password created successfully!.....")  
});
route.post('/generate-activation-link', (req, res) => {
    function generateActivationLink() {
        const baseUrl = `http://localhost:3000/generate-activation-link`;
        const activateCode = generateActivationCode(8);
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
        const activationLink = `${baseUrl}/code=${activateCode}&expires = ${expirationTime}`;
        console.log(activationLink)

        return activationLink;
    }

    function generateActivationCode(length) {
        const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1236547890';
        let activateCode = '';
        for (let i = 0; i < length; i++) {
            activateCode += character.charAt(Math.floor(Math.random() * character.length));
        }
        return activateCode
    }


    const baseUrl = `http://localhost:3000/create-password`;
    const activateCode = generateActivationCode(8);
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
    const activationLink = `${baseUrl}code=${activateCode}&expires = ${expirationTime}`;

    function checkActivationLinkValadity(activationLink) {
        if (!activationLink) {
            return false;
        }
        const expirationTime = Number(activationLink.split('expires=')[1]);
        const currentTime = Date.now();

        if (currentTime < expirationTime) {
            return true
        }
        return false;
    }

    // usage
    const generateActivationlink = generateActivationLink();
    console.log('Generate activation link', generateActivationlink);

    const userActivationLink = `http://localhost:3000/create-password`;
    const isValidLink = checkActivationLinkValadity(userActivationLink);
    console.log(isValidLink)

    if (isValidLink) {
        console.log('Activatin link is valid and not expired');
    } else {
        console.log('activation link is invalid or expired')
    }


    // console.log('generate hogaya')
    res.send({ userActivationLink, activationLink })
})


route.get('/create-password', (req, res) => {
    // console.log(req.params.token_url);
    res.render('form-authentication/createpswd');
})

route.post('/create-password', async (req, res) => {
    let password = req.body.password;
    let repeatPassword = req.body.repeatpassword;
    console.log("password is:", password)
    console.log("Repeat-password is:", password)

    async function fetchLastIdAndUpdate() {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.query('select id from users order by id desc limit 1;')
            connection.release();

            if (rows.length > 0) {
                const lastId = rows[0].id;
                const salt = 'mysecret';
                const pswd = md5(password) + salt
                const updateQuery = `update users set password = '${pswd}' where id = ${lastId};`
                const [updateResult] = await pool.query(updateQuery);
                console.log(updateResult)
                console.log("Data updated sucessfully");
            } else {
                console.log("No record found in the table");
            }

        }
        catch (error) {
            console.log("Error:", error)
        }
    }
    fetchLastIdAndUpdate()



    res.send('form-authentication/createpswd')

})

route.get('/login', (req, res) => {
    res.render('form-authentication/login')
})

route.post('/login', async (req, res) => {
    var salt='mysecret';
    let email = req.body.email;
    console.log(email, "email");
    let password = req.body.password;
    console.log(password, "password");



    async function loginvalidation() {
        const connection = await pool.getConnection();
        connection.release();
        try {
            const [data] = await connection.query(`select * from users where email='${email}';`)
            // let salt = data[0].salt
            console.log('email is:',email);
            console.log(data, "data")
            console.log(salt, "salt")
            password = md5(password) + salt
            console.log("paword of login page", password)
            let user_data = data[0];
            console.log("use5r data", user_data);
            console.log((user_data.email === req.body.email), (user_data.password === req.body.password))
            console.log(user_data.email.length, req.body.email.length)
            console.log(user_data.password, password)


            if ((user_data.email === req.body.email) && (user_data.password === req.body.password)) {
                console.log('if');

                console.log('Login Successfully.......');

            } else {
                console.log('else');
                console.error('Please Enter Valid Email And Password');

            }


        } catch (error) {
            console.log("Error Message:", error);
        }
    }

    loginvalidation();
}
);

route.get('/forgot-password', (req, res) => {
    // console.log(req.params.token_url);
    res.render('form-authentication/forgotpassword')
})

route.post('/forgot-password', (req, res) => {

    const email = req.body.email
    console.log("email is", email)
    const password = req.body.password
    console.log("password",password)

if(!email){
    return res.status(400).json({error:'Email is require'});
}
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nimimishra2024@gmail.com',
    //   pass: 'gynk zors kiwj zbgl '
    }
  });
  
  var mailOptions = {
    from: 'nimi2024@gmail.com',
    to: `${email}`,
    subject: 'Reset Password Of Your Email..',
    text: 'Click Here To Reset Your Password : http://localhost:3000/updatepswd'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
})

route.get('/updatepswd',(res,req) => {
    req.render('form-authentication/pswdReset');
})
route.post('/updatepswd', async(req, res) => {
   
    let data = req.body;
    console.log(data,"fromjs")
    let newpswd = req.body.newpassword;
    let repeatpswd = req.body.repeatpassword;
    let email = req.body.email
    console.log(newpswd,repeatpswd,email);

    newpswd = md5(newpswd)+secretKey;
    console.log(newpswd)
    const connection = await pool.getConnection();
    connection.release();
    const sql = `UPDATE users SET password='${newpswd}' where email='${email}'`
    const resultQuery = await connection.query(sql);
    console.log(resultQuery);
    
   
})



// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('');
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
    });
};

// LOGINN ENDPOINT
route.get('/jwt_login', (req, res) => {
    res.render('form-authentication/jwt_login')
})

route.post('/jwt_login', async (req, res) => {
    const connection = await pool.getConnection();
    connection.release();
    const salt = 'mysecret';
    const username = req.body.email;
    const pswd = req.body.password;
    try {

        // console.log(username, pswd);
        let pwd = md5(pswd) + salt;
        // console.log("pewd", pwd);

        const sql1 = `select email from users where email='${username}';`;
        const [email] = await connection.query(sql1);
        // console.log('user email', email);

        const sql2 = `select password from users where password='${pwd}';`;
        const [password] = await connection.query(sql2);
        // console.log('user password', password);
        const sql3 = `select * from users ;`;
        const [data] = await connection.query(sql3);
        console.log('user data', data);

        //check password...
       function generateToken(data){
        console.log("generateToken")
        const token = jwt.sign(data,salt,{expiresIn : '1h'})
        console.log("generateToken", token)
        return token;
       }

       //generate tokens for the sample user...
       const token = generateToken(data);
       console.log('generated Token:' ,token);

    }
    catch (error) {
        return error;
    }
    res.render('form-authentication/jwt_login')
});

route.get('/user',authenticateToken,(rea,res) => {
    
    
    
})



module.exports = route;