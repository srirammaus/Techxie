
var tools_lst = require('./../lib/tools.list.js').tools_list;
//make a cj=heck here by username and sesison
function tools_lst_fn(req,res,next){
	var lst = tools_lst.lst();
	res.send(lst)
	next();
}
module.exports = {tools_lst_fn};