const upload__ = require('../../lib/upload.js').upload;
//try
//CA
//middle ware function for uploading files
const multer__ = require('multer');
var formidable =  require('formidable');
var ExceptionHandler = require('../../lib/ExceptionHandlers.js');
function upload_(req,res,next){
    //usernames and other stuffs should be in url encoded form data then only we can read them before entering it into multer upload function
	var username,token;
	try{
		var upload = new upload__(null,null);
		var setMulter = upload.setMulter();
		var getMulter = upload.getMulter();
		var Multer = getMulter.array('uploads',10);
		Multer(req,res,(err)=>{
				if(upload.getFileFlag() == 1){
					if(err instanceof upload.getRMulter().MulterError){ 
						next(err)
					}else if(err){
						next(err)
					}else{
						// console.log( req?.body?.username + "user")
						// res.send("Uploaded Successfully"); 
						next()
					}
				}else{
					next( new ExceptionHandler.InternalServerError("No Files has been uploaded"))
				}	
		});
		

	}
	catch(err){
		next(err); 
	}
}

function getFileInfo(req,cb){
	var form = formidable({multiples: true});
	form.parse(req,(err,fields,files)=>{
		if(err){
			next(new ExceptionHandler.InternalServerError("something went wrong ,try again later"));
		}else {
			// console.log(files.uploads.length)
			if(files != null || typeof files != "undefined"){
				cb(null,true);
			}else{
				cb(new ExceptionHandler.BadRequest("No files to upload"))
			}
		}
	})
}
module.exports = {upload: upload_}



