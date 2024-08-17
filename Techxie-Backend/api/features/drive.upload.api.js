const upload__ = require('../../lib/upload.js').upload;
//try
//CA
//middle ware function for uploading files
const multer__ = require('multer');
var formidable =  require('formidable');
function upload_(req,res,next){
    //usernames and other stuffs should be in url encoded form data then only we can read them before entering it into multer upload function
	var username,token;
	try{
		var upload = new upload__(null,null);
		var setMulter = upload.setMulter();
		var getMulter = upload.getMulter();
		var Multer = getMulter.array('uploads',10);
		Multer(req,res,(errr)=>{
				if(upload.getFileFlag() == 1){
					if(errr instanceof upload.getRMulter().MulterError){ 
						res.send({Error:errr.message})
					}else if(errr){
						res.send({Error: errr.message})
					}
					else{
						res.send("Uploaded Successfully"); 
					}
				}else{
					res.send("No Files has been uploaded")
				}	
		});
		

	}
	catch(err){
		res.send(err.message); ///for temp err , future you should classify
	}
}
function temp(req,res,next){
	res.send("Yeah got it ");

}
function getFileInfo(req,cb){
	var form = formidable({multiples: true});
	form.parse(req,(err,fields,files)=>{
		if(err){
			res.send("something went wrong ,try again later");
		}else {
			// console.log(files.uploads.length)
			if(files != null || typeof files != "undefined"){
				cb(null,true);
			}else{
				cb(new Error("No files to upload"))
			}
		}
	})
}
module.exports = {upload: upload_}



