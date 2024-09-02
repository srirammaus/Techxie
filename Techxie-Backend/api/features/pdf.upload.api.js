//midlleware
//xsrf verification
//try
//CA
var pdf_upload_lib = require('../../lib/pdf.upload.js').pdf_upload;
var ExcecptionHandler = require('../../lib/ExceptionHandlers.js')
function pdf_upload(req,res,next) {
	var multer = new pdf_upload_lib();
	//filter
	//creating bucket
	//multer
	var bucket_data_name = Date.now(); //this going to be the userid's co word
	//return this bucket name to them in RESULT
	try{

		var mul = multer.setMulter(bucket_data_name); //i think still it is just initialized , 
		multer_ = mul.array('img',10);
		multer_(req,res,(err)=>{
			
			if(err instanceof multer.getRMulter().MulterError){
				next(err)
			}else if (err) {
				next(new ExcecptionHandler.InternalServerError( err))
			}
			else{
				if(checkIfExists(req.files)){
					if(err){next(new ExcecptionHandler.InternalServerError( err))}
					else{
						var B_name = multer.getBucketName();
						res.send({status: 1, result: "upload success",B_name: B_name})
					}
				}else{
					//client error 
					next(new ExcecptionHandler.BadRequest("select a file to upload"))
				}
			}
				
			})
	}
	catch(err){
		next(err)
	}
	next();


} 
function checkIfExists(files){
	var len = Object.keys(files).length;
	if(len > 0 ){
		return true;
	}
	return false;
}
module.exports = {pdf_upload}