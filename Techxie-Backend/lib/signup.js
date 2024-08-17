// notice: never use throw new Error in cb inside functions and get cb errors properly with cb(err,true)
var DB = require('./../config/M_Database.js');
var ExceptionHandlers = require(__dirname +'/ExceptionHandlers.js');
var validater = require(__dirname +"/validater.js");
var crypto = require('crypto');
var fs = require('fs');
class signup{
	constructor(values){
		var val = this.filter(values);
		this.name = val[0];
		this.userID = val[1];
		this.username = val[2];
		this.password = val[3];
		this.cpassword = val[4];
		this.email = val[5];	
		this.ph_number = val[6];
	}
	filter(values){ 
		for(var i=0;i<values.length;i++){ 
			values[i] = values[i].trim();
		}
		return values;
	}
	InputValidater(queryArrays){ // to validate the inputs from the request, if the type is properly intialized //it is sort of like two way check if there is unknown key is sent by the user then won't calculate them
		var flag= 0;
		for (var i=0;i<queryArrays.length;i++){
			if(typeof(queryArrays[i]) == "string"){
				flag = 1;
			}else{
				console.log(typeof(queryArrays[i]))
				throw new Error("Invalid Type of Input")
			}		
		}
		return flag;
	}
	getConnection(){
		return DB;  //DB and this function has same functionality
	}
	isvalidpwd(){
		if(this.password == this.cpassword){
			return true;
		}
		return;
	}
	createHash(password){
		//CIPHER VS HASH Ciphers are algorithms that can encrypt or decrypt data based on shared or public/private keys. Hashes (a.k.a. Message Digests) are one way, irreversible conversion of an input source
		var c_hash = crypto.createHash('sha256');
		var result = c_hash.update(password).digest('base64');
		this.result = result;
		return result;
	}
	setHashPwd(){
		var pwd = this.createHash(this.password);
		this.pwd = pwd;
	}
	user_details(){
		const user_details_  = {
			name: this.name,
			ph_number:this.ph_number,
			email:this.email,
			token: null, //general token
			verified_e :0, // verification  should happen before 1 st login , before authention too
			verified_ph:0,
		}
		const credentials = {
			USER_ID:Number(this.getUserId()),
			username:this.getUsername(),
			password :this.getHashPwd()
		}
		user_details_.credentials = credentials;
		return user_details_;
	}
	user_bucket(){
		const bucket = {
			username: this.getUsername(),
			token:null, // general token
			USER_ID:Number(this.getUserId()),
			F_count:1,
			0:{
				F_name: "Main",
				F_id:"F-0",
				F_num : 0,
				active:1,// if this 0 this is a deleted one , it means it is disabled
				i_count:0, // def 0
				items:[], 
				//items:{} --  this should be added in bucket
			} // bucket name means folder name
		}
		return bucket;
	}
	signature(){
		const signature = {
			username:this.getUsername(),
			signup:1, // we no need to use token here , will put that in user_ids
		}
		return signature;
	}
	createBucket(cb){ //it is temporary bucket , lets update this later
		var dir = __dirname + '/WebDrive/' + this.getUserId().toString();
		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir, {recursive: true});
			cb(null);
		}else{
			cb( new Error("something went wrong")) // it means our userID algorithm fails , Userid already exist so something went wrong 
		}
	}
	InsertBucket(cb){
		this.getConnection().getConnection((err,db)=>{
			if(err){ cb(new Error(err))}
			else{
				DB.InsertDocument(db,"BucketInfo",this.user_bucket(),(err,res)=>{
					if(err){ cb(new Error(err))}
					else{
						this.createBucket((err)=>{
							//bucket creation failed if err, then take them as log
							if(err){ cb(new Error("Bucket Exist"))}
							else{ // make a check here
								cb(null,true);	
							}
						})
					}
				})
			}
		})
	}
	UpdateSignupSignature(cb){
		console.log();
		var query = {USER_ID: Number(this.getUserId())};
		var update = this.signature();
		this.getConnection().getConnection((err,db)=>{
			if(err){ cb(new Error(err))} // something went put that later , for developing purpose we should know wwhat is happe
			else{
				DB.UpdateDocument(db,query,null,"USER_IDS",update,(err,result)=>{
					if(err){cb(new Error(err))}
					else{
						cb(null,true);
					}
				})
			}
		})
	}
	IntFilter(Input){ //phone number and user id
		return parseInt(Input)
	}
	isValidUserID(cb){ 
		var flag = 0;
		var signature = null;
		var query = {USER_ID: Number(this.getUserId()),username: this.getUsername()}
		this.getConnection().getConnection((err,db)=>{
			if(err){ cb(new Error("something went wrong"))}
			else{
				DB.FindDocument(db,"USER_IDS",query,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						if( res == null || res == "undefined"){
							flag = -1;
						}else{
							flag = 1;
							signature = res.signup;
						}
						cb(null,[flag,signature])
					}
				})
			}
		})
	}
	driveInfo(cb){
		var query = {username: this.getUsername(),
			USER_ID: Number(this.getUserId()),
			file_count:0,
			Files:[],
			Folders:[],
		}
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new Error(err.message))
			}else{
				DB.InsertDocument(db,"driveInfo",query,(err,res)=>{
					if(err){
						cb(new Error(err.message))
					}else{ //make a check here too
						cb(null,1)
					}
				})
			}
		})
	}
	signup(cb){

		if(this.isvalidpwd()){
			this.setHashPwd();
			this.getConnection().getConnection((err,db) =>{
				if(err){ cb(new Error(err))}
				else{
					this.isValidUserID((err,flag) =>{
						if(err){ cb(new Error(err))}
						else{
							if(flag[0] == 1 && flag[1] == 0){	//if user exist get the username from there
								this.getConnection().getConnection((err,db)=>{
									if(err){ cb(new Error(err))}
									else{
										DB.InsertDocument(db,"USERS",this.user_details(),(err,db)=>{ // the actual signup
											if(err){ cb(new Error(err.message))}
											else{
												this.UpdateSignupSignature((err,results)=>{
													if(err){ cb(new Error(err))}
													else{
														this.driveInfo((err,res)=>{
															if(err){
																cb(new Error(err.message)) //error
															}else{
																this.InsertBucket((err,res)=>{ //what if already exist? 
																	if(err){ cb (new Error(err))}
																	else{
																		var result = this.getResults(this.getUsername(),this.getUserId(),null)
																		cb(null,result);
																	}
																})
																	}
														})
													}
												})
											}
										})
									}
								})	
							}else if(flag[0] == 1 && flag[1] == 1){
								cb( new Error("Already signed up"))
							}
							else{
								cb(new Error("Signup Failed , Invalid User ID"))
							}
						}
					})
				}
			})
		}else{
			cb(new Error("Password and Confirm Password incorrect"))
		}
	}
	createToken(){ // general token for some future purpose
		return;
	}
	setToken(){
		return;
	}
	getToken(){
		return;
	}
	getUsername(){
		return this.username;
	}
	getUserId(){
		return this.userID;
	}
	getHashPwd(){
		return this.pwd;
	}
	getBucketName(){
		var bucketname = this.getUsername  // for temp this enough , but have to change the name , by using function as formula we can set dir name in crate bucket
		return bucketname;
	}
	getResults(user,user_id,token = null){
		var results = {
			username:user,
			user_id: user_id,
			email:this.email,
			flag:1,
		}
		return results;
	}
}
module.exports = {signup}
// var signup_ = new signup(['joyce','27','Temp','joycebyers','joycebyers','joyjoy','joyjoy']);
// //these all should be write in signup.api
// try
// {
// 	signup_.signup((err,res)=>{
// 		if(err){
// 			console.log(err.message)
// 		}else{
// 			console.log(res);
// 		}
// 	})
// }catch(err ){
// 	console.log(err.message)
// }



