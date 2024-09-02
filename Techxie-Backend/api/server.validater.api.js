//validater server instant middleware API
//if signup 0 then userID should be visible
//userverification
var VL = require("./../lib/server.validater.js").validater;
var filter = require('./../lib/filter.js');
var ExceptionHandler= require('./../lib/ExceptionHandlers.js';)
function ValidateServerMiddleware(req,res,next){
	let properties = ["body"];
    let requiredParams= ["username"]
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
		var username = req.body.username; // easy bug if username key not exists
		if( username != undefined || username != null) {
			try{
				var validater  = new VL(username);
				var resp = validater.Response(0,[],(err,result)=>{ //recurse shuld be zero
					if(err){ next(err)}
					else{
						// throw new ReferenceError("This is reference error")
						res.send(JSON.stringify(result))
					}
				})
			}
			catch(err){
				next(err);
			}
		}
		else{
			next(new ExceptionHandler.BadRequest("undefined Key"))
		}
	}else {
		next(new ExceptionHandler.InternalServerError("something went wrong"))
	}}).catch(err=>{
		next(err)
	})


}
function JSONIFY(keys,values){ //both should be array and same count
	var result = {};
	for(var i=0;i<keys.length;i++){
		result[keys[i]] = values[i];
	}
	return JSON.stringify(result);
}

module.exports = {validater:ValidateServerMiddleware}