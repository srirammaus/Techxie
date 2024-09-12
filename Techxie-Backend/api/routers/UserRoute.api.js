/**
 * API
 * API's we have are
 * signup - for signup 
 * login - for login
 * pdfupload - upload pdf's require 
 * OAuth
 * tools.lst
 * driveupload
 * server.validata - username verifier
 * toolBtn - any btn either pdf tools or drive
 * verifyemail
 * xsrf
 * converter
 * 
 * upcoming - files and folder
 * 
 * singup gives verification token , once verified redirected to login page
 * login done once , OAuth happens
 */
var path = require('path');
const express = require('express');
var drive_signup = require('../drive.signup.api.js');
var ExceptionHandler = require('../../lib/ExceptionHandlers.js');
var xsrf = require('../xsrf.api.js');
var xsrf_verification = require('../xsrf_verification.api.js');
var login = require('../login.api.js');
var OAuth = require('../OAuth.api.js');
var Auth = require('../Auth.api.js');
var verifyMail = require('../verifyMail.api.js');
var confirmMail = require('../confirmMail.api.js');
var server_validater = require('../server.validater.api.js');
var UserPageRoute = require('./UserPageRoute.api.js');
var HandlePage = require ('../../lib/HandlePageUser.js');
var pdfupload = require('../features/pdf.upload.api.js');
var toolBtn = require('../features/toolBtn.api.js');
var convert = require('../features/converter.api.js');
var UserFolderRoute = require('./UserFolderRoute.api.js');
var UserFileRoute =require('./UserFileRoute.api.js');
var changePwd = require('../features/changePwd.api.js');
var tools_lst = require('../features/tools.lst.api.js')
const { rmSync } = require('fs');




const router =  express.Router();
router.use(express.static('D:/Techxie'));

//routerMiddleWare

// router.use(Authentication);

router.use('/page',Auth.AuthMiddleWare,UserPageRoute) 
router.use('/folder',Auth.AuthMiddleWare,UserFolderRoute);//,Auth.AuthMiddleWare,UserFolderRoute)
router.use('/file',UserFileRoute);  //here you cant because you having multer , you can also sepearte multipart data before it , but it get omplex , becaue i hvae already made oauth niside the multer

router.post('/api/UserVerification',server_validater.validater,function(req,res){

}) // used for getting user id before signup
router.post('/api/signup',drive_signup.signup,function(req,res){
    console.log(typeof(req.body.userID))
 
 })// used for signup
 router.post('/api/verifyMail',verifyMail.verifyMailMiddleWare,function(req,res){ //create token for mail  and send 

 }).get('/api/verifyMail/:token',confirmMail.confirmMailMiddleWare,function(req,res){ //confirm mail
 // res.send(req.params.token)
 })
router.post('/api/login',login.login,function(req,res){ // OAuth.authentication (new token request)

    
}) // used to login , request is username,password; response is grant_code,username,scopes
router.post('/api/OAuth',OAuth.OAuth,function(req,res){ //OAuth.authorization (new session) // +  refresh sessions

}) // new session req: username, grant_code, request_type//refresh session


router.post('/api/verify',Auth.AuthMiddleWare,xsrf.xsrf,function(req,res){ 

})//generate csrf 

router.get('/api/tools_lst',tools_lst.tools_lst_fn,function(req,res){

})//list out the tools we have
router.post('/api/pdfupload',pdfupload.pdf_upload,testMiddleware,function (req,res){//pdf upload , it will verify the token   
  
 }) // it is used to upload the pdf file and store it in bucket

router.post('/api/convert',Auth.AuthMiddleWare,xsrf_verification.xsrf_verificationMiddleware,convert.convert,(req,res)=>{
 
 })//convert the already uploaded image to pdf, with csrf and OAuth 
 router.post('/api/changePwd',Auth.AuthMiddleWare,xsrf_verification.xsrf_verificationMiddleware,changePwd.changePwdMiddleWare,function(req,res) {
    
 })//change passsword api  it has multiple ways , but right now we have old and new password option

router.post('/api/changeMail',function(req,res){ //Not created yet

})
//-------------------
//No need 
router.post ('/api/tools',Auth.AuthMiddleWare,toolBtn.toolBtn,function(req,res){//if there is already session it wont produce new, else it prduce new session
 
})//This will redirect the respected tool page
//------------------------
function testMiddleware (req,res,next) {

    next();
}

// router.use(errHandler)
// router.post('/api/AuthTest',Auth.AuthMiddleWare,function(req,res){//testing purpose
//     res.send("The function should reach here")
// })
 
 router.all('*',function(req,res,next){
    console.log(req.headers)
    next(new ExceptionHandler.NotFound("Not Found",404))
})
module.exports = router;



/**
 * Eroor 
 * ADDR not avil Error
 * Reference eror by making response to res where the res used as (err,res) =>{...}
 * typeerror happening and nodemon crashed while router.get(..,fetchFile.test) instead of fetchfile.middleware
 * 
 * --- some answers
 * it having within the promise so it is not catch by express error ahndler
 */