let Email = require('./../lib/email.js');
let filter = require("./../lib/filter.js");
var ExceptionHandler = require('./../lib/ExceptionHandlers.js')
// N
function confirmMailMiddleWare(req,res,next){
    let email,username,userID;
    let result = { //default
        status:0,
        message:"something went wrong"
    }


    let properties = ["query","params"]
    let requiredParams = [["username","USER_ID","email"],["token"]];
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{
        username = req.query.username;
        userID = req.query.USER_ID;
        email = req.query.email;
        token = req.params.token;
        if(flag == 1) {
            try{
                let em = new Email.email()
                new Promise((resolve,reject) => {
                    em.verifyEmail(username,email,userID,(err,flag)=>{
                        if(err) reject(err)
                        else{
                            if(flag == 1){
                                em.verifyToken(username,userID,email,token,(err,flag)=>{
                                    if(err) reject(err);
                                        else{
                                            result.status = 1;
                                            result.message = "email verified sucessfully";
                                            res.send(result)
                                        }
                                    })
                            }else{
                                reject(result)
                            }
                        }
                    })
                }).catch((err) =>{
                    next(err)
            })
        }catch(err) {
            next(err)
        }
        }else {
            next(new ExceptionHandler.InternalServerError("something went wrong"))
        }
    }).catch(err =>{
        next(err )
    })
   


}
module.exports = {confirmMailMiddleWare}

//        validater.isValidEmail(this.username,this.email,this.userID,null,(err,res)=> {
    // return process.env.baseURL+`User/api/verifyMail/${this.getToken()}?username=${this.username}&userID=${this.userID}&email=${this.email}`
    //