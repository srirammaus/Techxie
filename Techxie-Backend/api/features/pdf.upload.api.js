//midlleware
//xsrf verification
//try
//CA
var pdf_upload_lib = require('../../lib/pdf.upload.js').pdf_upload;

function pdf_upload(req,res,next) {
	console.log("Im the first")
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
				res.send({Error: err.message})
			}else if (err) {
				res.send({Error: err.message})
			}
			else{
				if(checkIfExists(req.files)){
					if(err){ res.send({Error: err})}
					else{
						var B_name = multer.getBucketName();
						res.send({status: 1, result: "upload success",B_name: B_name})
					}
				}else{
					res.send({status:0, Error:"select a file to upload"});
				}
			}
				
			})
	}
	catch(err){
		res.send({Error: err.message})
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