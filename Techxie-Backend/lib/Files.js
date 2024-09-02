//files
var DB = require('./../config/M_Database');
var ExceptionHandler  =require('./ExceptionHandlers.js')
class Files{
	constructor(){

	}
	getConnection(){
		return DB;
	}

	getFolderInfo(username,userID,F_num,cb){ // checkLastFolderNum in folder.js
		var query = {username: username,USER_ID: Number(userID)};
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError("something went wrong"))
			}else{
				DB.FindDocument(db,"BucketInfo",query,(err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError("somthing went wrong"))
					}else{
						if(typeof res == "undefined"|| res == null ){
							cb(new ExceptionHandler.UnAuthorized("Invalid Username recived, something went wrong"))
						}else{
							//icount - 1 is the actual items in folder, i count is just to track
							//i_count ,items,if the folder is active then give the stuffs to them
							if(res.F_count > F_num){	
								var i_count = res[F_num].i_count; //got i_count
								var active = res[F_num].active; //got active status
								if(active == 0){
									cb(new ExceptionHandler.NotFound("Already Deleted",200))
								}else{
									console.log(res)
									cb(null,i_count)
								}
							}else{
								cb(new ExceptionHandler.BadRequest("you trynaa hack me by entering diff folder number"))
							}
						}

					}
				})
			}
		})
	}

	updateIcount(username,userID,F_num,i_count,cb){ // to update items count 
		var query = {username: username,USER_ID:Number(userID)};
		var key = F_num + ".i_count" ;
		var data = {
			[`${key}`]: i_count
		}
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError("something went wrong"))
			}else{
				DB.UpdateDocument(db,query,null,"BucketInfo",data,(err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError("something went wrong"));
					}else{ 
						console.log(res)//make a check here by modified count
						cb(null,1);
					}
				})
			}
		})
	}

	//here the f_name is  array
	//F_count denotes the entire folder count which will keep track of the folder number
	//F_num + i_countwhich denotes items in the folder , the all items in the folder should be consider as file eventhough it is a file
	newFile(username,userID,F_num,f_name,i_count,cb){ //This should stored withing the folders
		var query = {username: username,USER_ID:Number(userID)};
		var key_1 = F_num + ".items."   ; // the actual i_count we got from the db first
		var key_2 = F_num + ".i_count" ;
		var key_3 = F_num + ".items"; //not in use
		var key_4;
		var f_id;
		var data = {};
		var n,i;
		var f_id_array = [];
		n = f_name.length; //number files by gettig through the file names in that array 
		for (i=0;i<n;i++){
			key_4 = key_1 + i_count;
			f_id = "f-" + F_num+ "-" + i_count;
			data[key_4] ={
						// this is only used to retive the file what he choose while using our apllication, the other DATAS are store somewhere else
						f_name: f_name[i], //file name // this is only used to retive the file what he choose while using our apllication, the other DATAS are store somewhere else
						f_id:f_id,
						active: 1,
			}
			f_id_array[i] = f_id;
			i_count += 1;
		}
		// console.log("After i_count value " + i_count)
		// console.log(JSON.stringify(data))
		// i_count += 1; 
		//just append in for loop
		// var data = out_data;
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError("something went wrong"))
			}else{
				/**
				 * Note:
				 * I change updateDocument_ to updateDocument !inthis push not used , set used.
				 * if any problem raises , look here once
				 */
				DB.UpdateDocument(db,query,null,"BucketInfo",data,(err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError(err));
					}else{ 
						console.log(res)//make a check here by modified count
						cb(null,i_count,f_id_array); //give this i_count to the next updateicount
					}
				})
			}
		})

	}
	//it will update the stuffs 
	//driveInfo [DB]
	//with set
	uploadFileInfo(username,userID,filenames,f_name_array,f_id_array,file_count,cb){
		var query = {username: username,USER_ID: Number(userID)}
		var key_1,key_2 ;
		var n,i;
		var data ={};
		n = f_id_array.length;
		var file_count,The_Real_F_count,The_Multiplied_File_count;
		for(i=0;i<n;i++){
			// file_count = f_id_array[i].split('-');
			// The_Real_F_count = Number(file_count[1]);
			// The_Multiplied_File_count = The_Real_F_count * Number(file_count[2]);
			key_1 = "Files." + file_count;
			data[key_1] = {
						filename: filenames[i],
						f_name:f_name_array[i],
						f_id: f_id_array[i],
						file_size:"file_size",
						file_modified_date:"file_modified_date",
						file_date:"file_date", // getting via exiF
						file_type:"file_type", // img or video
						file_location: "file_location", // mostly in videos and photos
						file_format: "file_format",
						Video_Description_And_ExiFInfo:{},
						Image_Description_And_ExiFInfo:{},
						Audio_Description_And_ExiFInfo:{},
						Other_Description_And_ExiFInfo:{},
			}
			file_count +=1;
		}
		key_2 = "file_count";
		data[key_2] = file_count
		// for(i=0;i<n;i++){
		// 	key_1 = "Files." + temp_f_id_array[i]
		// 	dump_data[key_1] = {
		// 				"sriram":"sriram"
		// 	}
		// }
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb( new ExceptionHandler.InternalServerError(err))
			}else{
				//For push , the field name in or key name in db mst be type of array 
				DB.UpdateDocument(db,query,null,"driveInfo",data,(err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError(err))
					}else{ //get an acknowledgement
						console.log(res)
						cb(null,true)
					}
				})
			}
		})
	}
	//getting the file information
	getFileInfo(username,userID,f_id,cb){
		/**
		 * To get the spectfic file info 
		 * future add it for get All file info
		 */
		//var query = {username: username,USER_ID: Number(userID),"0.items.2.0.f_name":"file-name"} // take invalid key recive as log
		// you can do it in twice of methods by giving th proper key then it will validate whether the stuffs is there or not, but also you can retrive the entirely by getting the data then filter it in our programming[recommended] becuase it is much less information , we are using this information when a folder is opened we will list them thats why we need
		var key = f_id + ".f_id" ;
		var query_1= {username: username,USER_ID: Number(userID)}
		var query_2 = {Files:{$elemMatch:{f_id: f_id}}}; //var query_2 = {Files:{$elemMatch:{[`${key}`]: f_id}}} - working|| element only returning the array based stuffs for example if GeneralInfo in Db contains "color:yellow" then the query_2 is {GeneralInfo:{$elemMatch:{color: "yellow"}}} it then return the wanted stuffs because this generalinfo is array , but not returning obeject
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError(err))
			}else{//make  the below code in to library function, it may need somewhere
				db.collection("driveInfo").find(query_1).project(query_2).toArray((err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError(err))
					}else{
						console.log(res[0]?.Files )
						res[0]?.Files == undefined || res[0]?.Files == null ?cb(new Error("no such files")):cb(null,res[0]?.Files);
					}
				})
			}
		})
	}
	getFilecount(username,userID,cb){
		/**
		 * To get overall File count from the users bucket
		 */
		var query = {username: username, USER_ID: Number(userID)}
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError(err))
			}else{
				DB.FindDocument(db,"driveInfo",query,(err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError(err))
					}else{
						if(typeof res == "undefined" || res == null){
							cb(new ExceptionHandler.BadRequest("Invalid inputs supplied",200))
						}else{
							var file_count = res.file_count
							cb(null,file_count)
						}
					}
				})
			}
		})
	}
	deleteFile(username,userID,F_num,P_F_num){ 
		/**
		 * check it is valid
		 * make it inactive
		 * 
		 */
		var query = {username: username,USER_ID: Number(userID)}
		var key_1 = F_num + ".active";
		var key_2 = P_F_num + ".items." + item_number + ".active";
		var data = {
			[`${key_1}`]: 0,
			[`${key_2}`]:0,
		}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new ExceptionHandler.InternalServerError("something went wrong"))
			}else{
				DB.UpdateDocument(db,query,null,"BucketInfo",data,(err,res)=>{
					if(err){
						cb(new ExceptionHandler.InternalServerError("something went wrong"))
					}else{
						if(typeof res == "undefined" || res == null){
							cb(new ExceptionHandler.UnAuthorized("Invalid Username or User ID"))
						}else{
							cb(null,res); // check with this result modified count
						}
					}
				})
			}
		})

	}
	viewFileFromBucket(f_name) {
		
	}
	delMulFiles(){
		/**
		 * deleting multiple files while using all delete 
		 */

	}
	/**
	 * below codes are used to test error handling techniques
	 */
	testcb1(username,userID,f_id,cb){
	
		// setTimeout(()=>{
		// 	this.testcb2((er,fl)=>{		
		// 			if(er){
		// 				cb(new Error("went wrong"))
		// 			}else{
		// 				setTimeout(()=>{
		// 					throw new Error("Unncaught Error")
		// 				},100)
		// 			}			
		// 	})
		// },100)
	}

	testcb2(cb) {
		cb(null,1);
		/**
		 * If this was setTimeout [async - real ] this aslo show error in server 
		 * so make sure to alway pass error in next
		 */
	}
}

