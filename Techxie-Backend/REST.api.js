//https://medium.com/@srirammaus/how-to-solve-nodejs-multer-req-files-is-undefined-1e2064cc1afa
/*REST -  representational state transfer
In nodejs rest api directly means the server.js
The work of REST api is to give proper response if their[user request to server] condition get fails
* express.static  makning as root
Techxie should be the home page no problem , if logged in or not ,if tools like drive or pdfviewer should be opened it need to signup 

*/
let dotenv = require('dotenv');
dotenv.config({path:'ADDR.env'});

const HOST =process.env.HOST ;
const PORT = process.env.PORT;

var http = require('http')
var path = require('path')
var express = require('express');
var bodyParser = require('body-parser');
var app =  express();
var multer = require('multer');



// var drive_upload =  require('./api/drive.upload.api.js');
// var pdfupload = require('./api/pdf.upload.api.js');
// var toolBtn = require('./api/toolBtn.api.js');
// var convert = require('./api/converter.api.js');

 
//routers
var UserRoute = require('./api/routers/UserRoute.api.js');
var openAPI = require('./api/routers/openAPI.api.js');
var PageRoute = require('./api/routers/PageRoute.api.js')

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('D:/Techxie'));
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


app.all('*', function (req, res) { //useful // 404 
   res.status(404)
   res.send("No Page Found!");
})
try {
   var service = app.listen(PORT,HOST,(req,res) =>{
      var ADDR = service.address().address;
      var PORT = service.address().port;
      console.log("Running in http://%s : %s",ADDR , PORT);
   })
}catch(err) {
   console.log("something went wrong");
   //emergency email alret 
   //server down alert 
   //enable backup server
}

//interceptor
// const server = http.createServer(app);

// server.listen("5000",'192.168.43.98');
// app.get('/fetch_test',function(req,res){
//    res.sendFile(__dirname + '/api/fetch_.html');
// })