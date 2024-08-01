
var path = require('path');
const express = require('express');
var drive_signup = require('./drive.signup.api.js');
var xsrf = require('./xsrf.api.js')
var login = require('./login.api.js');
var OAuth = require('./OAuth.api.js');
var server_validater = require('./server.validater.api.js');

var HandlePage = require ('../lib/HandlePageUser.js');

const router =  express.Router();
router.use(express.static('D:/Techxie'));
//routerMiddleWare
function Authentication (req,res,next) {
    //This request routes at first
    next();   
}
router.use(Authentication);

router.get('/newuser',function(req,res,next) {
    res.sendFile('D:/Techxie/signup.html');
})
router.get('/drive',function(req,res,next){
    res.send("D:/Techxie/webdrive.html");
})

router.post('/login',login.login,function(req,res){ // OAuth.authentication (new token request)

}) // used to login , request is username,password; response is grant_code,username,scopes
router.post('/OAuth',OAuth.OAuth,function(req,res){ //OAuth.authorization (new session) // +  refresh sessions

}) // new session req: username, grant_code, request_type//refresh session
router.post('/signup',drive_signup.signup,function(req,res){
    console.log(typeof(req.body.userID))
 
 })// used for signup
 router.post('/UserVerification',server_validater.validater,function(req,res){
    
 }) // used for getting user id before signup
 router.post('/verify',xsrf.xsrf,function(req,res){
 
 })//testing purpose
 router.all('*',function(req,res,next){
    res.send("Nothing to see here")
})
module.exports = router;