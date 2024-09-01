var changePwd = require('../../lib/changePwd.js');
var filter= require('../../lib/filter.js');
/**
 * For changing password and email,phonenumber, csrf and Oauth are compulsory
 * the change pwd lib was writtern with rreturn promise
 * 
 */
var result  = {
    status:0,
    message:"something went wrong"
}
async function changePwdMiddleWare (req,res,next) {   
    let username,userID,currentPass,newPass,email,ph_number;
    //check for undefined 
    //use fileter

    let properties = ["body"]
    let requiredParams = ["username","currentPass","newPass"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag =>{
        username =req.body.username;
        currentPass =req.body.currentPass;
        newPass = req.body.newPass;
    
        let changePwd_ = new changePwd.changePwd();
        try {
            //test for throw
            changePwd_.changePwdThroughOld(username,currentPass,newPass).then((flag)=>{
                if(flag == 1) {
                    result.status = 1;
                    result.message = "password updated succesfully"
                    res.send(result);
                }
                
            }).catch(err=>{
                result.message = err?.message || err || "something went wrong";
                res.send(result)
            })
           
            
        }catch(err) {
            console.log(err?.message || err);
            next(err?.message || err)
        }
    }).catch(err=>{
        console.log("I am culprit")
        next(err?.message || err)
    })

}

module.exports = {changePwdMiddleWare}