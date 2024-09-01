
var OAuth = require('./../lib/OAuth.js').OAuth;
var filter = require('./../lib/filter.js');

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
            results = {Error: "Invalid Inputs"};
            res.send(results);
        }else{
            return new Promise((resolve,reject) =>{
                new OAuth().Authenticate(username,session_token,sessionID,(err,flag)=>{
                    if(err){
                        result.message = err.message.toString();
                        reject(result)
                    }else if(flag ==1 ){
                        next()
                    }
                    else{
                        reject(result)
                    }
                })
            }).catch(err=>{
                res.send(err)
            })
        }
    }else {
        next("something went wrong")}
    }).catch(err=>{
        next(err)
    })
    
    


}

module.exports = {AuthMiddleWare};