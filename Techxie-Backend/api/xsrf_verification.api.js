/**
 * This is a middleware which should check for csrf validation**/
var xsrf_verification_lib = require('../lib/xsrf_verification.js').xsrf_verification;
var filter = require('../lib/filter.js');
var ExecptionHandler = require('../lib/ExceptionHandlers.js');
var results = {
    status:0,
    message:"something went wrong"
}
function xsrf_verificationMiddleware(req,res,next) {

    try {
        let xsrf_verification =  new xsrf_verification_lib()
        let properties = ["body"];
        let requiredParams= ["xsrf_token","userID"]
        filter.Filter(req,res,next,properties,requiredParams).then(flag =>{
            let userID = req.body.userID;
            let xsrf_token = req.body.xsrf_token || req.body.csrf_token;
            if(flag == 1) {
                var f_values = xsrf_verification.filter([userID,xsrf_token]);
                xsrf_verification.setter([f_values[0],f_values[1]]);
                xsrf_verification.verify((err,flag,result__)=>{
                    if(err){
                        next(err)
                    }else if(flag == 0){
                        next(new ExecptionHandler.UnAuthorized("csrf token expired , login again to get new"))
                    }else{
                        //success
                        next();
                    }
                })
            }else {
                next(new ExecptionHandler.InternalServerError("something went wrong"))
            }
        }).catch(err => {
            next(err)
        })
    }catch(err) {   
        next(err)
    }

}

module.exports = {xsrf_verificationMiddleware: xsrf_verificationMiddleware}