// Authentication granted through here
//Authorization happen here then acces token provided
var DB = require('./../config/M_Database');
var crypto = require('crypto');
class Authorization{
	constructor(){

	}
	expiration(){ //while giving acessstoken means after authentication
		Date.now + 1000000;
	}
	setToken(){ //both for access token and refresh token
		const token= crypto.randomBytes(16).toString('hex');
		this.token = token;
		return this.token;
	}
	getToken(){ // getting token //not in use
		return this.token;
	}
	//Not in USE
	//if grant_code then refresh token is null, if refresh token then grant code null
	//grant_code and refresh_token is not necesssary , it might be useful for  any EMERGENCY SEARCH api
	Authorization(username,grant_code,refresh_token,acess_token,cb){
		if(grant_code != null){
			query = {username: username, grant_code: grant_code}
		}else{
			query =  {username: username, refresh_token: refresh_token}
		}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.FindDocument(db,"web_session_manager",query,(err,result)=>{
					if(err){
						cb(new Error("something went wrong"));
					}else{
						if(result != null || result != "undefined"){
							cb("Authorization Failed");
						}else{
							cb(null, true);
						}
					}
				})
			}
		})
	}
	newSession(userID,username,grant_code,sessionID,cb){ // grant code
		var result,new_access_token,new_refresh_token;
		var new_access_token = this.setToken();
		var new_refresh_token = this.setToken();
		var expiration = Date.now() + 1000000;
		console.log(userID)
		var query = {username: username,grant_code:grant_code,sessionID: sessionID,USER_ID: Number(userID)} // once it changed to zero , it expires
		var data = {refresh_token:new_refresh_token,access_token:new_access_token,expiration:expiration,expired:1};
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"));
			}else{
				DB.UpdateDocument(db,query,null,"web_session_manager",data,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"));
					}else{
						result = {
							username: username, // we need session Id here to differentiate
							access_token:new_access_token,
							refresh_token:new_refresh_token,
							expiration:expiration,
							userID: userID
						}
						if(res.modifiedCount == 1 ){
							cb(null,result)
						}else{
							cb(new Error("Invalid Username or GRANT_CODE"))
						}
						
					}
				})
			}
		})
	}
	refreshSession(userID,username,refresh_token,sessionID,cb){
		var result,new_access_token,new_refresh_token;
		var new_access_token = this.setToken();
		var new_refresh_token = this.setToken();
		var expiration = Date.now() + 1000000;
		//wokr in expiration
 		var query = {username: username,refresh_token:refresh_token,sessionID: sessionID,USER_ID: Number(userID)} // once it changed to zero , it expires
		var data = {refresh_token:new_refresh_token,access_token:new_access_token,expiration:expiration,expired:1};
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"));
			}else{
				DB.UpdateDocument(db,query,null,"web_session_manager",data,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"));
					}else{
						result = {
							username: username,
							access_token:new_access_token,
							refresh_token:new_refresh_token,
							expiration:expiration,
							userID:userID,
						}
						if(res.modifiedCount == 1 ){
							cb(null,result)
						}else{
							cb(new Error("Invalid Username or GRANT_CODE"))
						}
						
					}
				})
			}
		})
	}
}
module.exports = {Auth: Authorization}