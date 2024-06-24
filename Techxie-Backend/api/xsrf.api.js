// TESTING PURPOSE API . THIS CODE SHOULD BE ADDED TO EACH TOOLS CLICKS EVENT
//IF TOKEN EXPIRED REDIRECT HIM TO HOME PAGE
//xsrf.api
//middleware function
var xsrf_lib = require('./../lib/xsrf').xsrf;
var validater =  require('./../lib/validater.js') // to validate user id
function xsrf(req,res,next){
	var results;
	var userID = req.body.userID; // vars
	var xsrf = new xsrf_lib();//  vars
	if(userID == "undefined" || userID == null){
		results = { status:0,Error:"invalid input"}
		res.send(results)
	}else{
		var filter = xsrf.filter([userID]);
		var f_userID = Number(filter[0]); // converted
		validater.isValidUserID(f_userID,(err,flag)=>{ // i think not necessary
			if(err){ res.send({Error: "something went wrong"})}
			else{
				if(flag == 1){
					var setToken = xsrf.setToken(f_userID,(err,flag)=>{
						if(err){ //take err as log
							results = {Error: "something went wrong"}
							res.send(results);
						}else{
							results= {status: 1}
							var expires =  new Date(Date.now() + 10000000)
							res.cookie("temp",expires.toString(),{expires: expires}); //  new Date(Date.now() + 900000) this is the only accepted format, then only expire parameter works 
							res.send(results);
						}
					})
				}else{
					results = {Error: "Invalid User ID or not signed up"}
					res.send(results);
				}
			}
		})

	}
	next();

}

module.exports = {xsrf : xsrf}