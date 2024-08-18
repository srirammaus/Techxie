const express = require('express');

var fetchFile = require('../features/fetchFile.api.js');
var drive_upload =  require('../features/drive.upload.api.js');

const router =  express.Router();
router.use(express.static('D:/Techxie'));

router.post('/upload',drive_upload.upload,fetchFile.MiddleWare(1),function(req, res){

})
router.post('/insertFile',fetchFile.MiddleWare(1),function(req,res){ //createFile
    
})
router.post('/viewFile',fetchFile.MiddleWare(2),function(req,res){  //viewFile items
    
})
router.post('/delFile',fetchFile.MiddleWare(3),function(req,res){ //del File
    
})
router.post('/getFileInfo',fetchFile.MiddleWare(5),function(req,res){ //get File info 
    
})


module.exports = router