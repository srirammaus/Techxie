var multer = require('multer');
var formidable = require('formidable');
var upload = multer({dest: __dirname + '/'})
var bodyparser = require('body-parser')
function middleware(req,res,next){
	var form = formidable({multiples: true});
	form.parse(req,(err,fields,files)=>{
		if(err){
			res.send("Error")
		}else{
			upload.single('images');
			console.log(req.file)
			console.log(files)
			console.log(fields)
			res.send("Done")
		}
	})
	
	// res.send("Done")
	next();
}
module.exports = {multer: middleware}