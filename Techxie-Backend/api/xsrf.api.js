/**
 * middleware function  this function should used after once the authentication done! COMPULSORY
 * the xrf api should initiated after login through xsrf.api request
 * changepwd
 * converter
 * drive.upload
 * pdf.upload
 * cahngeemail - future
 * 
 */

var xsrf_lib = require('./../lib/xsrf').xsrf;
var validater =  require('./../lib/validater.js') // to validate user id
var filter = require('./../lib/filter.js');
var ExecptionHandler = require('../lib/ExceptionHandlers.js');
var results = {
	status:0,
	message:"soemthing went wrong"
}
function xsrf(req,res,next){
	try {
		//later remove the tool parameter , we will initiate this csrf at login, right for testing we are using tool
		let userID,sessionID,session_token,tool;
		let properties = ["body"];
		let requiredParams = ["userID","sessionID","session_token"];

		filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
			userID = req.body.userID;
			sessionID = req.body.sessionID;
			session_token =	req.body.session_token;
			tool = req.body.tool;

			var xsrf = new xsrf_lib(tool);//  vars
			var filter = xsrf.filter([userID]);
			var f_userID = Number(filter[0]); // converted
			validater.isValidUserID(f_userID,(err,flag)=>{ // instead check here valid session + user id which is correcponding the session, nowitself it is enough to check only user id
					if(err){ next(new ExecptionHandler.InternalServerError("something went wrong"))}
					else{
						if(flag == 1){
							xsrf.isTokenAvail(userID,sessionID,session_token,(err,result)=>{
								if(err){
									next(err)
								}else{
									if(typeof result ==  "undefined" || result == null ){
											//token may be expired , so new token
											//new token
											var setToken = xsrf.setToken(f_userID,sessionID,session_token,(err,token)=>{
											if(err){ //take err as log
												next(err)
											}else{
												results.status = 1;
												results.message = "Token generated succesfully";
												results.userID = f_userID;
												var expires =  new Date(Date.now() + 10000000)
												res.cookie("token",token,{
													expires: expires}); //  new Date(Date.now() + 900000) this is the only accepted format, then only expire parameter works 
												res.send(results);
											}
										})
									}else{
										//check the expiration time ad stuffs
										let token = result?.token || next(new ExecptionHandler.InternalServerError("something went wrong"));
										var expires =  new Date(Date.now() + 10000000)
										res.cookie("token",token,{expires: expires}); //  new Date(Date.now() + 900000) this is the only accepted format, then only expire parameter works 
										results.status = 1;
										results.message = "Token not Expired Yet";
										results.userID = f_userID
										res.send(results) 
									}
								}
							})
						}else{
							next(new ExecptionHandler.UnAuthorized("Invalid User ID or not signed up"))
						}
					}
				})
		}else{next(new ExecptionHandler.InternalServerError("something went wrong"))}}).catch(err=>{next(err)})
		
	}catch(err) {
		next(err)
	}

}










// function xsrf(req,res,next){
// 	var results;
// 	var userID = req.body.userID; // vars
// 	var xsrf = new xsrf_lib();//  vars
// 	if(userID == "undefined" || userID == null){
// 		results = { status:0,Error:"invalid input"}
// 		res.send(results)
// 	}else{
// 		var filter = xsrf.filter([userID]);
// 		var f_userID = Number(filter[0]); // converted
// 		validater.isValidUserID(f_userID,(err,flag)=>{ // i think not necessary
// 			if(err){ res.send({Error: "something went wrong"})}
// 			else{
// 				if(flag == 1){
// 					var setToken = xsrf.setToken(f_userID,(err,flag)=>{
// 						if(err){ //take err as log
// 							results = {Error: "something went wrong"}
// 							res.send(results);
// 						}else{
// 							results= {status: 1}
// 							var expires =  new Date(Date.now() + 10000000)
// 							res.cookie("temp",expires.toString(),{expires: expires}); //  new Date(Date.now() + 900000) this is the only accepted format, then only expire parameter works 
// 							res.send(results);
// 						}
// 					})
// 				}else{
// 					results = {Error: "Invalid User ID or not signed up"}
// 					res.send(results);
// 				}
// 			}
// 		})

// 	}
// 	next();

// }

module.exports = {xsrf : xsrf}