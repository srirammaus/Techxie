let Email = require('./../lib/email.js');
// N
function confirmMailMiddleWare(req,res,next){
    let email,username,userID;
    let result = { //default
        status:0,
        message:"something went wrong"
    }
    username = req.query.username;
    userID = Number(req.query.userID);
    email = req.query.email;
    token = req.params.token;

    let em = new Email.email()

    try{
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
            result.status = 0;
            result.message= err.message
            res.send(result)
    })
}catch(err) {   
        result.status = 0;
        result.message= err.message
        res.send(result)
    }


}
module.exports = {confirmMailMiddleWare}

//        validater.isValidEmail(this.username,this.email,this.userID,null,(err,res)=> {
    // return process.env.baseURL+`User/api/verifyMail/${this.getToken()}?username=${this.username}&userID=${this.userID}&email=${this.email}`
    //