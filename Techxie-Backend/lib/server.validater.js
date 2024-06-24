//validater  with db
//LATER: include it in another server then configure it
var DB = require('./../config/M_Database.js');
var fs = require('fs')
var dotenv = require('dotenv'); //initalize dotenv 
dotenv.config({path:"lib/limit.env"}) // initalize path //why lib is used here? because they are start working from REST.api, so!
class validater{
	constructor(username){
		var userID,limit; //limit temp
		this.userID = userID;
		this.username = username;
		this.limit = limit;
	}
	getConnection(){
		return DB;
	}
	UpdateLimit(){ //setting or updating the env varible files
		//algorithm is .. everthing should be multiplied by 10
		var new_min_limit = process.env.MAX_LIMIT;
		var new_max_limit = new_min_limit * 10; 
		process.env.MAX_LIMIT = new_max_limit;
		process.env.MIN_LIMIT = new_min_limit;
		this.UpdateFileLimit(new_max_limit,new_min_limit)

	}
	UpdateFileLimit(max,min){
		const data= "MAX_LIMIT ="+ max +'\n' + 'MIN_LIMIT =' + min;
		var path = __dirname + '/limit.env';
		fs.writeFileSync(path, data);
	}
	createUserId(){ //lets make this dynamic by putting this in db , because we have to alter
		this.userID = Math.floor(Math.random() * (this.getLimit()[0] - this.getLimit()[1]) );
	}
	getLimit(){ // let's do this with env files
		return [process.env.MAX_LIMIT,process.env.MIN_LIMIT];
	}
	getUserId(){
		return this.userID;
	}
	getUsername(){ // let's check the username which satisfies all our conditions
		return this.username;
	}
	InsertUserId(cb){
		var query = {username: this.getUsername(),USER_ID: this.getUserId(),signup:0} //USER_ID caps everywhere
		this.getConnection().getConnection((err,db)=>{
			if(err){ cb(new Error("something went wrong"))}
			else{
				DB.InsertDocument(db,"USER_IDS",query,(err,res)=>{
					if(err){ cb(new Error("something went wrong"))}
					else{
						cb(null,res); //LATER: check confimation
					}
				})
			}
		})
	}
	isValidUserName(cb){ // useful query to get any other contents paced like this - var query = {[`credentials.${'username'}`]:this.getUsername()}
		var query = {username: this.getUsername()}
		var flag = 0; //something went wrong
		this.getConnection().getConnection((err,db) =>{
			if(err){  cb(new Error(err))}
			else{
				DB.FindDocument(db,"USER_IDS",query,(err,res) =>{
					if(err){cb(new Error("Something Went Wrong"))} // take original error as log
					else{
						if( res == null || res == "undefined"){
							flag = -1;
						}else{
							flag = 1;
						}
						cb(null,flag)
					}
				})
			}
		})
	}
	isValidUserID(cb){ 
		var flag = 0;
		var query = {USER_ID: this.getUserId()}
		console.log(this.getUserId() + "user id "); //to check whether the recursion works properly
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
						}
						cb(null,flag)
					}
				})
			}
		})
	}
	Response(recurse = 0,recursive_array,cb){ //recurse  should be put as internal function because if sometimes any other developer use this , they may not notice the recursion tracker it is//  why the limit should be proper  ? bcaz when need a list it should be somewhat ordered manner so!
		var tracker,rec;
		this.createUserId();
		this.isValidUserName((err,flag) =>{
			if(err){ cb(new Error("something went wrong"))}
			else{
				if(flag == -1){ // 1st  step done
					this.isValidUserID((err,flag_)=>{
						if(err){ cb(new Error("something went wrong"))}
						else{
							if(flag_ == -1){ // valid 
								this.InsertUserId((err,res)=>{
									if(err){ cb(new Error("something went Wrong"))}
									else{
										cb(null,{username: this.getUsername(),USER_ID: this.getUserId(),signup:0});
									}
								})
							}else{ //invalid  //min max should be in db , once if they reached their limit they automatically update 	// create a stack of numbers to solve them
								tracker = recursive_array.indexOf(this.getUserId());
								if(tracker == -1){ // acceptable recusion
									recursive_array.push(this.getUserId());
									rec = recurse + 1; //recursion count
									if(rec == this.getLimit()[0]){
										this.UpdateLimit();
										rec = 1; // new beginning
										recursive_array = [];  //new  beginning
									}
									this.Response(rec,recursive_array,cb); 
								}else{ // other user id will be created if this else done
									this.Response(recurse,recursive_array,cb); //it will recurse the all functions again and it set new user id . // set REccursion limit , suppose if something went wrong what will it do
								}								
							}
						}
					})
				}else{
					cb(new Error("User Exist"))
				}
			}

		})
	}
}

module.exports = {validater}

