var DB = require('./../config/M_Database.js');
arr = [];

function main(){
	var query = {}
	DB.getConnection((err,db)=>{
		if(err){ console.log(err.message)}
		else{
			DB.UpdateDocument(db,"USERS",query,(err,res)=>{
				if(err){ console.log(err.message)}
				else{
					console.log("Enough")
				}
			})
		}
	})
}
// for (var i=0;i<502;i++){
// 	arr.push(i.toString());
// }


// function main1(){
// 	console.log(Date.now())
// 	DB.getConnection((err,db) =>{
// 	    var query = {dump: "467"}
// 		if(err){ console.log(err.message)}
// 		else{
// 			DB.FindDocument(db,"USERS",query,(err,res)=>{
// 				if(err){ console.log(err)}
// 				else{
// 					console.log(res)
// 				}
// 			})
// 		}
// 	})
// 	console.log(Date.now())
// }
// function main2(){
// 	console.log(Date.now())
// 	var ck = arr.indexOf("467");
// 	console.log(ck)
// 	console.log(Date.now())
// }
// main2()
// function main(limit){
// 	if(limit != 3){
// 		console.log(limit);
// 		main(limit + 1)
// 	}
// 	console.log(limit);
// }

// main(0);
// -------------
// creating a big data
// DB.getConnection((err,db) =>{

//     for(var i=0; i<500;i++){
//     	count = i;
//     	var query = {dump: i.toString()}
//     	if(err){ console.log(err.message)}
// 		else{
// 			DB.InsertDocument(db,"USERS",query,(err,res)=>{
// 				if(err){ console.log(err.message)}
// 			})
// 		}
//     }
// })	