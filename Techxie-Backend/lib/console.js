// bucket accessbility

//getting which folder is active
var DB =  require('./../config/M_Database');
class Folder_console{

	constructor(){

	}
	getConnection(){
		return DB;
	}
	//To extract files from  server using the db extracted infomation
	ExtractFileFromServer(Data){
		var Data_length = Data.length;
		var Folder_name,Fid;
		for (var i=0;i<Data_length;i++){

		}
	}
	//it will the stuffs in db to client
	ListFilesAndFolder(username,userID,cb){ // getting the file info
		var query = {username: username,USER_ID: Number(userID)} ; 
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new Error(err.message));
			}else{
				DB.FindDocument(db,"BucketInfo",query,(err,res)=>{
					if(typeof res ==  undefined || res == null){
						cb(new Error("Invalid Username or UserID"))
					}else{
						console.log(res)
						cb(null, res);
					}
				})
			}
		})
		
	}
}
var folder_console =  new Folder_console();
folder_console.ListFilesAndFolder("shriram",17,(err,res)=>{
	if(err){
		console.log(err.message);
	}else{
		console.log("it went fine")
	}
})

module.exports = {Folder_console}