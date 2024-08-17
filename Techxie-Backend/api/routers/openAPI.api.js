const express = require('express'); //try
const router = express.Router();
var tools_lst = require('../features/tools.lst.api.js');

router.use(express.static('D:/Techxie'));

router.post('/tools_lst', tools_lst.tools_lst_fn,function(req,res){

})
module.exports = router;