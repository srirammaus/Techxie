//once convert button clicked //after uploaded
//try
//CA
var xsrf_verification_lib = require('../../lib/xsrf_verification').xsrf_verification;
var pdfconverter = require('../../lib/pdfconverter');
var OAuth = require('../../lib/OAuth').OAuth;
//once validated

//do it with csrf csrf_token -- csrf = putting the token in hidden field and x-xsrf or x-csrf means using cookies
//while creating upload in frontend two things should be contain local browsing and our own drive images
function convert(req,res,next){ // if non exist user request then pop up to signup
	var xsrf_verification = new xsrf_verification_lib();
	var userID = req.body.userID;
	var username = req.body.username;
	var csrf_token = req.body.csrf_token;
	var session_token = req.body.session_token;
	var sessionID = req.body.sessionID;
	var B_name = req.body.B_name
	var results;
	if(userID == null || B_name == null || csrf_token == null || username == null || session_token == null || sessionID == null){
		results = {Error: "Invalid Inputs"};
		res.send(results);
	}else{
		//OAuth verification
		new OAuth().Authenticate(username,session_token,sessionID,(err,result)=>{
			if(err){
				res.send({Error:err.message})
			}else if (result == 1){
				var f_values = xsrf_verification.filter([userID,csrf_token]);
				xsrf_verification.setter([f_values[0],f_values[1]]);
				xsrf_verification.verify((err,flag,result__)=>{
					if(err){
						results = {Error: err.message}
						res.send(results)
					}else if(flag == 0){
						results = {Error: "csrf_token Expired , Try Again"}
					}else{
						//start converting
						try{
							var source = pdfconverter.getSources_(B_name);
							var convert = pdfconverter.converter(source,B_name,(err,result)=>{
								if(err){
									res.send({Error:err.message})
								}else{
									res.send({status: 1})
								}
							})

						}catch(err){
							res.send({Error: err.message})
						}
					}
				})
			}else{
				res.send({Error: "something went wrong"})
			}
		})
	}
}

module.exports = {convert}