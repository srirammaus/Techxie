// login middlleware
// This is the authentication api of OAuth 2.0 , through here authentication get granted , then next api provide OAuth acces token  \
//try
// N
//this should also check for the verified email
var login_lib =  require('./../lib/login.js').login;
var filter = require('./../lib/filter.js');
function login(req,res,next){
	let properties = ["body"];
    let requiredParams= ["username","password"]

    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
		var username = req.body.username;
		var password = req.body.password;
		var login_ = new login_lib();
		if(username == "undefined" || username == null && password == "undefined" || password == null){
			res.send({Error: "Invalid inputs"})
		}else{
			login_.login(username,password,(err,result,fetched_userID)=>{
				if(err){
					res.send({Error: err.message})
				}else{
					console.log(fetched_userID)
					res.send({result: result,userID: fetched_userID})
				}
			})
		}
	}else {next("something went wrong")}}).catch(err=>{
		next(err)})


}

module.exports = {login : login}

