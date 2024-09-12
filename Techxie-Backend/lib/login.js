//login manager
var DB=  require('./../config/M_Database');
var OAuth_ = require(__dirname + '/OAuth.js').OAuth; //OAuth.auth initialize
var crypto = require('crypto')
var ExceptionHandler = require("./ExceptionHandlers.js")
class login {
	constructor(){

	}
	//check email and ph verification , if not verifiy it
	verifier(){
		return; // next
	}
	login(username,password,cb){ // respected email and ph will be claim through the username
		var f_username= this.filter(username);
		var f_password = this.filter(password);
		var fetched_userID;
		var callback_url = null; // callback url  via  request
		var query = {"credentials.username": {$in : [f_username]}}; // working 
		// var query = {credentials:{ $elemMatch: {username: "jessy"}}};
		DB.getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError("something went wrong"));
			}else{
				DB.FindDocument(db,'USERS',query,(err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError("something went wrong"));
					}else{
						if(typeof res == "undefined" || res == null ){
							cb(new ExceptionHandler.BadRequest("Invalid username"));
						}else{
							// console.log(res.credentials)
							fetched_userID = res.credentials?.USER_ID;
							var hashed_pwd = this.createHash(f_password);
							if(res.credentials?.password == hashed_pwd){
								if(res?.verified_e == 1){
									//now authentication
									var OAuth =  new OAuth_();
									OAuth.Authentication(f_username,fetched_userID,callback_url,(err,result)=>{
										if(err){
											cb( new ExceptionHandler.InternalServerError(err));
										}else{
											result.userID= fetched_userID
											cb(null,result)
										}
									});

								}else if(res?.verified_e == 0){
									//redirect to email verification by sending verification email to client or user
									//retrive user's email and userID 
									let EmailRes = {
										userID:res.credentials.USER_ID,
										username:res.credentials.username,
										email:res.email,
									};
									cb( new ExceptionHandler.UnAuthorized("email not verified"),EmailRes); // this flag denotes this email not verified
								}else {
									cb(new ExceptionHandler.UnAuthorized("Invalid Inputs "))
								}

							}else{
								cb(new ExceptionHandler.UnAuthorized("Invalid password"))
							}
						}
					}
				})
			}
		})
	}
	createHash(password){
		//CIPHER VS HASH Ciphers are algorithms that can encrypt or decrypt data based on shared or public/private keys. Hashes (a.k.a. Message Digests) are one way, irreversible conversion of an input source
		var c_hash = crypto.createHash('sha256');
		var result = c_hash.update(password).digest('base64');
		this.result = result;
		return result;
	}
	filter(val){
		var value = val.trim();
		return value;
	}
	
}
module.exports = {login: login}