const express = require('express');//try
const router = express.Router();

router.use(express.static('D:/Techxie'));


 router.get('/newuser',function(req,res,next) {
    res.sendFile('D:/Techxie/pages/signup.html');
})
router.get('/drive',function(req,res,next){
    res.sendFile("D:/Techxie/pages/webdrive.html");
})
router.get('/login',function(err,res){
    res.sendFile("D:/Techxie/pages/login.html")
})
router.get('/pdfViewer',function(req,res) {
    res.sendFile('D:/Techxie/pdfViewer.html')
 })
 router.get('/videoplayer',function(req,res) {
    res.sendFile('D:/Techxie/videoplayer/videoPlayer.html')
 })
 router.get("/playground",function(req,res) {
    res.sendFile('D:/Techxie/playground.html')
 })
 //testing purpose
 router.all('*',function(req,res,next){
    res.status(404)
    res.send("Nothing to see here")
})

module.exports = router;