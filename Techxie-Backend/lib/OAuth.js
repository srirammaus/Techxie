//OAuth -  Authentication
//parameters of OAuth - username,access_token,refresh_token,grant_code,scopes,client_id,client_secret,expiration,expired,callback url,
var DB = require('./../config/M_Database')
var dotenv =require('dotenv');
dotenv.config({path:'./../config/session_params.env'})
class OAuth{
	constructor(){

	}
	get_grant_code(){ // before Authorization meas getting token
		return Math.floor(Math.random() * (999999 - 2 ));
	}
	Authentication(username,userID,callback_url=null,cb){ // to getting grant code login authentication initialization
		var result ;
		var _grant_code = this.get_grant_code()
		this.setSessionID();
		var OAuth_query = {
			username: username, // essentials
			sessionID: this.getSessionID(),
			access_token: null,
			refresh_token:null,
			grant_code: _grant_code, //essentials
			scopes: process.env.scope_1, //essesntials // check about the scope
			client_id:null, // check if the client_id is null if not null then change the scopes
			client_secret:null,
			callback_url:callback_url,
			expiration:null,
			expired:null,
			USER_ID:userID,
			device_id:null, // Temporary these below details are null
			device_name:null,
			device_ip:null,

		}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.InsertDocument(db,'web_session_manager',OAuth_query,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						result = {username: username,grant_code: _grant_code,scope: process.env.scope_1,sessionID: this.getSessionID()}
						cb(null, result)
					}
				})
			}
		})
	}
	//Authenticate is it a valid session token via acccess token
	//used except in toolBtn, change it ASAP
	Authenticate(username,access_token,sessionID,cb){ // if not make sure to expire
		var query = {username:  username, access_token:access_token,sessionID: sessionID};
		console.log(query)
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"));
			}else{
				DB.FindDocument(db,"web_session_manager",query,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						if(typeof res == "undefined" || res == null){
						
							cb(new Error("Invalid session credentials"))
						}else{
							if(res.expired == 0){
								cb(new Error("session expired, You will redirected now.."));
							}else{
								if(this.Expired(res.expiration)){
									this.ToExpire(username,access_token,(err,result)=>{
										if(err){
											cb(new Error("something went wrong"))
										}else{	
											cb(new Error("session expired, You will redirected now.."))
										}
									})
								}else{
									cb(null,1); //valid token
								}
							}
						}
					}
				})
			}
		})
	}
	setSessionID(){ // set session id for grant code stufss
	    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	    var half_sessionID = '';
	    var sessionID = Math.floor(Math.random() * 99999999 - 1);
	    for(var i = 0; i < 6; i++) {
	        half_sessionID += chars[Math.floor(Math.random() * chars.length)];
	    }
	    this.half_sessionID= half_sessionID;
		this.sessionID = half_sessionID + sessionID;
		return this.sessionID;
	}
	getSessionID(){
		return this.sessionID;
	}
	Expired(ExpiryTime){
		var currentTime = Date.now();
		if(currentTime > ExpiryTime || currentTime ==ExpiryTime ){
			return true;
		}else{
			return false;
		}
	}
	ToExpire(username,access_token,cb){ // to expire the current token
		DB.getConnection((err,db)=>{
			if(err){ cb(new Error)}
			else{
				DB.UpdateDocument(db,{username: username,access_token:access_token},null,"web_session_manager",{expired: 0},(err,res)=>{
					if(err){ cb(new Error("something went wrong"))} // take error as log
					else{
						cb(null,1)
					}
				})
			}
		})
	}
}
module.exports = {OAuth: OAuth}