//middleware function for  authorization
//OAuth authorization 
//This is the default callback url we will provide
//Three different database , web  desk app .kindly propery route everything
var Auth_ = require('./../lib/Authorization').Auth;
function OAuth(req,res,next){
	var def_result;
	var userID = req.body.userID;
	var username = req.body.username;
	var request = req.body.request; //two types: REFRESH ,another type is:GRANT_CODE
	var sessionID = req.body.sessionID;
	var Auth = new Auth_();
	if(typeof request == "undefined" || request == null && username == "undefined" || username == null && sessionID == null || typeof sessionID == "undefined" && userID == null || typeof userID == "undefined"){
		
		// console.log(req.body)
		def_result = {Error: "Invalid request"}
		res.send(def_result);
	}else if(request == "GRANT_CODE"){
		//authorization via grant code
		// creation of new session
		var grant_code = req.body.grant_code; //int 
		if(grant_code != null || typeof  grant_code != "undefined" ){
			var f_grant_code = Number(grant_code);
			var new_session = Auth.newSession(userID,username.trim(),f_grant_code,sessionID,(err,result)=>{
				if(err){
					def_result = {Error: err.message}
					res.send(def_result);
				}else{
					if(result == null || typeof result == "undefined"){
						def_result = {Error: "Invalid username or  grant_code"} //NOTE
					}else{
						res.send(result);
					}
				}
			})
		}else{
			def_result = {Error: "Invalid inputs"}
			res.send(def_result)
		}
	}else if(request == "REFRESH"){
		//authorization via refresh token
		///creation of new session
		var refresh_token = req.body.refresh_token;
		if(refresh_token != null ||  typeof refresh_token != "undefined" ){
			var refresh_session =  Auth.refreshSession(userID,username,refresh_token,sessionID,(err,result)=>{
				if(err){
					def_result = {Error: err.message}
					res.send(def_result);
				}else{
					res.send(result)
				}
			})
		}else{
			def_result = {Error: "Invalid inputs"}
			res.send(def_result)
		}
	}else{
		def_result = {Error:"something went wrong"}
		res.send(def_result)
	}
}	

module.exports = {OAuth: OAuth}