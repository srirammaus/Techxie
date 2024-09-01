//Mongo Db Database -- mongo db database works on DCD - 1.database 2.collection .document .[i.e:our current prj data is db,user datails is collection, document what we are saving]
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

function drop_Database(db,cb){ //use cb
	//To drop database using nodejs
	db.dropDatabase(function(err , res){
		if(err) cb(new Error(err));
		console.log("Database Deleted"); //soon add it logs
		closeConnection(db);
	})
	
}
function drop_Collection(db,collection_name,cb){ //use cb
	//droping collection
	db.dropCollection(collection_name.toString(),(err,resOK)=>{
							if(err) cb(new Error(err));
							if(resOK) console.log("Collection or Table Deleted"); //soon add it in session log
							// db.close();
						})
}
function closeConnection(db){ //use cb
	//To close connection
	return db.close();
}
function InsertDocuments(db,collection_name,arr,cb){
	//To insert many docs
	db.collection(collection_name).insertMany(arr,function(err,res){ //for insertmany the obj should be in array
		if(err){
			cb(new Error("something went wrong"));
		}else{
			cb(null,res);
		}
		return;
	})
}
function InsertDocument(db,collection_name,arr,cb){
	//To insert single docs
	db.collection(collection_name).insertOne(arr,function(err,res){
		if(err){
			cb(new Error("Can't insert documents something went wrong")); //take err as log with username
		}else{
			cb(null,res);
		}
		return;
	})
}
//$set
function UpdateDocument(db,query,token,collection_name,arr,cb){ //It is compulsory to have username +token or any ID's to update something
	var append = {$set : arr} //$set will only overwrite // $push
	db.collection(collection_name).updateOne(query,append,function(err,res){
		if(err){cb(new Error(err.message)); //take error as logs
		}else{
			cb(null,res);
		}
	})
}
//push
//For push , the field name in or key name in db mst be type of array 
function UpdateDocument_(db,query,token,collection_name,arr,cb){ //It is compulsory to have username +token or any ID's to update something
	var append = {$push : arr} //$set will only overwrite // $push
	db.collection(collection_name).updateOne(query,append,function(err,res){
		if(err){cb(new Error(err.message)); //take error as logs
		}else{
			cb(null,res);
		}
	})
}
function FindDocument(db,collection_name,arr,cb){
	db.collection(collection_name).findOne(arr,function(err,res){
		if(err){
			cb(new Error("Can't find documents something went wrong")); //take errors as log
		}else{
			cb(null,res);
		}
		return;
	})
}
function FindDocuments(db,collection_name,arr,cb){
	db.collection(collection_name).find(arr).toArray(function(err,res){ //find({arr})
		if(err){
			cb(new Error(err.message)); // take error as logs
		}else{
			cb(null,res);
		}
		return;
	})
}
function FindSomeDocument(db,collection_name,query_1,query_2,cb){
	db.collection(collection_name).find({},{FOLDERS:1}).toArray(function(err,res){
		if(err){
			cb(new Error(err))
		}else{
			cb(null,res);
		}
	})
}
//with operators
function FindSomeDocumentWithOperators(db,collection_name,query_1,query_2,cb){
	db.collection(collection_name).find(query_1,query_2).toArray(function(err,res){
		if(err){
			cb(new Error(err))
		}else{
			cb(null,res);
		}
	})
}
module.exports = {getConnection ,FindSomeDocument, UpdateDocument,UpdateDocument_ ,drop_Database ,drop_Collection ,InsertDocument ,InsertDocuments ,closeConnection ,FindDocument,FindDocuments,FindSomeDocumentWithOperators}







