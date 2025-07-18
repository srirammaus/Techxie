
//This will fetch data from db collection
var filter = require('../../lib/filter.js');
const Folder = require('../../lib/Folder.js')
var ExceptionHandler =  require('../../lib/ExceptionHandlers.js');
var result = {
	status:0,
	message:"something went wrong",
}
let username,F_id ;
let userID;
let F_name;
let F_num; // for create folder - current forlder where eit is creating, for del foler the number is delete folder
let folder = new Folder.Folder();
function Rename (req,res,next) {
	console.log(req.cookies)
	console.log('-----')
	let properties = ["cookies"];
    let requiredParams= ["username","userID","request","sessionID"]; // grant code and refresh _token checked later

}
module.exports = {Rename: Rename}