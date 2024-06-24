//test kit for db 
//Test codes
// in update query $set vs $push found finally.
// if set used then i.e if [Main][0]object inside [items]object conatins a [0]object , if we use $set the [0 object will changed to 1 ]  
// if we use push it will push
//for pushing or adding something then the var should be in array
var DB = require('./../config/M_Database');
function main(){
	var query = {username: "Temp"}
	var subdata = {"0.F_name":'shriram'}
	//var data = { "0.items":{0:{dump:"dump"}}}   // for set
	// var string_ = "items";
	var set_string_ = "0" + ".items." + [`${string_}`];// good idea
	console.log(set_string_)
	var data = {[`${set_string_}`]:{dump:"dump"}} 
	DB.getConnection((err,db)=>{
		if(err){
			console.log( err)
		}else{
			DB.UpdateDocument_(db,query,null,"BucketInfo",data,(err,res)=>{
				if(err){
					console.log( err)
				}else{
					console.log(res)
				}
			})
		}
	})
}
	
