var Folder = require('../../../lib/Folder.js');
var ExceptionHandler =require('../../../lib/ExceptionHandlers.js');
var filter = require('../../../lib/filter.js');
var util = require('../../../lib/util.js');
const e = require('express');

function pdfViewerMiddleware(req,res,next)  {
    // let properties = ["cookies"];
    // let requiredParams= ["username","userID","F_num"];
    // filter.Filter(req,response,next,properties,requiredParams).then(flag=>{if(flag == 1){
    try {
        let properties = ["body"];
        let requiredParams= ["URL"]
        console.log(req.body)
        filter.Filter(req,res,next,properties,requiredParams).then(()=>{
            let URL =  req.body.URL;
            
        }).catch(err =>{
            next(err)
        })
    }catch (err) {
        next(new ExceptionHandler.PageError("Internal server error"))
    }
    

 
}

module.exports = {pdfViewerMiddleware}
