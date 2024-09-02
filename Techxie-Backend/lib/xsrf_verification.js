/**
 * where these are used ?
 * converter.api.js
 * pdf.upload.js
 * drive.uplaod.js
 * 
 */


//s1
//when pdfconverter tool button clicked 
//xsrf validate //  where to use ? ans: where crsf token need // don't forget expire this , the expiry function is here use this 
var DB = require('./../config/M_Database')
var ExecptionHandler = require("./ExceptionHandlers.js");
class xsrf_verification{
	constructor(){
	}
	setter(val){
		var userID,xsrf_token;
		this.userID = val[0];						
		this.xsrf_token = val[1];
	}
	verify(cb){ // requested to use the same error as here in ur api
		var query = {USER_ID:Number(this.userID),token:this.xsrf_token}
		DB.getConnection((err,db)=>{
			if(err){ cb(new ExecptionHandler.InternalServerError("something went wrong"))} // take error as log
			else{
				DB.FindDocument(db,'web_csrf_sessions',query,(err,res)=>{
					if(err){ cb(new ExecptionHandler.InternalServerError("something went wrong"))}
					else{
						if(res == null){
							cb(new ExecptionHandler.BadRequest("Invalid User ID or Token"));
						}else{
							var Expiry = res.expired;
							var v_time_milli = res.validTimeMilli;
							if( Expiry == 1){
								if(this.isValid(v_time_milli)){
									cb(null,1,res) 
								}else{
									//redirect to home page
									this.ToExpire((err,flag)=>{
										if(err){ cb(new ExecptionHandler.InternalServerError(err.message))}
										else{
											cb(null,0)
										}
									})	
								}
							}else{ // if the token expired, redirect the URL to xsrf 
								cb(null,0)// retry request // session expired
							} 
						}
					}
				})
			}
		})
		
	}
	isValid(v_time_milli){ // check if the token time is valid
		var c_time = Date.now();
		if(c_time == v_time_milli || c_time > v_time_milli ){
			return false
		}else{
			return true;
		}
	}
	ToExpire(cb){ // to expire the current token
		DB.getConnection((err,db)=>{
			if(err){ cb(new ExecptionHandler.InternalServerError)}
			else{
				DB.UpdateDocument(db,{USER_ID: Number(this.userID),token: this.xsrf_token},null,"web_csrf_sessions",{expired: 0},(err,res)=>{
					if(err){ cb(new ExecptionHandler.InternalServerError("something went wrong"))} // take error as log
					else{
						console.log("Working");
						cb(null,1)
					}
				})
			}
		})
	}
	filter(val){
		for (var i=0;i<val.length;i++){
			val[i] = val[i].toString().trim();
		}
		return val;
	}
}

module.exports = {xsrf_verification}