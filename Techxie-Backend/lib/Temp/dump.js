// var DB = require('./../config/M_Database');
// //default values 7
// //filefolders lib is commonn for upload file api and new folder api;
// //Main varibles used :- foldernumber ,filenumber,page nnumber
// class FilesFolders{
// 	constructor(username =null,token=null,pagenumber=null,foldername = null,foldernumber=null,filename=null,filenumber=null,TYPE=null){
// 		var valid,parent_directory;	
// 		this.username = username;
// 		this.token = token;
// 		this.pagenumber = pagenumber; //n
// 		this.parent_directory = parent_directory;
// 		this.foldername = foldername; 
// 		this.foldernumber = foldernumber; //n 
// 		this.filename = filename;
// 		this.filenumber = filenumber; //n
// 		this.TYPE = TYPE; 
// 		this.valid = valid;
// 		console.log(this.TYPE)

// 	}
// 	getConnection(){
// 		return DB;
// 	}
// 	AppendFoldersFiles(cb){ //UD [args] are - db,query,token,collection_name,arr,cb
// 		var format;
// 		var TYPE = this.getType(); //temp
// 		console.log(TYPE)
// 		if(TYPE == "folders"){
// 			format = "FOLDERS";
// 			this.AppendingFunction(TYPE,format,(err,res)=>{
// 				if(err){ cb(new Error(err))}
// 				else{
// 					cb(null,res)
// 				}
// 			});
// 		}else if(TYPE == "files"){
// 			format = "FILES";
// 			this.AppendingFunction(TYPE,format,(err,res)=>{
// 				if(err){ cb(new Error(err))}
// 				else{
// 					cb(null,res)
// 				}
// 			});
// 		}else{
// 			cb(new Error("something went wrong"))
// 		}
// 	}
// 	AppendingFunction(TYPE,format,cb){
// 		var query;
// 		const C_Name = "BucketInfo";
// 		const username = this.getUsername();
// 		const token = this.getToken();
// 		this.setData(TYPE).then((DATA_)=>{
// 			if(DATA_[1] != null){	
// 				var DATA = DATA_[1];
// 				console.log(JSON.stringify(DATA));
// 				query = {username : username}
// 				this.getConnection().getConnection((err,db) =>{
// 					if(err){ cb( new Error(err))}
// 					else{
// 						DB.UpdateDocument(db,query,token,C_Name,{FOLDERS: DATA},(err,res)=>{
// 							if(err){
// 								cb(new Error(err));
// 							}else{
// 								cb(null,res);
// 							}
// 						})
// 					}
// 				});
// 			}else{
// 				cb(new Error(DATA_[0]));
// 			}
// 		});

// 	}
// 	SearchFoldersFiles(){
// 		return;
// 	}
// 	DeleteFoldersFiles(){
// 		return;
// 	}
// 	DeleteBucket(){
// 		return ; //temp
// 	}
// 	isValidPageNumber(){
// 		return;
// 	}
// 	setData(TYPE){
// 		var err;
// 		var page_number_key = this.getPPageNumber();
// 		var SUBDATA_1 ={};
// 		var SUBDATA_2 = {};
// 		var DATA = {
// 			[page_number_key]:SUBDATA_1,
// 			// last_page_number:this.getLPageNumber(),
// 		}
// 		//future data entries are size, type,data evrything should be added
// 		return new Promise((resolve,reject) =>{
// 			if(this.isValidInput(TYPE) == 1){
// 				SUBDATA_1['locator'] = "locator";
// 				SUBDATA_1[this.getPFolderNumber()] = SUBDATA_2;  
// 				SUBDATA_2.folder_name = this.getFolderName();
// 				SUBDATA_2.parent_dir = this.getParentDirectory();
// 				resolve([null,DATA]);
// 			}else if(this.isValidInput(TYPE) == 2){ //file type
// 				SUBDATA_1[this.getPFileNumber()] = SUBDATA_2;
// 				SUBDATA_2.file_name = this.getFileName();
// 				SUBDATA_2.parent_dir = this.getParentDirectory();
// 				resolve([null,DATA]);
// 			}else{
// 				err = "Invalid input";
// 				resolve([err,null])
// 			}
// 		});

