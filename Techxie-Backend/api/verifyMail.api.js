let Email = require('./../lib/email.js');
let filter = require('./../lib/filter.js');
//N
function verifyMailMiddleWare(req,res,next) { // use it for change mail
    //check auth at starting  ,csrf --doubt
    let email,username,userID;
    let result = {};
    let em = new Email.email();
    let properties = ["body"]
    let requiredParams = ["username","userID","email"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{
        if(flag == 1){
            try {
                
                username = req.body.username;
                userID = Number(req.body.userID);
                email = req.body.email;
                // username,email,userID   //"sriram","sriram@gmail.com",14
                em.setUser(username,email,userID ).setToken();
                return new Promise((resolve,reject)=>{
                    em.verifyEmail(null,null,null,(err,flag) =>{
                        if(err){
                            reject(err);
                        }else{
                            console.log(em.getToken())
                            em.setTokentoDB((err,flag)=>{
                                if(err){
                                    reject(err);
                                }else{
                                    if(flag == 1){
                                        em.sendToken((err)=>{
                                            if(err){
                                                reject(err)
                                            }else{
                                                res.send({status:1,message:"email sent"})
                                            }
                                        });
                                        
                                    } 
                                    else{
                                        reject("something went wrong")
                
                                    }
                                }
                            })
                        }
                    })
                }).catch((err) =>{
                    result.status = 0;
                    result.message= err?.message || err
                    res.send(result)
                })
    
    
        }
        catch(err) {
            res.send({Error:err.message,flag:-1})
            // console.log(err.message)
        }
        }else {
            next("something went wrong")
        }
    }).catch(err=>{
        next(err)
    })
       
}

// verifyMailMiddleWare()
module.exports = {verifyMailMiddleWare}

