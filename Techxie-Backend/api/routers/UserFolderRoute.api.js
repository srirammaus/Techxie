const express = require('express');

var fetchFolder = require('../features/fetchFolder.api.js');

const router =  express.Router();
router.use(express.static('D:/Techxie'));

router.post('/createFolder',fetchFolder.MiddleWare(1),function(req,res){ //createFolder
    
})
router.post('/viewFolder',fetchFolder.MiddleWare(2),function(req,res){  //viewFolder items
    
})
router.post('/delFolder',fetchFolder.MiddleWare(3),function(req,res){ //del folder
    
})
router.post('/getFolderInfo',fetchFolder.MiddleWare(5),function(req,res){ //get folder info 
    
})

module.exports = router