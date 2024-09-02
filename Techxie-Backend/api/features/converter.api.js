//once convert button clicked //after uploaded
//try
//CA
var xsrf_verification_lib = require('../../lib/xsrf_verification').xsrf_verification;
var ExceptionHandler = require('../../lib/ExceptionHandlers.js')
var pdfconverter = require('../../lib/pdfconverter');
var OAuth = require('../../lib/OAuth').OAuth;
var filter = require('../../lib/filter.js');
var results = {
	status:0,
	message:"something went wrong"
}
//once validated

//do it with csrf csrf_token -- csrf = putting the token in hidden field and x-xsrf or x-csrf means using cookies
//while creating upload in frontend two things should be contain local browsing and our own drive images
async function convert(req,res,next){ // if non exist user request then pop up to signup
	
	let properties = ["body"];
    let requiredParams= ["username","userID","B_name"]
	try{
		filter.Filter(req,res,next,properties,requiredParams).then(async flag=>{if(flag == 1){
			var xsrf_verification = new xsrf_verification_lib();
			var userID = req.body.userID;
			var username = req.body.username;
			var B_name = req.body.B_name
		
			if(userID == null || B_name == null ||  username == null ){
				next(new ExceptionHandler.BadRequest ("Invalid Inputs"))
			}else{
				
								try{
									var source = pdfconverter.getSources_(B_name);
									var convert = await pdfconverter.converter(source,B_name,(err,result)=>{
										if(err){
											next(err)
										}else{
											if(result  != null || result != undefined){
												results.status = 1;
												results.message = result;
												res.send(results)
											}else {
												next(new ExceptionHandler.InternalServerError ("something went wrong"))
											}
							
										}
									})
		
								}catch(err){
									next(new ExceptionHandler.InternalServerError(err))
								}
						
			}
		}else {next(new ExceptionHandler.InternalServerError("something went wrong"))}}).catch(err=>{
			next(err)
		})
	}catch(err) {
		next(err)
	}
    


}

module.exports = {convert}