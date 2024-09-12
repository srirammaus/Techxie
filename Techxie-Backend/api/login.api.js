// login middlleware
// This is the authentication api of OAuth 2.0 , through here authentication get granted , then next api provide OAuth acces token  \
//try
// N
//this should also check for the verified email
var login_lib =  require('./../lib/login.js').login;
var filter = require('./../lib/filter.js');
var ExceptionHandler =require('./../lib/ExceptionHandlers.js');
var util = require('../lib/util.js');

function login(req,res,next){
	let properties = ["body"];
    let requiredParams= ["username","password"]
	//redirect if there is already grant code, redirect it to OAuth session continuation
	if(req?.cookies?.sessionID &&req?.cookies?.grant_code) {
		// location.href = "http://techxie.local:5000/User/api/OAuth"
		res.redirect("http://techxie.local:5000/User/api/OAuth")
	}else {

	
		filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
			var username = req.body.username;
			var password = req.body.password;
			var login_ = new login_lib();
			if(username == "undefined" || username == null && password == "undefined" || password == null){
				next(new ExceptionHandler.BadRequest("Invalid inputs"))
			}else{
				login_.login(username,password,(err,result)=>{
					if(err instanceof ExceptionHandler.UnAuthorized  && result != undefined){ // if this condition email not verified
						
						util.sendValidRes(res,-1,result)
					}
					else if(err){

						next(err)
					}else{// cookies for login are 
						let cookieArr = [{
							name:"grant_code",
							value:result.grant_code,

						},
						{
							name:"sessionID",
							value:result.sessionID,
						},
						{
							name:"username",
							value:result.username,
						},
						{
							name:"userID",
							value:result.userID,
						},
						{
							name:"request",
							value:"GRANT_CODE",
						}
					]
						util.setCookie(res,cookieArr)
						util.sendValidRes(res,1,result);
					}
				})
			}
		}else {next(new ExceptionHandler.InternalServerError("something went wrong"))}}).catch(err=>{
			next(err)
		}
	)

}


}


module.exports = {login : login}

