//signup api
//order =>name,userID,username,password,cpassword,email,ph_number
var signup__ = require('./../lib/signup.js').signup;

function signupMiddleware(req,res,next){	
	var name = req.body.name;
	var userID = req.body.userID;
	var username = req.body.username;
	var password = req.body.password;
	var cpassword = req.body.cpassword;
	var email = req.body.email;
	var ph_number = req.body.ph_number;
	try	{
		InputCounter(req.body);
		var signup_  =  new signup__([name,userID,username,password,cpassword,email,ph_number]);
		signup_.InputValidater([name,userID,username,password,cpassword,email,ph_number])
		signup_.signup((err,result)=>{
			if(err){
				res.send(JSONIFY(["Error","flag"],[err.message, -1]));
			}else{
				res.send(JSON.stringify(result))
			}
		})
	}catch(err ){
		res.send(JSONIFY(["Error","flag"],[err.message, -1]));
	}

}
function JSONIFY(keys,values){ //both should be array and same count
	var result = {};
	for(var i=0;i<keys.length;i++){
		result[keys[i]] = values[i];
	}
	return JSON.stringify(result);
}
function InputCounter(Input){
	var len = Object.keys(Input).length
	console.log(len)
	if(len == 7){
		return;
	}else if(len < 7){
		throw  new Error("Input Limit Not Reached")
	}
	else{
		throw new Error("Input limit Exceeded")
	}

}
module.exports = {signup:signupMiddleware }