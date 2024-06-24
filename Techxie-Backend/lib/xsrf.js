//S2
//initalize cookie pareser in api or REST.api
//csrf is enough for converting 
//reset expire while going back page 
// include all tools here.
var DB = require('./../config/M_Database');
class xsrf{
	constructor(){
		var xsrf,validater; // because we gonna , passs this through cookies
		this.generateCSRFToken(25);
	}
	// use this function directly in API
	generateCSRFToken(n) { //if u want to change , change it later
	    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	    var token = '';
	    for(var i = 0; i < n; i++) {
	        token += chars[Math.floor(Math.random() * chars.length)];
	    }
	    this.xsrf= token;
	    return token;
	}
	//creat a event monitor in front-end throught which we can automatically log out if the cookies expired once
	setToken(userID,cb){ // setting token to db
		var COLLECTION_NAME,token,activated_time,validTime,validTimeMilli,expired; // how we going to expire it ? the anwer is if the conversion over then it should be expired by pdfconverter automatically[for only here if they used expire it] and where this stuffs is used kindle requrest to isvalidtime is working
		COLLECTION_NAME = 'web_csrf_sessions';
		token = this.getToken();
		activated_time = Date();
		validTimeMilli = Date.now() + 10000000; //+10,000 means 10 second// Date() will normallly provide the actual format
		validTime = new Date(validTimeMilli).toString();
		expired = 1; // 0 is inactive
		var setData = {
			USER_ID:userID, // userid
			token: token, // new csrf token
			tool:this.tool,
			session_token: null, // once login activity completed , will do this stuff
			activated_time: activated_time, 
			validTime: validTime,
			validTimeMilli: validTimeMilli,
			expired: expired
		}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error(err.message));
			}
			else{
				DB.InsertDocument(db,COLLECTION_NAME,setData,(err,res)=>{
					if(err){ cb (new Error(err.message))}
					else{
						cb(null,1) // 1 is flag
					}
				})
			}
		})
	}
	isTokenAvail(userID,sessionID,session_token,cb){ //thx will check csrf token is already there , if it is so then it returns
		var query = {USER_ID : Number(userID),expired: 1};
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.FindDocument(db,'web_csrf_sessions',query,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						cb (null,res)
					}
				})
			}
		})
	}
	getToken(){
		return this.xsrf;
	}
	filter(val){
		for (var i=0;i<val.length;i++){
			val[i] = val[i].trim();
		}
		return val;
	}
	
}

module.exports = {xsrf}