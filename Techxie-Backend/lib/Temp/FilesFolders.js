var DB = require('./../config/M_Database');
//default values 7
//filefolders lib is commonn for upload file api and new folder api;
//Main varibles used :- foldernumber ,filenumber,page nnumber
class FilesFolders{
	constructor(username =null,token=null,pagenumber=null,foldername = null,foldernumber=null,filename=null,filenumber=null,TYPE=null){
		var valid,parent_directory;	
		this.username = username;
		this.token = token;
		this.pagenumber = pagenumber; //n
		this.parent_directory = parent_directory;
		this.foldername = foldername; 
		this.foldernumber = foldernumber; //n 
		this.filename = filename;
		this.filenumber = filenumber; //n
		this.TYPE = TYPE; 
		this.valid = valid;
	}
	getConnection(){
		return DB;
	}
	AppendFoldersFiles(cb){ //UD [args] are - db,query,token,collection_name,arr,cb
		var TYPE = this.getType(); //temp
		if(TYPE == "FOLDERS"){
			this.AppendingFunction(TYPE,(err,res)=>{
				if(err){ cb(new Error(err))}
				else{
					cb(null,res)
				}
			});
		}else if(TYPE == "FILES"){
			this.AppendingFunction(TYPE,(err,res)=>{
				if(err){ cb(new Error(err))}
				else{
					cb(null,res)
				}
			});
		}else{
			cb(new Error("something went wrong"))
		}
	}
	AppendingFunction(TYPE,cb){
		var query;
		const C_Name = "BucketInfo";
		const username = this.getUsername();
		const token = this.getToken();
		this.setData(TYPE).then((DATA_)=>{
			if(DATA_[1] != null){	
				var DATA = DATA_[1];
				query = {username : username}
				this.getConnection().getConnection((err,db) =>{
					if(err){ cb( new Error(err))}
					else{
						DB.UpdateDocument(db,query,token,C_Name,DATA,(err,res)=>{
							if(err){
								cb(new Error(err));
							}else{
								cb(null,res);
							}
						})
					}
				});
			}else{
				cb(new Error(DATA_[0]));
			}
		});

	}
	SearchFoldersFiles(){
		return;
	}
	DeleteFoldersFiles(){
		return;
	}
	DeleteBucket(){
		return ; //temp
	}
	isValidPageNumber(){
		return;
	}
	setData(TYPE){
		var err,DATA,SUBDATA_1,SUBDATA_2;
		SUBDATA_2 = {};
		SUBDATA_1 = {};
		var page_number_key = this.getPPageNumber();  
		//future data entries are size, type,data evrything should be added
		return new Promise((resolve,reject) =>{
			if(this.isValidInput(TYPE) == 1){
				SUBDATA_2.folder_number = this.getPFolderNumber();
				SUBDATA_2.folder_name = this.getFolderName();
				SUBDATA_2.parent_dir = this.getParentDirectory();
				DATA = {[`FOLDERS.${page_number_key}.${this.getPFolderNumber()}`]:SUBDATA_2, //
					// last_page_number:this.getLPageNumber(),
				} 
				resolve([null,DATA]);
			}else if(this.isValidInput(TYPE) == 2){ //file type
				SUBDATA_2.file_name = this.getFileName();
				SUBDATA_2.parent_dir = this.getParentDirectory();
				DATA = {[`FOLDERS.${page_number_key}.${this.getPFileNumber()}`]:SUBDATA_2, //
					// last_page_number:this.getLPageNumber(),
				}
				resolve([null,DATA]);
			}else{
				err = "Invalid input";
				resolve([err,null])
			}
		});

	}
	//how to use ? put getTYPE as input and then get the stuffs
	isValidInput(inputs){ //inputs - type and fkeys , pkeys //check if empty or not
		if(inputs == "FILES" || inputs =="FOLDERS"){ //not in use //to check the file no. and folder is crt f1 like that
			if(inputs == "FILES"){ 
				this.valid = 2; 
			}else{
				this.valid = 1;
			}
		}else { //in use
			var inputs_ = inputs.split('-');
			switch (inputs_[0]) { //hack possibilty if i[1] mayy be a string what to do ?
				case "F":
					this.valid = 1;
					break;
				case "FI":
					this.valid = 2;
					break;
				case "P":
					this.valid = 3;
					break;
				default:
					this.valid = 0; //if 0 invalid value err should be throw
					break;
				
			}
		}//got algo
		return this.valid;
	}
	//getting if there existing keys , by using this we can check th req keys is valid or not
	retriveKeys(cb){ //getting all pages should be a risky task , think when it ccomes to big data 
		var username,query,COLLECTION_NAME,err,location;
		COLLECTION_NAME = "BucketInfo"; //finding documents
		username = this.getUsername(); 
		if(this.isValidInput(this.getType()) == 1 && this.getPPageNumber()!= null){
			query = {"FOLDERS":1}
			this.retriveKeysFunction(username,COLLECTION_NAME,query,"FOLDERS",(err,res)=>{
				if(err){ cb(new Error(err))}
				else{
					cb(null,res);
				}
			})
		}else if (this.isValidInput(this.getType()) == 2 && this.getFilenumber() != null){
			query = {username:username,FOLDERS:{}}
			this.retriveKeysFunction(username,COLLECTION_NAME,query,"FILES",(err,res)=>{
				if(err){ cb(new Error(err))}
				else{
					cb(null,res);
				}
			})
		}else{
			err = "Unexcepted values found" ; // block the IP [create log] here			
		}
		return;
	}
	retriveKeysFunction(username,collection_name,query,TYPE,cb){
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new Error(err));
			}else{//db,collection_name,query,cb
				DB.FindSomeDocument(db,collection_name,{},query,(err,res) =>{
					if(err){
						cb(new Error(err));
					}else{
						if(TYPE == "FOLDERS"){
							console.log(JSON.stringify(res))
							cb(null,res);
						}else{
							cb(null,Object.keys(res[0].FILES));
						}
						
					}
				})
			}
		})
	}
	//validating
	isValidKey(){ // by checking if there a key like req key exist or not 
		return;
	}
	Counter(presentKey){ //it should be either pg key or folder key or file key
		var query,counter,type,COLLECTION_NAME;
		COLLECTION_NAME = "BucketInfo";
		type = this.getType();
		counter = this.Unpack(presentKey,type);
		switch (type) {
			case "FOLDERS":
				query = {username: this.getUsername()}
				break;
			case "FILES":
				// statements_1
				break;
			default:
				// statements_def
				break;
		}
		
		return new Promise((resolve,reject)=>{
			this.getConnection().getConnection((err,db)=>{
				if(err){ resolve([err,null])}
				else{
					DB.InsertDocument(db,COLLECTION_NAME,query,(err,res)=>{
						if(err){ resolve([err,null])}
						else{
							resolve([res,null])
						}
					})
				}
			})
		})
	}
	getParentDirectory(){ //use switch case
		return this.parent_directory;
	}
	getUsername(){ // to get username from construct [short form -c]
		return this.username;
	}
	getToken(){ // to get token from constuct
		return this.token;
	}
	getPageNumber(){ // to get the pg number -c
		return this.pagenumber;
	}
	getLPageNumber(){ //to get the last page number  //not in use
		var LPG = this.getPageNumber() - 1;
		return LPG.toString();
	}
	getFolderName(){ // to get the folder name-c
		return this.foldername;
	}
	getFolderNumber(){  // to get the folder number -c
		return this.foldernumber;
	}
	getFileName(){ // to get the file name -c
		return this.filename;
	}
	getFileNumber(){  // to get the file no. -c
		return this.filenumber;
	}
	getType(){ //to get the type - c . when using this func in ur func check whther it is  == "folders"
		return this.TYPE;
	}
	getPPageNumber(){
		var page_number = this.Pack(this.getPageNumber(),"PAGES");
		return page_number;
	}
	getPFolderNumber(){
		var folder_number = this.Pack(this.getFolderNumber(),"FOLDERS");
		return folder_number;
	}
	getPFileNumber(){
		var file_number = this.Pack(this.getFileNumber(),"FILES");
		return file_number;
	}
	Pack(input,TYPE){
		//pack the string with requested TYPE
		var val;
		this.val = val;
		if(typeof(input) == "number"){
			switch (TYPE) {
				case "FOLDERS":
					this.val = "F-"+ input.toString();
					break; 
				case "FILES":
					this.val = "FI-" + input.toString();
					break;
				case "PAGES":
					this.val =  "P-" + input.toString();
					break;
				default:
					this.val  = null ;
					break;
			}
		}else{
			this.val = null;
		}
		return this.val;
	}
	Unpack(input,TYPE){
		var value,dump; 
		this.value = value;
		if(typeof(input)  == "string"){
			if(this.isValidInput() == 1 || this.isValidInput() == 2 || this.isValidInput() == 3){
				dump = input.split("-");
				this.value = dump[1];
			}else{
				this.value = null;
			}
		}else{
			this.value = null; //err
		}
	}
}
// username =null,token=null,pagenumber=null,foldername = null,foldernumber=null,filename=null,filenumber=null,TYPE=null
var test = new FilesFolders("user-1",null,3,"Folder",3,null,null,"FOLDERS");
test.AppendFoldersFiles((err,res)=>{
	if(err){
		console.log(err);
	}else{
		console.log(JSON.stringify(res))
	}
});
test.retriveKeys((err,res)=>{
	if(err){
		console.log(err);
	}else{
		console.log(JSON.stringify(res))
	}
})
console.log(test.getPPageNumber());
// test.getLastKey((err,res)=>{
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(JSON.stringify(res));
// 	}
// })
//DB architecture should be categorized like 
/*
files{
	//
}folderS{
	//
}
*/