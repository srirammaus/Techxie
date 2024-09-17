const express = require('express');//try
const router = express.Router();
const ExceptionHandler = require("../../../lib/ExceptionHandlers.js")
router.use(express.static('D:/Techxie'));
/**
 * SSR
 * content-static content
 * project data in about may be added , so better to be non static
 * image gallery - so better to be non static
 * 
 */

/**
  * handlebars - static
  */
router.get('/',function(req,res){
    res.sendFile("D:/Techxie/pages/techxie.html")
})
 

router.get('/newuser',function(req,res,next) {
    /**
     * Userverificion api
     * signup form api
     * e -verification api
     */
    res.sendFile('D:/Techxie/pages/signup.html');
})
router.get('/login',function(err,res){
    /**
     * Login
     * if everifiation pednig it then shows
     */
    res.sendFile("D:/Techxie/pages/login.html")
})
router.all('*',function(req,res,next){
    next(new ExceptionHandler.PageNotFound("Page Not found",404))
})

module.exports = router;