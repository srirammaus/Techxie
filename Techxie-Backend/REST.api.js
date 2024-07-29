//https://medium.com/@srirammaus/how-to-solve-nodejs-multer-req-files-is-undefined-1e2064cc1afa
/*REST -  representational state transfer
In nodejs rest api directly means the server.js
The work of REST api is to give proper response if their[user request to server] condition get fails
* express.static  makning as root
*/

var path = require('path')
var express = require('express');
var bodyParser = require('body-parser');
var HandlePage = require('./api/HandlePage.api.js');
var app =  express();
var multer = require('multer');
var drive_upload =  require('./api/drive.upload.api.js');
var drive_signup = require('./api/drive.signup.api.js')
var server_validater = require('./api/server.validater.api.js');
var xsrf = require('./api/xsrf.api.js')
var pdfupload = require('./api/pdf.upload.api.js');
var toolBtn = require('./api/toolBtn.api.js');
var login = require('./api/login.api.js');
var OAuth = require('./api/OAuth.api.js');
var convert = require('./api/converter.api.js');
var tools_lst = require('./api/tools.lst.api.js')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('D:/Techxie'));
app.get('/fetch_test',function(req,res){
   res.sendFile(__dirname + '/api/fetch_.html');
})
app.get('/tools_lst', tools_lst.tools_lst_fn,function(req,res){

})
app.post('/upload',drive_upload.upload ,function(req, res){

})
app.get('/pentesting',function(req,res){ //need to check
   var username = req.query.username;
   console.log(username);
   res.send(username)
})
app.post('/signup',drive_signup.signup,function(req,res){
   console.log(typeof(req.body.userID))

})// used for signup
app.post('/UserVerification',server_validater.validater,function(req,res){
   
}) // used for getting user id before signup
app.post('/verify',xsrf.xsrf,function(req,res){

})//testing purpose
app.post('/pdfupload',pdfupload.pdf_upload,function (req,res){
   
}) //pdf upload , it will verify the token
app.post ('/tools',toolBtn.toolBtn,function(req,res){

})//if there is already session it wont produce new, else it prduce new session
app.post('/convert',convert.convert,(req,res)=>{

})//convert the already uploaded image to pdf, with csrf and OAuth 
app.post('/login',login.login,function(req,res){ // OAuth.authentication (new token request)

}) // used to login , request is username,password; response is grant_code,username,scopes
app.post('/OAuth',OAuth.OAuth,function(req,res){ //OAuth.authorization (new session) // +  refresh sessions

}) // new session req: username, grant_code, request_type//refresh session
app.get('/page',HandlePage.sendPage ,function(req,res){
   
})
app.all('*', function (req, res) { //useful
    res.send("No Page Found!");
})
var service = app.listen(5000,(req,res) =>{
   var ADDR = service.address().address;
   var PORT = service.address().port;
   console.log("Running in http://%s : %s",ADDR , PORT);
})
//interceptor
// const server = http.createServer(app);

// server.listen("4444");