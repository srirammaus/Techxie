
var path = require('path');
var HandlePage = require ('./../lib/HandlePage.js');
// var FrontDir = require(path.join("D:/","Techxie"));

function sendPage (req,res) {

    res.sendFile('D:/Techxie/signup.html');
}
module.exports = {sendPage};