// /*
// *static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances
// *Tasks - You have do Encapsulation , polymorshism , abstraction beased works
// basic qulities of signup:-
// 	hashing,db connection maintainance , valid pwd, [filtering query values a idea that's why wrinting here]
// adv:-
// 	token gen,otp,user profile for AI or for other stuffs	

// DO's:-
// 	token gen,otp,user profile creation at basic level,
// */

// var DB = require('./../config/M_Database.js');
// var ExceptionHandlers = require(__dirname +'/ExceptionHandlers.js');
// var validater = require(__dirname +"/validater.js");
// var crypto = require('crypto');
// var fs = require('fs');
// class signup{
// 	constructor(name,email,ph_number=null,address = null,username,password,cpassword){
// 		this.name = name;
// 		this.address=address;
// 		this.email = email;
// 		this.ph_number = ph_number;
// 		this.username = username;
// 		this.password =  password;
// 		this.cpassword =  cpassword;
// 	}

// 	getConnection(){
// 		var connection = DB;
// 		return connection;  //DB and this function has same functionality
// 	}
// 	isValidPwd(cb){
// 		var confirm_pwd;
// 		if(this.password == this.cpassword){
// 			this.confirm_pwd = this.password;
// 			cb(null,this.confirm_pwd)
// 		}else{
// 			console.log(this.password + ": " +this.cpassword);
// 			cb(new Error("Passwords didn't match")) //1 //we've to change the stufs like this

// 		}
// 		return cb;  //putting cb or not  is not a prblm
// 	}
// 	CreateHash(password){
// 		//CIPHER VS HASH Ciphers are algorithms that can encrypt or decrypt data based on shared or public/private keys. Hashes (a.k.a. Message Digests) are one way, irreversible conversion of an input source
// 		var c_hash = crypto.createHash('sha256');
// 		var result= c_hash.update(password).digest('base64');
// 		this.result = result;
// 		return result;
// 	}

// 	UserDetails(){
// 		const SPACEWORLD_USER = {
// 			name:this.name,
// 			username :this.username,
// 			email:this.email,
// 			phone_number:this.ph_number,
// 			address:this.address,
// 			Bucket:this.getBucket(),

