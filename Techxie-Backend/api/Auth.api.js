
var OAuth = require('./../lib/OAuth.js').OAuth;
var filter = require('./../lib/filter.js');
var ExceptionHandler =  require('./../lib/ExceptionHandlers.js')
//toolbtn,converter api, [drive.upload and pdf.upload. -  has multer so need inner auth]
var result = {
    status:0,
    message:"soemthing went wrong"
}
function AuthMiddleWare (req,res,next) {
     let properties = ["cookies"];
    let requiredParams= ["username","userID","session_token","sessionID"]
    console.log(req.cookies.username +   "something..")
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
        let sessionID = req.cookies.sessionID;
        let session_token = req.cookies.session_token || req.cookies.access_token;
        let username = req.cookies.username;
        let userID = req.cookies.userID;
    
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