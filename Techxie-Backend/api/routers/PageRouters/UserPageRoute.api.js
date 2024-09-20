//pages

const express = require('express');//try
var ExceptionHandler = require('../../../lib/ExceptionHandlers.js')
var Handlebars = require("express-handlebars");
var path = require('path');
const { helpers } = require('handlebars');
var homeMiddleware = require('../pageMiddlewares/home.Middleware.js');
const { FORMERR } = require('dns');


const router = express.Router();
/**
 * Home page is techxie.html
 * sigup page 
 *  -userverificatiion
 *  - signup form 
 *  - email verification page
 * login 
 *  - login
 *  - email verification if not done
 * webdrive main page
 * webdrive Home
 * webdirve Recents
 * websrive settings
 * webdrive trash
 * pdfviewer 
 * videoplayer
 * 
 * Needed
 *  404 error page
 *  add scrollkit pages
 * 
 * 
 */


router.use(express.static('D:/Techxie/assets'));
router.use(express.static("D:/Techxie/scripts"))
router.use(express.static("D:/Techxie/pages"))
router.use(express.static("D:/Techxie/pages/errPages"))
router.use(express.static('./views'))


/**
 * handlebars- CSR
 */


 /**
  * handlebars - static
  */


router.get('/pdfViewer',function(req,res) {
  //chekc for ouath and send pdf
  res.sendFile('D:/Techxie/pages/pdfViewer.html') // this is from the file which saved in sepreate folder
})
router.get('/videoplayer',function(req,res) {
  //strem video and check for OAuth
  res.sendFile('D:/Techxie/pages/videoPlayer.html')
})
router.get('/settings',function(req,res){
   res.render('settings',{layout:false})

})

 /**
  * Handlebars --SSR
  */
 router.get('/drive',function(req,res,next){
   /**
    * Csrf initer api
    * This contains drive home
    * drive settings
    * drive Recents
    * drive Trash
    */
   // res.sendFile("D:/Techxie/pages/webdrive.html");
   res.render('webdrive',{layout:false})
})
//for now test it , later alter the homemiddleware, because it asking for username, userid ,everything .. once session management plan creted change it
 router.post('/home',homeMiddleware.homeMiddleware,function(req,res){ // In pages it should show internal server error as page and 404 not found page too
   let Folders = req.body.Folders;
   let Files = req.body.Files;
 
   res.render('home',{layout:false,Folders:Folders,Files:Files})

})
router.post('/Recents',function(req,res){
   res.render('Recents',{layout:false})

})
router.post('/Trash',function(req,res){
   res.render('Trash',{layout:false})

})
//---
router.get("/playground",function(req,res) {
   res.sendFile('D:/Techxie/playground.html')
})


router.all('*',function(req,res,next){
   next(new ExceptionHandler.PageNotFound("Page Not found",404))
})

module.exports = router;


// Handlebars.create({
//    helpers: {
//       foo() { return 'FOO!'; },
//       bar() { return 'BAR!'; }
//   }
// })


/**
 * Folders data -[
 * F_name:,
 * description: null,
 * ]
 * File data - [
 * f_name
 * thumbanails.., mostly pdf,audio,video
 * f_descripton
 * ]
 */

// ,Folders:[
//    {F_name:"Folder_1"},
//    {F_name:"Folder_2"},
//    {F_name:"Folder_3"}
// ],Files:[
//    {f_name:"file_1",description:"This is a description This is a description",type:"play"},
//    {f_name:"file_2",description:"This is a description",thumbnail:"/assets/svg/image.svg",type:"image"}
// ]})