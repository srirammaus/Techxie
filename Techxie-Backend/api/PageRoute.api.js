const express = require('express');
const router = express.Router();

router.use(express.static('D:/Techxie'));

router.get('/',function(req,res){
    res.sendFile("D:/Techxie/pages/techxie.html")
})

module.exports = router;