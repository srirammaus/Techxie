//TEMP //for now we getting everything through user
var DB = require('./../config/M_Database');
class Dir{
	constructor(username =null,token=null,folderName = null,page_number=null,parent_directory=null,foldernumber=null){
		this.username = username;
		this.token = token;
		this.folderName = folderName; 
		this.page_number = page_number;666.
		this.parent_directory = parent_directory; //dont get via user *  juz for temp
		this.foldernumber= foldernumber; //dont get via user
	}
	ListFolders(){ //FOLLOW ALGORITHM
		return;
	}
	//parent directory shouldn't denote the actual name instead u have to specify the fnumber
	AppendFolders(cb){ //append folders to DB

		var dir = this.setDirectory();
		var username = this.getUsername();
		var createKey = this.createKey();
		createKey.then((arr)=>{
			var err = arr[0];
			var Key = arr[1]; //page number
			if(err){
				cb(new Error(err));
			}else{
				var obj = { [Key]: dir.directories};
				this.getConnection().getConnection((err,db)=>{
					DB.UpdateDocument(db,username,null,dir.COLLECTION_NAME,obj,function(err,res){
						if(err){	
							cb(new Error(err));
						}else{
							cb(null,res);
						}
					})
				})
			}
		})

	}
	SearchFolders(){ //search folders from db
		return;  //FOLLOW ALGORITHM
	}
	DeleteFolders(){
		return;
	}
	DeleteBucket(){ //delete the entire bucket , already available in uplaaod.js
		return ;   
	}
	setDirectory(){
		const directories = {
			parent_directory:this.getParentDirectory(),
			f_number:this.getFolderNumber(), //important
			f_name: this.getFolderName(),
			page_number:this.getPageNumber(), //pg number should be manually updated though cllient side
			l_page_number:this.getLPageNumber(), //location page number is pg_number where the folder created or placed 
		}
		const COLLECTION_NAME = 'BucketInfo';
		return {COLLECTION_NAME,directories};
	}
	checkLastKey(cb){ //Here a small formula works that is , counting number the of all keys if it is greater than 4 then we can create F1 , if 5 then F2
		var username = this.getUsername();
		var token ,USER_ID , count;  // this is compulsory to check by token and USER -ID , 
		var query = {username: this.getUsername()}
		this.getConnection().getConnection((err,db) =>{
			DB.FindDocument(db,"BucketInfo",query,function(err,res){
				if(err){
					cb(new Error(err))
				}else{
					if(res != "undefined" && res != null ){
						count = Object.keys(res).length
						cb(null,count)
					}else{ 
						cb(new Error("something went wrong"))}
				}
			})
		});
		return;
	}
	createKey(){ //HERE NOW THE DEFAULT COUNT IS 4  SO, IF 4 THEN F1 , IF 5 THEN F2
		const checkLastKey_ = (cb) =>{ return this.checkLastKey(cb)}
		var promise = new Promise(function(resolve,reject){
			checkLastKey_(function(err,count){
				if(err){
					resolve(new Error(err))
				}else{
					//HERE the default values is 5 so we have to minus everything with 5 then add 1 because the ans will be in base 10 like 0,1... but we ned f1, f2 
					count -= 5;
					count += 1;
					var P = "P-"+ count; //page number
					resolve([null,P]);
				}
			})
		})
		return promise;
		
	}
	getKey(){ //use this func to get key-+
		var err,s_key;
		return new Promise((resolve,reject)=>{
			this.createKey().then((arr)=>{
				err = arr[0];
				s_key = arr[1];
				if(err){
					this.s_key = null
					resolve(this.s_key);
				}else{
					this.s_key = s_key;
					resolve(this.s_key);
				}
			});
		})
	}
	
	getParentDirectory(cb){  // we going to get parent diretory using page number //here we number and p-dir name
		// var query,page_number,p_dir_name;
		// query =  {username: this.getUsername()}
		// this.getConnection().getConnection((err,db)=>{
		// 	DB.FindDocument(db,"BucketInfo",query,function(err,res){
		// 		if(err){
		// 			cb(new Error(err))
		// 		}else{
		// 			console.log(JSON.stringify(res));
		// 			page_number = res;
		// 			cb(null,page_number)
		// 		}
		// 	})
		// })
		// return;
		return this.parent_directory;
	}
	FindCurrentKey(){
		var promise = new Promise(function(resolve,reject){

		})
	}
	getUsername(){
		return this.username;
	}
	getBucketName(){//Bucket dir might be username + USER ID create with that //Bucket Main page is 1
		return this.username;
	}
	getBucketDir(cb){
		var query,dir;
		query =  {username: this.getUsername()}
		this.getConnection().getConnection((err,db)=>{
			DB.FindDocument(db,"USERS",query,function(err,res){
				if(err){
					cb(new Error(err))
				}else{
					dir = res.Bucket;
					cb(null,dir)
				}
			})
		})
		return;
	}
	getFolderName(){
		return this.folderName;
	}
	getPageNumber(){
		return this.page_number;
	}
	getFolderNumber(){
		return this.foldernumber;
	}
	getToken(){
		return this.token;
	}
	getLPageNumber(){ //location of the folder where it is placed or created
		
		var LPG = this.getPageNumber() - 1;
		return LPG.toString();
	}
	getConnection(){
		var conn = DB;
		return conn;
	}
	UnpackJson(){ //create a function to unpack json 
		return;
	}
}
var test = new Dir("hexadecimal-markhendry-1",null,"folderName",1,"f-0","f-1");

var some = test.setDirectory();

var append = test.AppendFolders(function(err,res){
	if(err){
		console.log(err)
	}else{
		console.log(JSON.stringify(res) + "Over here")
	}
})
var get = test.getParentDirectory(function(err,res){
})
test.getKey().then((k)=>{console.log(k)})
//we going to follow base 10 as page numbers like 0,1,2..... main bucket is 0 page no.