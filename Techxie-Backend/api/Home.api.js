//Home api
//middleware function
var OAuth  = require('./../lib/OAuth.js').OAuth;
function home(req,res,next){
	var userID,username,session_token,result;
	userID = req.body.userID;
	username =req.body.username;
	session_token = req.body.session_token;

	if(typeof userID == "undefined" || userID == null &&  username == null || typeof username  == "undefined" && session_token == null || typeof session_token == "undefined"){
		result = {Error: "Invalid Input fields"}
		res.send(result);
	}else{
		Auth = new OAuth().Authenticate(username,session_token,(err,results)=>{
			if(err){
				result = {Error: err.message}
				res.send(result);
				//redirect to login page
			}else{
					
			}
		})
	}
}