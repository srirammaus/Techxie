// create a folder request
//if need create a sep lib for del, view , new folder and integrate with this
// delete folder 
// view folder
// rename or update folder

var DB =  require('./../config/M_Database');
var xsrf_verification_lib = require(__dirname + '/xsrf_verification').xsrf_verification;
var OAuth = require(__dirname + '/OAuth').OAuth;
class Folder{
	constructor(){

	}
	getConnection(){
		return DB;
	}
	checkIfExistingFolder(){
		//stop before this

	}
	// Getting the correct last folder and getting i_count via this  
	// For getting i_count and F_count.
	// You have to get f_num by user or client.
	//actually it is used for lot of purpose read the code then you got
	checkLastFolderNum(username,userID,F_num,cb){
		var query = {username: username,USER_ID: Number(userID)}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.FindDocument(db,"BucketInfo",query,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"));
					}else{
						if(typeof res == "undefined"|| res == null ){
							cb(new Error("Invalid Username recived, something went wrong"))
						}else{
							if(typeof res == "undefined" || res == null){
								cb(new Error("Invalid Username or USER_ID"))
							}else if(typeof res[F_num] == "undefined" || res[F_num] == null){
								cb(new Error("Invalid Folder number"))
							}else{
								var F_count = res.F_count ;   //F_count: folder count
								var i_count = res[F_num].i_count;
								var active  = res[F_num].active;
								var P_F_num = res[F_num].P_F_num;
								var item_number = res[F_num].item_number
								cb(null,F_count,i_count,active,P_F_num,item_number); // why putting res in last becuase we have to get correct folder's i_count

							}
						}
					}
				})
			}
		})
	}

	//update Fcount while creating new folder
	//update F_count formula:-
	// F_count:1 - def new folder notice: main folder or main emptypage is F-0
	// F_count -= 1 -> while creating new folder F_count should be get minus to know the curreent folder folder number
	// F_count - should be get updated once they used
	// Here the minused last _f_count should not be used 
	updateFcount(username,userID,last_F_count,cb){ // once new folder added
		var query = {username: username,USER_ID:Number(userID)};
		var F_count = last_F_count + 1;
		var data = {F_count: F_count}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.UpdateDocument(db,query,null,"BucketInfo",data,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						console.log(res) // pending:check this via modified count 
						cb(null, 1)
					}
				})
			}
		})

	}
	//i_count is the items within the folder
	//i_count def value 1
	//i_count -= 1 is while adding something file or folder
	// then it [i.e is 0 ] 0:{}-- In data created
	// then it should be get updated exact last_i_count should be used
	updateIcount(username,userID,F_num,last_I_count,cb){
		var query = {username: username,USER_ID:Number(userID)};
		var i_count = last_I_count + 1;
		var key = F_num + ".i_count" ;
		var data = {
			[`${key}`]: i_count,
		}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.UpdateDocument(db,query,null,"BucketInfo",data,(err,res)=>{
					if(err){
						cb(new Error(err.message))
					}else{
						console.log(res) // pending:check this via modified count 
						cb(null, 1)
					}
				})
			}
		}) 
	}
	//similar to file
	// F_num is user given input // F_num is the current fodler where it is creating
	//F_count denotes the entire folder count which will keep track of the folder number
	// F_num + i_count which denotes items in the folder , the all items in the folder should be consider as file eventhough it is a file
	NewFolder(username,userID,F_num,F_name,F_count,i_count,cb){
		var query = {username: username,USER_ID: Number(userID)};
		var F_id = "F-" + F_count; // actual F_count
		var f_id ="f-" +F_num + "-" + i_count;
		var key = F_num + ".items." + i_count;
		//priotize this , why because if the out data fails we handle it via clicking the present listed data and not created out data will be upserted to db properly 
		var In_data = { // within the parent folder
			[`${key}`]:{
				F_name: F_name,
				F_id: F_id,
				f_id:f_id,
				active:1,
			},
			//while extending our server we have to create a folder icon with images like our local folder icons in computer
			[`${F_count}`]:{
				F_name: F_name,
				F_id:F_id,
				F_num: F_count,
				P_F_num: F_num, // parent folder number
				item_number:i_count, // to track , in which index this folder located in their parent folder
				active:1,
				i_count:0, // def is zero , it will be increase when the new folder is inserted , YOU CAN SEE THAT IN UPDATEICOUNT
				items:[],
			}     

			 
		};
		var data = In_data;
		var F_id_array = [];
		F_id_array[0] = F_id;
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.UpdateDocument(db,query,null,"BucketInfo",data,(err,result)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						console.log(result); //check this via modified count
						cb(null,F_id_array)
					}
				})
			}
		})
	}
	//in future , if u developed multiple folders in once , then put those F_id in array and put in loop like uploadfileinfo in files.js
	//i am not changing this even thought for understanding purpose the above documentation is determined by me
	uploadFolderInfo(username,userID,F_id_array,Description= "This is a default description",cb){
		var query = {username: username,USER_ID: Number(userID)}
		var key_1 ;
		var n,i;
		var data ={};
		var F_count_by_f_id_array;
		var Folder_count;
		n = F_id_array.length;
		for(i=0;i<n;i++){
			Folder_count = F_id_array[i].split("-");
			F_count_by_f_id_array = Folder_count[1] 
			key_1 = "Folders." +  F_count_by_f_id_array;
			data[key_1] = {
						Foldername: "Foldername",
						F_name:"F_name",
						F_id: F_id_array[i],
						Folder_size:"Folder_size",
						Folder_modiFied_date:"Folder_modiFied_date",
						Folder_date:"Folder_date", // getting via exiF
						Folder_type:"Folder_type", // img or video
						Description:Description,
			}
		}
		// for(i=0;i<n;i++){
		// 	key_1 = "Files." + temp_f_id_array[i]
		// 	dump_data[key_1] = {
		// 				"sriram":"sriram"
		// 	}
		// }
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb( new Error(err.message))
			}else{
				//For push , the field name in or key name in db mst be type of array 
				DB.UpdateDocument(db,query,null,"driveInfo",data,(err,res)=>{
					if(err){
						cb(new Error(err.message))
					}else{ //get an acknowledgement
						console.log(res)
						cb(null,true)
					}
				})
			}
		})
	}
	getFolderInfo(username,userID,F_id,cb){
		//var query = {username: username,USER_ID: Number(userID),"0.items.2.0.f_name":"file-name"} // take invalid key recive as log
		// you can do it in twice of methods by giving th proper key then it will validate whether the stuffs is there or not, but also you can retrive the entirely by getting the data then filter it in our programming[recommended] becuase it is much less information , we are using this information when a folder is opened we will list them thats why we need
		var key = F_id + ".F_id" ;
		console.log(key)
		var query_1= {username: username,USER_ID: Number(userID)}
		var query_2 = {Folders:{$elemMatch:{F_id: F_id}}}; //var query_2 = {Files:{$elemMatch:{[`${key}`]: F_id}}} - working|| element only returning the array based stuffs for example if GeneralInfo in Db contains "color:yellow" then the query_2 is {GeneralInfo:{$elemMatch:{color: "yellow"}}} it then return the wanted stuffs because this generalinfo is array , but not returning obeject
		this.getConnection().getConnection((err,db)=>{
			if(err){
				cb(new Error(err.message))
			}else{//make  the below code in to library function, it may need somewhere
				db.collection("driveInfo").find(query_1).project(query_2).toArray((err,res)=>{
					if(err){
						cb(new Error(err.message))
					}else{
						cb(null,res[0].Folders);
					}
				})
			}
		})
	}
	//NOT IN USE
	upsertOutData(username,userID,F_name,F_count,cb){
		var query = {username: username,USER_ID: Number(userID)};
		var F_id = "F-" + F_count;
		var Out_data = {
			[`${F_count}`]:{
				F_name: F_name,
				F_id:F_id,
				F_num: F_count,
				active:1,
				active_Folders:[],
				i_count:1,
				items:[],
			}
		}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.UpdateDocument(db,query,null,"BucketInfo",Out_data,(err,result)=>{
					if(err){
						cb(new Error(err.message))
					}else{
						console.log("Changed " + JSON.stringify(result)); //check this via modified count
						cb(null,1)
					}
				})
			}
		})
	
	}
	//if active folder is is not active it is deleted
	viewFolder(username,userID,F_num,cb){
		var query = {username: username, USER_ID: Number(userID)}
		DB.getConnection((err,db) =>{
			if(err){
				cb( new Error("something went wrong"));
			}else{
				DB.FindDocument(db,"BucketInfo",query,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						if(typeof res == "undefined" ||  res == null){
							cb(new Error("Invalid Username or User ID"))
						}else{
							if(typeof res[F_num] == "undefined" ||  res[F_num] == null){
								cb(new Error("Folder Deleted"))
							}else{
								cb(null,res[F_num]);
							}
							
						}
					}
				})
			}
		})

	}
	//This is used to Filter if there is any inactive folder it will filter them 
	viewFolderFilter(data){
		var Items = data.items;
		var filtered_data = [];
		for (var i =0; i<Items.length ; i++){
			if(data.items[i].active == 1){
				filtered_data.push(data.items[i])
			}
		}
		return filtered_data;

	}
	//just setting them to inactive
	//folders to inactive
	// in here[deleteFolder] and viewFolder F_num denotes the folders hsould be view and delete
	// use checklastfoldernumber to get ALREADY DELETED and GETTING P_F_num
	DeleteFolder(username,userID,F_num,P_F_num,item_number,cb){
		var query = {username: username,USER_ID: Number(userID)}
		var key_1 = F_num + ".active";
		var key_2 = P_F_num + ".items." + item_number + ".active";
		var data = {
			[`${key_1}`]: 0,
			[`${key_2}`]:0,
		}
		DB.getConnection((err,db)=>{
			if(err){
				cb(new Error("something went wrong"))
			}else{
				DB.UpdateDocument(db,query,null,"BucketInfo",data,(err,res)=>{
					if(err){
						cb(new Error("something went wrong"))
					}else{
						if(typeof res == "undefined" || res == null){
							cb(new Error("Invalid Username or User ID"))
						}else{
							cb(null,res); // check with this result modified count
						}
					}
				})
			}
		})

	}
	

}
// module.exports = {NewFolder}
// [`${i_count}`]:{
			// 	F_name: F_name,
			// 	F_id:F_id,
			// }
