//signup api
//order =>name,userID,username,password,cpassword,email,ph_number
// N
var signup__ = require('./../lib/signup.js').signup;
var ExceptionHandler = require('./../lib/ExceptionHandlers.js');
function signupMiddleware(req,res,next){	
	 let properties = ["body"];
    let requiredParams= ["username","password","cpassword","email","ph_number","name"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
		let name = req.body.name;
		let userID = req.body.userID;
		let username = req.body.username;
		let password = req.body.password;
		let cpassword = req.body.cpassword;
		let email = req.body.email;
		let ph_number = req.body.ph_number;
		try	{
			InputCounter(req.body);
			var signup_  =  new signup__([name,userID,username,password,cpassword,email,ph_number]);
			signup_.InputValidater([name,userID,username,password,cpassword,email,ph_number])
			signup_.signup((err,result)=>{
				if(err){
					next(err)
					// res.send(JSONIFY(["Error","flag"],[err.message, -1]));

				}else{
					res.send(JSON.stringify(result))
				}
			})
		}catch(err ){
			next(err)
		}
	}else {next(new ExceptionHandler.InternalServerError("something went wrong"))}}).catch(err=>{
		next(err)
	})


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
		throw  new ExceptionHandler.BadRequest("Input Limit Not Reached")
	}
	else{
		throw new ExceptionHandler.BadRequest("Input limit Exceeded")
	}

}
module.exports = {signup:signupMiddleware }