const express = require('express');

var fetchFile = require('../features/fetchFile.api.js');
var drive_upload =  require('../features/drive.upload.api.js');
var Auth = require('../Auth.api.js');

const router =  express.Router();
router.use(express.static('D:/Techxie'));
function errHandler (err,req,res,next) {
    console.log("this happend")
    if(err) {
       res.send({err:err.message})
    }
 }

router.post('/upload',drive_upload.upload,fetchFile.MiddleWare(1),function(req, res){//multer //uploadFile 
/**
 * upload the file to respected bucket and
 *  update to the bucket info and drive info in db
 */
})
router.post('/getFileInfo',fetchFile.MiddleWare(2),function(req,res){ //,Auth.AuthMiddleWare,
    /** 
     * This should show the file info only whent the user only clikc the info button
     * Through  this info it provide the  link to reach the viewFile eg: http:://...../viewfile/userid/f_name
     */
})

router.get('/viewFile/:userID/:f_name',fetchFile.MiddleWare(3),function(req,res){  //viewFile items
    /**
     * with format like f_name.jpg while saving or uploading and now fetch it with normal browser get request it will show in browser else it makes download 
     * nowitself "http://192.168.43.98:5000/User/file/viewFile/6405/uOZ7du1mTP5Pf7U.jpg" this example file has been saved with extension other were not , if u need for 
     * any reason add code in the upload.js file
     * this should contain both get fil info data and 
     * respected file from the bucket
     */
})
router.post('/errtest',fetchFile.MiddleWare(6),function(req,res,next) {
    
})
router.use(errHandler)


module.exports = router