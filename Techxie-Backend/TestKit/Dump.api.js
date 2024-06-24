const express = require('express');
const bodyparser = require('body-parser');
var multer = require(__dirname + '/multerchecking');
// var multer = require('multer');
// var upload = multer({dest: __dirname + '/'})
var app =  express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/upload',multer.multer,(req,res)=>{

	// res.send("res")
})
var service = app.listen(80,(req,res) =>{
   var addr = service.address().address;
   var port = service.address().port;
   console.log("Running in http://%s : %s",addr , port);
})