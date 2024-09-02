/**
 * redirect to respected page , if the tool request was corre
 */
//CA
var xsrf_lib  = require('../../lib/xsrf.js').xsrf;
var validater = require('../../lib/validater.js') // to validate user id
var filter  = require("../../lib/filter.js");
var ExceptionHandler =require('../../lib/ExceptionHandlers.js')
var results = {
	status:0,
	message:"something went wrong"
}
async function  toolBtn(req,res,next){
	// let properties = ["body"];
    // let requiredParams= ["username","userID","tool","session_token","sessionID"];
    // filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){}else {next("something went wrong")}}).catch(err=>{next(err)})
	try {
		var tools;
		tools = ['pdf','drive']; // pdf - 0, .... likewise
		properties = ["body"];
		requiredParams = ["userID","tool"]
		filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
			var userID = req.body.userID; //vars
			var tool = req.body.tool;
			
			if(typeof userID == "undefined" || userID == null && typeof tool == "undefined" || tool == null ){
				next(new ExceptionHandler.BadRequest("Invalid input",200))
			}else{
				tool_number = tools.indexOf(tool);
				switch (tool_number) {
					case 0:
						// xsrf_initialize(userID,sessionID,session_token,tools[tool_number],res)
						results.status = 1;
						results.message ="you will be redirected soon"
						res.send(results)
						break;
					case 1:s
						// xsrf_initialize(userID,sessionID,session_token,tools[tool_number],res)
						results.status = 1;
						results.message ="you will be redirected soon"
						res.send(results)
						break;	
					default:
						next(new ExceptionHandler.BadRequest("unknown tool",200))
						break;
				}
			}			
		}else{next(new ExceptionHandler.InternalServerError("something went wrong"))}}).catch(err=>{
			next(err)})
	
	}catch(err) {
		next(new ExceptionHandler.InternalServerError("something went wrong"))
	}


}

module.exports = {toolBtn: toolBtn};

	//wrapping a normal funcntion with promise will make async await work
		// i thought by wrapping a the checking or validaing function in to promise and running with await "will made seperate running function and if it is invalid return and if it is right it passses next [but it fails]" . i found answer for this you have to use reject and catch for this
		// we can also use OAuth.Authenticate function , unfortunately i used isvalidsessiontoken , so lets go with this here only
		// OAuth.Authenticate can Automcatically  expires the stuffs
		// await new Promise ( (resolve,reject)=>{
		// 	validater.isValidSessionToken(userID,session_token,sessionID,(err,result)=>{
		// 		if(err){
		// 			res.send({Error:err.message})
		// 			return;
		// 		}else{
		// 			if(result ==   null || typeof result == "undefined"){
		// 				//new token redirection
		// 				res.send(JSON.stringify({Error: "Invalid access token"}));
		// 				return;
		// 			}else{
		// 				reject(null);
		// 			}
		// 		}
		// 	})
		// }).catch((rej)=>{})