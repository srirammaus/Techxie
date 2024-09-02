
var OAuth = require('./../lib/OAuth.js').OAuth;
var filter = require('./../lib/filter.js');
var ExceptionHandler =  require('./../lib/ExceptionHandlers.js')
//toolbtn,converter api, [drive.upload and pdf.upload. -  has multer so need inner auth]
var result = {
    status:0,
    message:"soemthing went wrong"
}
function AuthMiddleWare (req,res,next) {
     let properties = ["body"];
    let requiredParams= ["username","userID","session_token","sessionID"]
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
        let sessionID = req.body.sessionID;
        let session_token = req.body.session_token || req.body.access_token;
        let username = req.body.username;
        let userID = req.body.userID;
    
        if(userID == null || username == null || session_token == null || sessionID == null){
            next(new ExceptionHandler.BadRequest("Invalid inputs",200))
        }else{
            return new Promise((resolve,reject) =>{
                new OAuth().Authenticate(username,session_token,sessionID,(err,flag)=>{
                    if(err){       
                        reject(err)
                    }else if(flag ==1 ){
                        next()
                    }
                    else{
                        reject(result)
                    }
                })
            }).catch(err=>{
                next(err)
            })
        }
    }else {
        next(new ExceptionHandler.InternalServerError("something went wrong"))}
    }).catch(err=>{
        next(err)
    })
    
    


}

module.exports = {AuthMiddleWare};