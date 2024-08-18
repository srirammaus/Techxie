// When any Tool is clicked, csrf initiated //try
//middleware
//respected redirection should be given here
// csrf is used here , web desk app is three diff so properly route everything
//try
//CA
var xsrf_lib  = require('../../lib/xsrf.js').xsrf;
var validater = require('../../lib/validater.js') // to validate user id

async function  toolBtn(req,res,next){
	var results,tools;
	tools = ['pdf','drive']; // pdf - 0, .... likewise
	var userID = req.body.userID; //vars
	var tool = req.body.tool;
	var csrf_token = req.body.csrf_token;
	var req_device = null; //now it self it is temp and//differentiate the devices and check it is requested from , so we can classify the session
	var session_token = req.body.session_token ||req.body.access_token; //getting the acces token 
	var sessionID = req.body.sessionID;
	if(typeof userID == "undefined" || userID == null && typeof tool == "undefined" || tool == null && typeof session_token == "undefined" || session_token == null || sessionID == null && typeof sessionID =="undefined"){
		results = { status:0,Error: "Invalid input" }
		res.send(results)
	}else{
		tool_number = tools.indexOf(tool);
		switch (tool_number) {
			case 0:
				xsrf_initialize(userID,sessionID,session_token,tools[tool_number],res)
				break;
			case 1:
				xsrf_initialize(userID,sessionID,session_token,tools[tool_number],res)
				break;
			default:
				res.send({Error: "unknown tool"})
				break;
		}
	}

}
//session token not adding in csrf session
function xsrf_initialize(userID,sessionID,session_token,tool,res){
	var xsrf = new xsrf_lib(tool);//  vars
	var filter = xsrf.filter([userID]);
	var f_userID = Number(filter[0]); // converted
	validater.isValidUserID(f_userID,(err,flag)=>{ // instead check here valid session + user id which is correcponding the session, nowitself it is enough to check only user id
			if(err){ res.send({Error: "something went wrong"})}
			else{
				if(flag == 1){
					xsrf.isTokenAvail(userID,sessionID,session_token,(err,result)=>{
						if(err){
							results = {Error: err.message}
							res.send(results);
						}else{
							if(typeof result ==  "undefined" || result == null ){
								//new token
								
								var setToken = xsrf.setToken(f_userID,(err,token)=>{
									if(err){ //take err as log
										results = {Error: "something went wrong"}
										res.send(results);
									}else{
										results= {status: 1}
										var expires =  new Date(Date.now() + 10000000)
										res.cookie("token",token,expires.toString(),{expires: expires}); //  new Date(Date.now() + 900000) this is the only accepted format, then only expire parameter works 
										res.send(results);
									}
								})
							}else{
								//tommorow
								
								res.send({userID: f_userID,token: result.token}) // temp
							}
						}
					})
				}else{
					results = {Error: "Invalid User ID or not signed up"}
					res.send(results);
				}
			}
		})
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