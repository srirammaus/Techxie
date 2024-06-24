//testing pdf.upload or Dump pdfupload
var multer = require('multer');
class pdfupload{
	constructor(){

	}
	init(){
		var multer_ = multer.diskStorage({
			destination:(req,file,cb)=>{
				cb(null,__dirname + "/uploads")
			},
			filename: (req,file,cb)=>{
				cb(null,true)
			}
		})
		return multer_;
	}
	setMulter(){
		var mul = multer({
			storage: this.init(),
			fileFilter: (req,file,cb)=>{
                            
                                console.log(req.body)
                                var u_id = req.body.userID;
                                var xsrf_token = req.body.xsrf_token;
                                if(u_id == null || xsrf_token == null){
                                    cb(new Error("undefined values")) // temp
                                }else{// return the bucket name here
                                    cb(null,true);       
                                }
                                //if here false mean select a file to upload

                            }
		})
		return mul;
	}
	getMulter(){
		return multer;
	}
}
module.exports = {pdf_upload}