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
var verifyMail = require('../verifyMail.api.js');
var confirmMail = require('../confirmMail.api.js')
var server_validater = require('../server.validater.api.js');
var UserPageRoute = require('./UserPageRoute.api.js');
var HandlePage = require ('../../lib/HandlePageUser.js');
var drive_upload =  require('../features/drive.upload.api.js');
var pdfupload = require('../features/pdf.upload.api.js');
var toolBtn = require('../features/toolBtn.api.js');
var convert = require('../features/converter.api.js');
const { rmSync } = require('fs');



const router =  express.Router();
router.use(express.static('D:/Techxie'));

//routerMiddleWare
function Authentication (req,res,next) {
    // res.send("i can stop this..")
    next();   
}
router.use(Authentication);
router.use('/page',UserPageRoute)

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

 router.post('/api/upload',drive_upload.upload ,function(req, res){

 })
router.post('/api/pdfupload',pdfupload.pdf_upload,function (req,res){
   
 }) //pdf upload , it will verify the token
router.post ('/api/tools',toolBtn.toolBtn,function(req,res){
 
 })//if there is already session it wont produce new, else it prduce new session
router.post('/api/convert',convert.convert,(req,res)=>{
 
 })//convert the already uploaded image to pdf, with csrf and OAuth 
 //testing purpose
 router.all('*',function(req,res,next){
    res.status(404)
    res.send("Nothing to see here")
})
module.exports = router;