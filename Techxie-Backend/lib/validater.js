//checking valid sessions
// checking valid user id 
//checking valid username
// valid email , ph_number
// better to involve every function here to the other lib js codes , not in api codes directly because to reduce code confusion in api file
// in some file i 've inlcuded this lib in api files for specif convinient reason'
var ExceptionHandler = require('./ExceptionHandlers.js');
var DB = require('./../config/M_Database.js')
function  getConnection(){
	return DB;
}
function isValidUsername(username,password =null , token =null,cb){ //token and pwd for future use
	getConnection().getConnection(function(err,db){
		if(err){
			cb(new ExceptionHandler.InternalServerError(err)); 
		}else{
			DB.FindDocument(db,"USERS",{"credentials.username":username.toString()},(err,res) =>{ //Have to check this
				if(err){ 
					cb(new ExceptionHandler.InternalServerError(err))
				}else{
					cb(null,res);
				} //i think return keyword should here
			});
		}
		return;
		
	})
}
function isValidUserID(userID,cb){
	getConnection().getConnection((err,db)=>{
		if(err){ cb( new ExceptionHandler.InternalServerError(err)) }
		else{
			DB.FindDocument(db,"USER_IDS",{USER_ID: userID,signup: 1},(err,res)=>{
				if(err){ cb(new ExceptionHandler.InternalServerError(err))}
				else{
					console.log(res)
					if(res != null ){
						cb(null,1) // 1 is flag
					}else{
						cb(null,0)
					}				
				}
			})
		}
	})
}
function isValidEmail(username ,email,USER_ID ,token=null,cb){
	getConnection().getConnection(function(err,db){
		if(err){
			cb(new ExceptionHandler.InternalServerError(err)); 
		}else{
			DB.FindDocument(db,"USERS",{email:email.toString(),"credentials.username":username.toString(),"credentials.USER_ID":Number(USER_ID)},(err,res) =>{
				if(err){ 
					cb(new ExceptionHandler.InternalServerError(err))
				}else{
				
					cb(null,res);
				} 
			});
		}
		return;
		
	})
}
function isValidPh_number(username,ph_number,token=null,cb){
	getConnection().getConnection(function(err,db){
		if(err){
			cb(new ExceptionHandler.InternalServerError(err)); 
		}else{
			DB.FindDocument(db,"USERS",{username:username.toString(),ph_number:ph_number.toString()},(err,res) =>{
				if(err){ 
					cb(new ExceptionHandler.InternalServerError(err))
				}else{
					cb(null,res);
				} 
			});
		}
		return;
		
	})
}
//You can also use this but in OAuth.Authenticate it can expire do the stuffs automatically
function isValidSessionToken(userID,session_token,sessionID,cb){
	var query = {USER_ID: Number(userID),access_token:session_token,sessionID: sessionID,expired: 1}
	console.log(query)
	getConnection().getConnection((err,db)=>{
		if(err){
			cb(new ExceptionHandler.InternalServerError("something went wrong"));
		}else{
			DB.FindDocument(db,"web_session_manager",query,(err,result)=>{
				if(err){
					cb(new ExceptionHandler.InternalServerError(err))
				}else{
					cb(null,result);
				}
			})
		}
	})
}
module.exports ={isValidUsername , isValidUserID , isValidSessionToken,isValidEmail}