var folder = new Folder();
// view Folder
// ---------------
// folder.viewFolder("Temp","27",0,(err,res)=>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("Before: ")
// 		console.log(res)
// 		var result = folder.viewFolderFilter(res)
// 		console.log("After: ")
// 		console.log(result)
// 	}
// })
//--------------------------
//  delete folder
// -------------------
// folder.checkLastFolderNum("sriram","2",1,(err,F_count,i_count,active,P_F_num,item_number)=>{
// 	if(err){
// 		console.log(err)
// 	}else{
// 		if(active == 0 ){
// 			console.log("Folder Already deleted");
// 		}else{
// 			folder.DeleteFolder("sriram","2",1,P_F_num,item_number,(err,res)=>{
// 				if(err){
// 					console.log(err.message)
// 				}else{
// 					console.log(res)
// 				}
// 			})
// 		}
// 	}
// })
//---------------------------------
folder.checkLastFolderNum("shriramshri",0,0,(err,F_count,i_count,active,P_F_num,res)=>{
	console.log()
	if(err){ 
		console.log(err);
	}else{
		// this F_count-1 should be used as actual F_num given by the user

		folder.NewFolder("shriramshri",0,0,"classroom",F_count,i_count,(err,F_id_array)=>{
			if(err){
				console.log(err.message);
			}else{ // new folder i data created up to this
	
				folder.updateIcount("shriramshri",0,1,i_count,(err,result_)=>{
					if(err){
						console.log(err)
					}else{
						folder.updateFcount("shriramshri",0,F_count,(err,result__)=>{
							if(err){
								console.log(err); 
							}else{
								folder.uploadFolderInfo("shriramshri",0,F_id_array,undefined,(err,res)=>{
									if(err){
										console.log(err.message)
									}else{
										console.log(res);
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
//getting folder info
// folder.getFolderInfo("sriram",2,"F-1",(err,res)=>{
// 	if(err){
// 		console.log(err.message)
// 	}else{
// 		console.log(res)
// 	}
// })

