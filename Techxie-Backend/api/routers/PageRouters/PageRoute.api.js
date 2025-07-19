const express = require('express');//try
const router = express.Router();
const ExceptionHandler = require("../../../lib/ExceptionHandlers.js")
router.use(express.static('../'));
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
    res.sendFile("../pages/techxie.html")
})
//  i changed the next line from home.html to techxie.html , 
router.get('/home',function(req,res,next){
    res.sendFile("../pages/techxie.html")
})
router.get('/newuser',function(req,res,next) {
    /**
     * Userverificion api
     * signup form api
     * e -verification api
     */
    res.sendFile('../pages/signup.html');
})
router.get('/login',function(err,res){
    /**
     * Login
     * if everifiation pednig it then shows
     */
    res.sendFile("../pages/login.html")
})
router.all('*',function(req,res,next){
    
    next(new ExceptionHandler.PageNotFound("Page Not found",404))
})

module.exports = router;