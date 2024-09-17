//middleware function for  authorization //try
//OAuth authorization 
//This is the default callback url we will provide
//Three different database , web  desk app .kindly propery route everything
//TRY
//N
var Auth_ = require('./../lib/Authorization').Auth;
var filter = require('./../lib/filter.js')
var ExceptionHandler = require('./../lib/ExceptionHandlers.js')
var util = require('./../lib/util.js');

function OAuth(req,res,next){
	console.log(req.cookies)
	console.log('-----')
	let properties = ["cookies"];
    let requiredParams= ["username","userID","request","sessionID"]; // grant code and refresh _token checked later
	try {
		filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
			var def_result;
			var userID = req.cookies.userID;    
			var username = req.cookies.username;
			var request = req.cookies.request; //two types: REFRESH ,another type is:GRANT_CODE
			var sessionID = req.cookies.sessionID;
			var Auth = new Auth_();
			if(typeof request == "undefined" || request == null && username == "undefined" || username == null && sessionID == null || typeof sessionID == "undefined" && userID == null || typeof userID == "undefined"){
				
				// console.log(req.cookie)
				next(new ExceptionHandler.BadRequest("Invalid Request"))
			}else if(request == "GRANT_CODE"){
				//authorization via grant code
				// creation of new session
				var grant_code = req.cookies.grant_code; //int 
				if(grant_code != null || typeof  grant_code != "undefined" ){
					var f_grant_code = Number(grant_code);
					var new_session = Auth.newSession(userID,username.trim(),f_grant_code,sessionID,(err,result)=>{
						if(err){
							next(err)
						}else{
							if(result == null || typeof result == "undefined"){
								next( new ExceptionHandler.UnAuthorized ("Invalid username or  grant_code")) 
							}else{
								let cookieArr = [{
									name:"session_token",
									value:result?.session_token || result?.access_token,
									expires:result?.expiration,
								},
								{
									name:"refresh_token",
									value:result?.refresh_token,
								},
								{
									name:"username",
									value:result?.username,

								},
								{
									name:"userID",
									value:result?.userID,
								},
							]
							let erasingCookie =[{
								name:"grant_code",
								
							},
							{
								name:"request",
							},
							
						]
								util.delCookie(res,erasingCookie)
								util.setCookie(res,cookieArr);
								util.sendValidRes(res,1,"succesfully verified");
								
							}
						}
					})
				}else{
					next(new ExceptionHandler.BadRequest("Invalid Inputs"))
				}
			}else if(request == "REFRESH"){
				//authorization via refresh token
				///creation of new session
				var refresh_token = req.cookies.refresh_token;
				if(refresh_token != null ||  typeof refresh_token != "undefined" ){
					var refresh_session =  Auth.refreshSession(userID,username,refresh_token,sessionID,(err,result)=>{
						if(err){
							next(err)
						}else{
							res.send(result)
						}
					})
				}else{
					next(new ExceptionHandler.BadRequest("Invalid Inputs"))
				}
			}else{
				next(new ExceptionHandler.InternalServerError("something went wrong"))
			}
		}else {next(new ExceptionHandler.InternalServerError("something went wrong"))}}).catch(err=>{next(err)})
	
	}catch(err) {
		next(err)
	}
   

}	



module.exports = {OAuth: OAuth}