// 		}
// 		const CREDENTIALS = {
// 			USER_ID:null,
// 			username:this.getUsername(),
// 			passsword:this.getHashPwd()

// 		}
// 		SPACEWORLD_USER.credentials = CREDENTIALS;
// 		return SPACEWORLD_USER;
// 	}
// 	UserBucketDetails(){
// 		const DETAILS = {
// 			username: this.getUsername(),
// 			token:null,
// 			USER_ID:null,
// 			BucketName:this.getBucketName(),
// 		}
// 		DETAILS.FILES = {
// 			counter : 0
// 		};
// 		DETAILS.FOLDERS = {
// 			counter : 0
// 		};
// 		return DETAILS;
// 	}
// 	signup(cb){
// 		const CreateHash_ = (val) =>{return this.CreateHash(val)}
// 		const isValidPwd_ = (cb) =>{return this.isValidPwd(cb)}
// 		const UserDetails_ = () =>{return this.UserDetails()};
// 		const getConnection_ = () => {return this.getConnection()}
// 		const createBucket_ = (username,cb) =>{return this.createBucket(username,cb)}
// 		const getUsername_ = () => {return this.getUsername()}
// 		this.getUser(function(err,flag){
// 			if(err) { cb(new Error(err))}
// 			else{
// 				if (flag == 0) {
// 					isValidPwd_((err,pwd)=>{
// 						if(err){
// 							cb(new Error(err));
// 						}else{
// 							CreateHash_(pwd);
// 							createBucket_(getUsername_(),(err)=>{
// 								if(err){
// 									cb(new Error(err))
// 								}else{
// 									getConnection_().getConnection(function(err,db){   // we can also use DB.getconnection()... but writing in professionl way is good
// 										DB.InsertDocument(db,"USERS",UserDetails_(),(err,res)=>{
// 											if (err){ 
// 												cb(err)
// 											}else{
// 												cb(null,JSON.stringify(res));
// 											}
// 										});  
// 									})
// 								}
// 							})
// 						}
// 					})
					
// 				}else{
// 					cb(new Error("User Already Exist"))
// 				}
// 			}
// 		})
// 		return;
		
// 	}
// 	createUserId(username,cb){
// 		return ;
// 	}
// 	createBucket(username,cb){ //use this method whre the signup.api written
// 		//better to add USER ID after username
// 		var dir = __dirname + '/uploads/' + username;
// 		this.createBucketInfo((err,res)=>{
// 			if(err){
// 				cb(new Error(err))
// 			}else{
// 				if(!fs.existsSync(dir)){ //this is synchronous method so we can't get cb errors
// 					fs.mkdirSync(dir,{recursive: true});
// 					cb(null)
// 				}else{
// 					cb(new Error("User Bucket exist"));
// 				}
// 			}
// 		})
// 		this.dir = dir;
// 		return ;
// 	}
// 	createBucketInfo(cb){
// 		var BucketInfo = this.UserBucketDetails();
// 		const COLLECTION_NAME = "BucketInfo";
// 		this.getConnection().getConnection((err,db)=>{
// 			DB.InsertDocument(db,COLLECTION_NAME,BucketInfo,(err,res)=>{
// 				if(err){
// 					cb(new Error(err));
// 				}else{
// 					cb(null,res);
// 				}
// 			})
// 		});
// 		return;
// 	}
// 	getHashPwd(){
// 		return this.result;
// 	}
// 	getUser(cb){
// 		var results, flag;
// 		validater.isValidUsername(this.username,null,null,function(err,res){
// 			if(err){
// 				cb(new Error(err))
// 			}else{
// 				results = res; //credentials.username
// 				if(results == null || results == "undefined"){
// 					flag= 0
// 				}else{
// 					flag = 1;
// 				}
// 				cb(null,flag)
// 			}
// 			return;
// 		})
// 	}
// 	getBucket(){
// 		return this.dir;
// 	}
// 	getBucketName(){ //This function like a formula ,by this way bucket name is denoted
// 		//username + USER-ID;
// 		return this.getUsername();
// 	}
// 	getUsername(){
// 		return this.username;
// 	}
// 	getUserId(){
// 		return;
// 	}

// }	


// var signup_ = new signup("u","p","pa","u","user-1","hexadecimal-markhendry","hexadecimal-markhendry");
// //these all should be write in signup.api
// try
// {
// 	signup_.signup((err,res)=>{
// 		if(err){
// 			console.log(err.message)
// 		}else{
// 			console.log(res);
// 		}
// 	})
// }catch(err ){
// 	console.log(err.message)
// }


// // updater(){
// // 	this.getConnection().getConnection(function(db){
// // 		db.collection("customer").updateMany({name: "Rajas"},{$set: {nickname: "Raju"}},function(err,res){
// // 			if(err) throw err;
// // 			console.log("Yeah Updated")
// // 		});

// // 	})
// // }
// // this.getConnection().getConnection(function(db){
// 		// 	DB.drop_Collection(db,"USERS");
// 		// })