//https://medium.com/@srirammaus/how-to-solve-nodejs-multer-req-files-is-undefined-1e2064cc1afa
/**
 * This is RESTful web api ,written in nodejs
 * In nodejs rest api directly means the server.js
 * The work of REST api is to give proper response if their[user request to server] condition get fails
 * express.static  makning as root
 * Techxie should be the home page no problem , if logged in or not ,if tools like drive or pdfviewer should be opened it need to signup 
 * REST -  representational state transfer
 * create e APM [aapplication performance monitoring tool, which is basic works are gettig log , gettginn data from db , error]
 * 
 */


let dotenv = require('dotenv');
dotenv.config({path:'ADDR.env'});

const HOST =process.env.HOST ;
const PORT = process.env.PORT;

var http = require('http')
var path = require('path')
var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var filter = require('./lib/filter.js')
var ErrorMiddleware = require('./api/ErrorMiddleware.api.js');
var ExceptionHandler = require('./lib/ExceptionHandlers.js')
var app =  express();




 
/**
 * Routers
 */
var UserRoute = require('./api/routers/UserRoute.api.js');
var openAPI = require('./api/routers/openAPI.api.js');
var PageRoute = require('./api/routers/PageRoute.api.js');
const { errorMonitor } = require('events');
/**
 * Middleware 
 *  middlware , the return like syntax provide either resolve or rejcet
 * -----------
 * Error Handling
 * Two types of Error operational error and functional error[programmer error(eg logic misleads)] these are the very basic error in porgamming
 * All the function in library were construct with call back function
 * so i just wrapped the every function which i fetch from the lib to promise, in the middlware files .
 * like example if i get file.getInfo from lib/files.js to api/fetchFile , now i just wrap the file.getInfo with promise 
 * if any rejection err caused it caught by promise.catch() and 
 * if any unknow error like refrence type erro then it caught try caught within the promise function
 *  kindly go though fetchFile.js if any doubt 
 * why try caught within the promise because the promise is also behave settimout or async so clean idea is that if async err it caught by
 * our promise.catch and if any thrown err we have to catch within our promise not in OUTSIDE 
 */



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('D:/Techxie'));

app.use(ErrorMiddleware.caughtAnyExceptions)
app.use('/User',UserRoute)
app.use('/api',openAPI);
app.use('/page',PageRoute);

app.get('/',function(req,res){
   res.sendFile('D:/Techxie/pages/techxie.html')
})

app.get('/pentesting',function(req,res){ //need to check
   var username = req.query.username;
   console.log(username);
   res.send(username)
})

app.get('/email',function(req,res){
   res.sendFile("D:/Techxie/pages/email.html")
})
app.get('/errtest',function(req,res,next) {
   throw new ExceptionHandler.BadRequest("Error Testing")
})
app.post('/filterTest',function(req,res){
  
})

app.use(ErrorMiddleware.ErrorMiddleware);

app.all('*', function (req, res) { //useful // 404 
   res.status(404)
   res.send("No Page Found!");
})
/**
 * Try .. catch will pass them to respected Error Middleware
 */
try {

   let service =app.listen(PORT,HOST,(err) =>{
      if(err) console.log(err + "Err")
      var ADDR = service.address().address;
      var PORT = service.address().port;
      console.log("Running in http://%s : %s",ADDR , PORT);
   })
}catch(err) {
   console.log("I catch at REST.api.js")
   next(err);
   
}



//interceptor
// const server = http.createServer(app);

// server.listen("5000",'192.168.43.98');
// app.get('/fetch_test',function(req,res){
//    res.sendFile(__dirname + '/api/fetch_.html');
// })