// 	}
// 	//how to use ? put getTYPE as input and then get the stuffs
// 	isValidInput(inputs){ //inputs - type and fkeys , pkeys //check if empty or not
// 		if(inputs == "files" || inputs =="folders"){ //not in use //to check the file no. and folder is crt f1 like that
// 			if(inputs == "files"){ 
// 				this.valid = 2; 
// 			}else{
// 				this.valid = 1;
// 			}
// 		}else { //in use
// 			var inputs_ = inputs.split('-');
// 			switch (inputs_[0]) { //hack possibilty if i[1] mayy be a string what to do ?
// 				case "F":
// 					this.valid = 1;
// 					break;
// 				case "FI":
// 					this.valid = 2;
// 					break;
// 				case "P":
// 					this.valid = 3;
// 					break;
// 				default:
// 					this.valid = 0; //if 0 invalid value err should be throw
// 					break;
				
// 			}
// 		}//got algo
// 		return this.valid;
// 	}
// 	//getting if there existing keys , by using this we can check th req keys is valid or not
// 	retriveKeys(cb){ //getting all pages should be a risky task , think when it ccomes to big data 
// 		var username,query,COLLECTION_NAME,err,location;
// 		COLLECTION_NAME = "BucketInfo"; //finding documents
// 		username = this.getUsername(); 
// 		console.log(this.getPPageNumber() + this.getPFolderNumber())
// 		if(this.getType() == "folders" && this.getPPageNumber()!= null){
// 			location = 'FOLDERS.'+this.getPPageNumber()+'.'+this.getPFolderNumber()+'.folder_name';
// 			query = {username: username,[location]:'Folder'} //to find pg first
// 			this.getConnection().getConnection((err,db)=>{
// 				if(err){
// 					cb(new Error(err));
// 				}else{//db,collection_name,query,cb
// 					DB.FindDocument(db,COLLECTION_NAME,query,(err,res) =>{
// 						if(err){
// 							cb(new Error(err));
// 						}else{
// 							console.log(JSON.stringify(res))
// 							cb(null,res);
// 						}
// 					})
// 				}
// 			})
// 		}else if (this.getType() == "files" && this.getFilenumber() != null){
// 			//getting pages
// 			query = {username: username,FOLDERS:{}}
// 		}else{
// 			err = "Unexcepted values found" ; // block the IP [create log] here
// 			return;
// 		}
// 	}
// 	retriveKeysFunction(cbc,cb){
// 		return;
// 	}
// 	//validating
// 	isValidKey(){ // by checking if there a key like req key exist or not 
// 		return;
// 	}
// 	getParentDirectory(){ //use switch case
// 		return this.parent_directory;
// 	}
// 	counter(){
// 		return null; //temp
// 	}
// 	getUsername(){ // to get username from construct [short form -c]
// 		return this.username;
// 	}
// 	getToken(){ // to get token from constuct
// 		return this.token;
// 	}
// 	getPageNumber(){ // to get the pg number -c
// 		return this.pagenumber;
// 	}
// 	getLPageNumber(){ //to get the last page number  //not in use
// 		var LPG = this.getPageNumber() - 1;
// 		return LPG.toString();
// 	}
// 	getFolderName(){ // to get the folder name-c
// 		return this.foldername;
// 	}
// 	getFolderNumber(){  // to get the folder number -c
// 		return this.foldernumber;
// 	}
// 	getFileName(){ // to get the file name -c
// 		return this.filename;
// 	}
// 	getFileNumber(){  // to get the file no. -c
// 		return this.filenumber;
// 	}
// 	getType(){ //to get the type - c . when using this func in ur func check whther it is  == "folders"
// 		return this.TYPE;
// 	}
// 	getPPageNumber(){
// 		var page_number = this.Pack(this.getPageNumber(),"pages");
// 		return page_number;
// 	}
// 	getPFolderNumber(){
// 		var folder_number = this.Pack(this.getFolderNumber(),"folders");
// 		return folder_number;
// 	}
// 	getPFileNumber(){
// 		var file_number = this.Pack(this.getFileNumber(),"files");
// 		return file_number;
// 	}
// 	Pack(input,format){
// 		//pack the string with requested format
// 		var val;
// 		this.val = val;
// 		if(typeof(input) == "number"){
// 			switch (format) {
// 				case "folders":
// 					this.val = "F-"+ input.toString();
// 					break; 
// 				case "files":
// 					this.val = "FI-" + input.toString();
// 					break;
// 				case "pages":
// 					this.val =  "P-" + input.toString();
// 					break;
// 				default:
// 					this.val  = null ;
// 					break;
// 			}
// 		}else{
// 			this.val = null;
// 		}
// 		return this.val;
// 	}
// 	Unpack(input,format){
// 		var value,dump; 
// 		this.value = value;
// 		if(typeof(input)  == "string"){
// 			if(this.isValidInput() == 1 || this.isValidInput() == 2 || this.isValidInput() == 3){
// 				dump = input.split("-");
// 				this.value = dump[1];
// 			}else{
// 				this.value = null;
// 			}
// 		}else{
// 			this.value = null; //err
// 		}
// 	}
// }
// // username =null,token=null,pagenumber=null,foldername = null,foldernumber=null,filename=null,filenumber=null,TYPE=null
// var test = new FilesFolders("user-1",null,1,"Folder",1,null,null,"folders");
// test.AppendFoldersFiles((err,res)=>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(JSON.stringify(res))
// 	}
// });
// test.retriveKeys((err,res)=>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(JSON.stringify(res))
// 	}
// })
// console.log(test.getPPageNumber());
// // test.getLastKey((err,res)=>{
// // 	if(err){
// // 		console.log(err)
// // 	}else{
// // 		console.log(JSON.stringify(res));
// // 	}
// // })
// //DB architecture should be categorized like 
// /*
// files{
// 	//
// }folderS{
// 	//
// }
// */
// const fs = require('fs') 
// const envfile = require('envfile')
// const sourcePath = 'info.env'
// console.log(envfile.parseFileSync(sourcePath))
// let parsedFile = envfile.parseFileSync(sourcePath);
// parsedFile.MAX_LIMIT = 'newVariableValue'
// fs.writeFileSync('./.env', envfile.stringifySync(parsedFile)) 
// console.log(envfile.stringifySync(parsedFile))
var mongoclient = require('mongodb').MongoClient;
var HOST,USERNAME,PASSWORD,DATABASE_NAME,PORT;
HOST = "localhost";
PORT = "27017";
USERNAME = "";
PASSWORD = "";
DATABASE_NAME = "data";
var myURL = "mongodb://"+ HOST +":" +PORT+"/";
var ERR;
function getConnection(cb){
	
	mongoclient.connect(myURL,function(err,db_){
	var db;
	if(err){
		ERR = "Connection Failed"; //Take orgina err as log as as how it failed future and send your eror to next
		cb(new Error(ERR));  // Err =""cand putting in cb is not a best way instead put new Error or new Exceptionhandlers.Errors("somethiing went wrong"); dont throw errors here
	}else{
		db = db_.db(DATABASE_NAME);
		cb(null,db)	
	}
	return;
	})
	
	
}
getConnection((err,db)=>{
	if(err) throw err;
	db.collection("USERS").findOne({name:"jancy"},function(err,res){
		if(err){
			throw new Error("Can't find documents something went wrong"); //take errors as log
		}else{
			console.log(res)
		}
		return;
	})
}) 
