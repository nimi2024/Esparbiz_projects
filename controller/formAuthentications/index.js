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
const common_sql = ``

const formIndexGet = (req, res) => {
    res.render('form-authentication/index.ejs');
}

const formIndexPost = async (req, res) => {
    let ele = req.body;
    const salt = "mysecret"
    console.log(ele);
    let sql1 = `insert into users(username,address,dob,pincode,course,email,gender,salt) values(?,?,?,?,?,?,?,?)`;
    const result = await db.query(sql1, [ele.username, ele.address, ele.dob, ele.pincode, ele.course, ele.email, ele.gender, (salt)]);
    console.log('result', result)
    let sql2 = 'select * from users;'
    const result2 = await db.query(sql2);
    console.log('sql2', sql2);
    console.log('result2', result2)
    console.log(result[0].insertId);

    res.send({ lastid: result[0].insertId })
}

const activationLinkGet = (req, res) => {

    res.render('form-authentication/generateLink')
}
const showResponse = (req, res) => {
    res.send("Your password created successfully!.....")
}
const activationLinkPost = (req, res) => {
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
}
const createPswdGet = (req, res) => {
    // console.log(req.params.token_url);
    res.render('form-authentication/createpswd');
}
const createPswdPost = async (req, res) => {
    let password = req.body.password;
    let repeatPassword = req.body.repeatpassword;
    const result = await db.query('select * from database_operation.users')
    if (result[0].error) throw new Error(result[0].error.message);
    const lastId = result[0].length;
    console.log('lastId is', lastId)
    const salt = 'mysecret';
    console.log('salt', salt)
    const pswd = md5(password) + salt
    console.log("passsword is", pswd)
    const updateQuery = `update users set password = ? where id = ?`
    const update = await db.query(updateQuery, [pswd, lastId]);
    if (update[0].error) throw new Error(result[0].error.message);
    console.log("Data updated sucessfully");
    res.send('form-authentication/createpswd')
}

const loginGet = (req, res) => {
    res.render('form-authentication/login')
}
const loginPost = async (req, res) => {
    var salt = 'mysecret';
    let email = req.body.email;
    console.log(email, "email is");
    let password = req.body.password;
    console.log(password, "password is");
    const sql1 = `select * from users where email = ?`
    const record = await db.query(sql1, [email]);
            console.log('record',record[0]);
            console.log('email is:', email);
            console.log(salt, "salt")
            password = md5(password) + salt
            console.log("paword of login page", password)
            let user_data = record[0];
            if ((user_data[0].email === email) && (user_data[0].password === password)) {
                console.log('Login Successfully.......');
                res.send({userdata: user_data[0]})

            } else {
                console.error('Please Enter Valid Email And Password');

            }
}

const forgetPswdGet = (req, res) => {
    // console.log(req.params.token_url);
    res.render('form-authentication/forgotpassword')
}
const forgetPswdPost = (req, res) => {

    const email = req.body.email
    console.log("email is", email)
    const password = req.body.password
    console.log("password", password)

    if (!email) {
        return res.status(400).json({ error: 'Email is require' });
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

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
const updatePswdGet = (res, req) => {
    req.render('form-authentication/pswdReset');
}
const updatePswdPost = async (req, res) => {

    let data = req.body;
    console.log(data, "fromjs")
    let newpswd = req.body.newpassword;
    let repeatpswd = req.body.repeatpassword;
    let email = req.body.email
    console.log(newpswd, repeatpswd, email);

    newpswd = md5(newpswd) + secretKey;
    console.log(newpswd)
    const connection = await pool.getConnection();
    connection.release();
    const sql = `UPDATE users SET password='${newpswd}' where email='${email}'`
    const resultQuery = await connection.query(sql);
    console.log(resultQuery);
}
const loginGetJwt = (req, res) => {
    res.render('form-authentication/jwt_login')
}
const loginPostJwt = async (req, res) => {
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
        function generateToken(data) {
            console.log("generateToken")
            const token = jwt.sign(data, salt, { expiresIn: '1h' })
            console.log("generateToken", token)
            return token;
        }

        //generate tokens for the sample user...
        const token = generateToken(data);
        console.log('generated Token:', token);

    }
    catch (error) {
        return error;
    }
    res.render('form-authentication/jwt_login')
}
module.exports = {
    formIndexGet, formIndexPost, activationLinkGet, showResponse, activationLinkPost, createPswdGet, createPswdPost, loginGet, loginPost, forgetPswdGet,
    forgetPswdPost, updatePswdGet, updatePswdPost, loginGetJwt, loginPostJwt
}