//Files uploading library
var multer = require('multer');
var fs = require('fs');
var OAuth = require(__dirname + "/OAuth").OAuth;
var xsrf_verification_lib = require(__dirname + "/xsrf_verification").xsrf_verification;
var DB = require('./../config/M_Database');
const Files = require(__dirname + '/Files.js');
var filter = require(__dirname + '/filter.js');
var ExceptionHandler =require('./ExceptionHandlers.js');
//check if the parameters are empty - pending
//token should be validated
///upload has more pending works
// if there is no  file also this showing upload succesfullly
class upload{ // check username , token , user is corresponding to theri types like string
	constructor(username,token){
		this.username = username;
		this.token = token;
	}
	//if there is no uploads key in request paramter it won't cnosider this as multipart form data request , instead it consider this ias normal request so the file destination,storage won't work
	initialize(){ // use to initailize
		var username,file_original_name,userID,sessionID,session_token,csrf_token;
		var f_names =[];
		var Multer = multer.diskStorage({
			destination:(req,file,cb)=>{
				let properties = ["body"]
                let requiredParams = ["username","userID","xsrf_token","session_token","sessionID"]

				filter.Filter(req,null,null,properties,requiredParams).then(flag =>{
					if(flag == 1){
						username = req.body.username;
						userID = req.body.userID;
						session_token = req.body.session_token;
						sessionID =  req.body.sessionID;
						csrf_token = req.body.csrf_token || req.body.xsrf_token;
						
						var xsrf_verification = new xsrf_verification_lib();
						if(username == null || typeof username == "undefined" && sessionID == null || typeof sessionID == "undefined" && session_token == null || typeof session_token == "undefined" && csrf_token == null || typeof csrf_token == "undefined" && userID == null || typeof userID == "undefined" ){
							cb(new ExceptionHandler.BadRequest("Invalid Inputs"))
						}
						else if(username != "undefined" && this.isValidType(username)){
							new OAuth().Authenticate(username,session_token,sessionID,(err,result)=>{
								if(err){
									cb(new Error(err.message));
								}else if (result == 1){
									xsrf_verification.setter([userID,csrf_token]);
									xsrf_verification.verify((err,flag,result_)=>{
										if(err){
											cb(new Error(err.message));
										}else if(flag ==0 ){
											cb(new ExceptionHandler.UnAuthorized("csrf token expired"))
										}else{
											cb(null,this.getBucket(userID))
										}
									})
									
								}else{
									cb(new ExceptionHandler.InternalServerError("something went wrong"))
								}
							})
							
						}	 // not uploaded : error handling problem everywhere
						else{
							cb( new ExceptionHandler.InternalServerError("something went  wrong"))
						}
					}else {
						cb(new  ExceptionHandler.InternalServerError("something went wrong"))
					}
				}).catch(err=>{
					cb (err)
				})
				
			},
			filename: (req,file,cb)=>{
				// check whether filen name already exixts or not ! same file uploaded not a problem .
				let f_name = this.setf_name(file?.originalname);
				file_original_name = f_name //file.originalname
				req.body.f_names = f_names
				f_names.push(f_name)
				if(file_original_name != "undefined" &&this.isValidType(file_original_name)){
					cb(null,this.getFileName(file_original_name));
				}	
			}
		})
		return Multer;
	}
	isValidFile(fileType){ //check if the file type is valid
		var check;
		var validFileFormats = ['png','jpg','jpeg','pdf','mp4']; // i think if we change the header we could pentetrarte here
		var split_ = fileType.split('/')
		check = validFileFormats.indexOf(split_[1]);
		if(check == -1){
			return false;
		}
		return true;
	}
	setMulter(){ //setting the path or storage stuffs //pending: images size
		var storage = this.initialize();
		var upload = multer({
					fileFilter: (req,file,cb)=>{
						this.setFileFlag(1);
						console.log("Here: " + this.getFileFlag())
						if(!this.isValidFile(file.mimetype)){
							return cb(null,false,new ExceptionHandler.BadRequest("Upload a valid File"));
						}else{
							cb(null,true);
						}
					
					},
						storage: storage
					})
		this.upload = upload;
		return this.upload;
	}
	// next work
	updateBucket(cb){
		DB.getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError("something went wrong"))
			}else{
				return;
			}
		})
	}

	//next work
	isExistingName(){
		return;
	}
	//This is how you can learn about scoping of a variable
	//a setter inside the callback is a child of multer , that's how we can able to getter that in other lib
	setFileFlag(flag){
		this.Flag = 1;
	}
	setf_name (original_filename) {
		var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var xsrf_token = '';
        for(var i = 0; i < 15; i++) {
            xsrf_token += chars[Math.floor(Math.random() * chars.length)];
        }
        var f_name = xsrf_token;//original_filename.toString() + '-' +  
        return f_name; 
	}
	getFileFlag(){
		return this.Flag;
	}
	getConnection(){
		return DB;
	}
	getMulter(){ // getting the initalized multer 
		return this.upload;
	}
	getRMulter(){//getting native multer 
		return multer; 
	}
	getFileName(fileName){ //  check the whether the filename exists or not . same file uplodaded not an problem
		var f_name  = fileName; // just encode
		return f_name;
	}
	getBucket(userID){ 
		var dir =  __dirname + "/WebDrive/" + userID; // add user id
		return dir;
	}
	fetchBucketID(){
		return; // get through db  bucket info
	}
	isValidType(element){
		if(typeof(element) == "string"){
			return true;
		}else{ return false}
	}
}

module.exports = {upload}
// > console.log(Buffer.from("Hello World").toString('base64'));
// SGVsbG8gV29ybGQ=
// > console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
// Hello World