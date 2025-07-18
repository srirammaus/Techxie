//API

const express = require('express');
var fetchFolder = require('../../features/fetchFolder.api.js');

const router =  express.Router();
router.use(express.static('F:/nodejs/projects/Techxie/'));
router.post('/createFolder',fetchFolder.MiddleWare(1),function(req,res){ //createFolder
    
})
router.post('/viewFolder',fetchFolder.MiddleWare(2),function(req,res){  //viewFolder item
})
router.post('/delFolder',fetchFolder.MiddleWare(3),function(req,res){ //del folder
    
})
router.post('/getFolderInfo',fetchFolder.MiddleWare(5),function(req,res){ //get folder info 
    
})
router.post("/rename",fetchFolder.MiddleWare(6),function(req,res) {

})

module.exports = router