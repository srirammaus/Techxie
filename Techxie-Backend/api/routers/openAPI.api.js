//API

const express = require('express'); //try
const router = express.Router();
var tools_lst = require('../features/tools.lst.api.js');
var ExceptionHandler = require('../../lib/ExceptionHandlers.js');
router.use(express.static('D:/Techxie'));

router.post('/tools_lst', tools_lst.tools_lst_fn,function(req,res){

})

router.all('*',function(req,res,next){
    next(new ExceptionHandler.NotFound("Not Found",404))
})
// create contact api techxie home page
module.exports = router;