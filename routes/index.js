const express = require('express');
const route = express.Router();
const {kukucube} = require('../controller/kukucube')
const {main} = require('../controller/main')
const {dynamictable} = require('../controller/dynamictable')
const {tictactoe} = require('../controller/tictactoe')
const {website1} = require('../controller/website1')
const {website2} = require('../controller/website2')
const {website3} = require('../controller/website3')
const {basicdetailsget,basicdetailpost,userdata} = require('../controller/curdoperation')
const {paginationfilter} = require('../controller/pagination')
const { paginationresult,paginationresultstudent} = require('../controller/paginationresult')
const {paginationOrderBy} = require('../controller/paginationOrderBy')
const {searchingGet,searchingPost} = require('../controller/delimiter')
const {getForm,postForm,display,update_get,fetch,update_post} = require('../controller/form')
const {formIndexGet,formIndexPost,activationLinkGet,showResponse,activationLinkPost,createPswdGet,createPswdPost,loginGet,loginPost,forgetPswdGet,forgetPswdPost,
    updatePswdGet,updatePswdPost,loginGetJwt,loginPostJwt} = require('../controller/formAuthentications')

//dynamictable route
route.get('/dynamictable',dynamictable)
//kukucube route
route.get('/kukucube',kukucube)
// main page route
route.get('/index',main)
//tictactoe route
route.get('/tictactoe',tictactoe )

// all three website route
route.get('/website1',website1 )
route.get('/website2',website2 )
route.get('/website3',website3 )

//form to insert json file route
route.get('/form', basicdetailsget);
route.post('/form',basicdetailpost );
route.get('/userdata/:user_Id',userdata);

//pagination filter route
route.get('/pagination',paginationfilter);

//pagination result route
route.get('/paginationresult',paginationresult )
route.get('/student/:student_id',paginationresultstudent);

//pagination order by route
route.get('/paginationorderby',paginationOrderBy)

//delimiter search route
route.get("/searching",searchingGet);
route.post("/searching",searchingPost)

//form-operation route
{getForm,postForm,display,update_get,fetch,update_post}
route.get("/form-operation",getForm)
route.post("/form-operation",postForm)
route.get('/display',display)
route.get("/update/:id",update_get)
route.get("/fetch/:id",fetch)
route.post("/update/:id",update_post)

// form authentications
route.get('/',formIndexGet)
route.post('/',formIndexPost)
route.get('/generate-activation-link', activationLinkGet)
route.get('/showResponse',showResponse);
route.post('/generate-activation-link',activationLinkPost)
route.get('/create-password',createPswdGet)
route.post('/create-password',createPswdPost )
route.get('/login',loginGet )
route.post('/login',loginPost);
route.get('/forgot-password',forgetPswdGet )
route.post('/forgot-password',forgetPswdPost )
route.get('/updatepswd',updatePswdGet)
route.post('/updatepswd',updatePswdPost )
route.get('/jwt_login',loginGetJwt)
route.post('/jwt_login',loginPostJwt);

module.exports = route;