// var file = new Files();
// new file insertion
// file.getFolderInfo("sriram1234567",89,0,(err,i_count)=>{ //-- done
// 	if(err){
// 		console.log(err.message);
// 	}else{
// 		file.newFile("sriram1234567",89,0,["file-1","file-2","file-3"],i_count,(err,i_count_1,f_id_array)=>{
// 			if(err){
// 				console.log(err.message)
// 			}else{
// 				file.updateIcount("sriram1234567",89,0,i_count_1,(err,res)=>{
// 					if(err){
// 						console.log(err.message)
// 					}else{
// 						file.getFilecount("sriram1234567",89,(err,file_count)=>{
// 							if(err){
// 								console.log(err.message) //cbnew Error(
// 							}else{
// 								file.uploadFileInfo("sriram1234567",89,f_id_array,file_count,(err,res)=>{
// 									if(err){
// 										console.log(err.message)
// 									}else{
// 										console.log("went Fine")
// 									}
// 								})
// 							}
// 						})
					
// 					}
// 				})
// 			}
// 		})
// 	}
// })
//get file count
// file.getFilecount("sriram",13,(err,file_count)=>{
// 	if(err){
// 		console.log(err.message)
// 	}else{
// 		console.log(file_count)
// 	}
// })
//view file 
// file.getFileInfo("sriram",13,"f-0-8",(err,res)=>{ //--done
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(res)
// 	}
// })
	// uploadFileInfoPush(username,userID,temp_f_id_array,cb){
	// 	var query = {username: username,USER_ID: Number(userID)}
	// 	var key_1 ;
	// 	var n,i;
	// 	var data ={};
	// 	n = temp_f_id_array.length;
	// 	for(i=0;i<n;i++){
	// 		key_1 = "Files." + i 
	// 		data[key_1] = {
	// 					"sriram":"sriram"
	// 		}
	// 	}
	// 	// var data = {
	// 	// 	[`${"Files.0"}`]: dump_data[0],
	// 	// 	[`${"Files.1"}`]: dump_data[1],
	// 	// 	[`${"Files.2"}`]: dump_data[2],
	// 	// }
	// 	this.getConnection().getConnection((err,db)=>{
	// 		if(err){
	// 			cb( new Error(err.message))
	// 		}else{
	// 			//For push , the field name in or key name in db mst be type of array 
	// 			DB.UpdateDocument(db,query,null,"driveInfo",data,(err,res)=>{
	// 				if(err){
	// 					cb(new Error(err.message))
	// 				}else{ //get an acknowledgement
	// 					console.log(res)
	// 					cb(null,true)
	// 				}
	// 			})
	// 		}
	// 	})
	// }
	module.exports = {Files}