/**
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
var xsrf = require('../xsrf.api.js')
var login = require('../login.api.js');
var OAuth = require('../OAuth.api.js');
var Auth = require('../Auth.api.js');
var verifyMail = require('../verifyMail.api.js');
var confirmMail = require('../confirmMail.api.js');
var server_validater = require('../server.validater.api.js');
var UserPageRoute = require('./UserPageRoute.api.js');
var HandlePage = require ('../../lib/HandlePageUser.js');
// var drive_upload =  require('../features/drive.upload.api.js');
var pdfupload = require('../features/pdf.upload.api.js');
var toolBtn = require('../features/toolBtn.api.js');
var convert = require('../features/converter.api.js');
var UserFolderRoute = require('./UserFolderRoute.api.js');
var UserFileRoute =require('./UserFileRoute.api.js');
const { rmSync } = require('fs');



const router =  express.Router();
router.use(express.static('D:/Techxie'));

//routerMiddleWare

// router.use(Authentication);
function testMiddleWare(req,res,next) {
    console.log(req.body.username + "  test middleware 11")
    next()
    
}
router.use('/page',UserPageRoute) 
router.use('/folder',UserFolderRoute);//,Auth.AuthMiddleWare,UserFolderRoute)
router.use('/file',UserFileRoute);

router.post('/api/login',login.login,function(req,res){ // OAuth.authentication (new token request)

    
}) // used to login , request is username,password; response is grant_code,username,scopes
router.post('/api/OAuth',OAuth.OAuth,function(req,res){ //OAuth.authorization (new session) // +  refresh sessions

}) // new session req: username, grant_code, request_type//refresh session
router.post('/api/signup',drive_signup.signup,function(req,res){
    console.log(typeof(req.body.userID))
 
 })// used for signup
router.post('/api/UserVerification',server_validater.validater,function(req,res){

}) // used for getting user id before signup
router.post('/api/verify',xsrf.xsrf,function(req,res){ // i think this for test purpose

})
router.post('/api/changeMail',function(req,res){

})
router.post('/api/verifyMail',verifyMail.verifyMailMiddleWare,function(req,res){ //create token for mail 

}).get('/api/verifyMail/:token',confirmMail.confirmMailMiddleWare,function(req,res){ //confirm mail
// res.send(req.params.token)
})

router.post('/api/pdfupload',pdfupload.pdf_upload,function (req,res){//pdf upload , it will verify the token
   
 }) 
router.post ('/api/tools',Auth.AuthMiddleWare,toolBtn.toolBtn,function(req,res){//if there is already session it wont produce new, else it prduce new session
 
 })
router.post('/api/convert',Auth.AuthMiddleWare,convert.convert,(req,res)=>{//convert the already uploaded image to pdf, with csrf and OAuth 
 
 })



// router.post('/api/AuthTest',Auth.AuthMiddleWare,function(req,res){//testing purpose
//     res.send("The function should reach here")
// })
 
 router.all('*',function(req,res,next){
    res.status(404)
    res.send("Nothing to see here")
})
module.exports = router;

/***
 * we can add folder to deleted folder
 * we can even del main or root dir by making it inactive
 *  */