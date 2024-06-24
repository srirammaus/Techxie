// login middlleware
// This is the authentication api of OAuth 2.0 , through here authentication get granted , then next api provide OAuth acces token  
var login_lib =  require('./../lib/login.js').login;
function login(req,res,next){
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
}

module.exports = {login : login}

