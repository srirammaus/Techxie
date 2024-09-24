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
    let requiredParams = ["currentPass","newPass"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag =>{
        username =req.cookies.username; //old :body
        currentPass =req.body.currentPass;
        newPass = req.body.newPass;
    
        let changePwd_ = new changePwd.changePwd();
        try {
            //test for throw
            changePwd_.changePwdThroughOld(username,currentPass,newPass).then((flag)=>{
                if(flag == 1) {
                    console.log("Done")
                    result.status = 1;
                    result.message = "password updated succesfully";
                    res.send(result);
                }
                
            }).catch(err=>{
                next(err)
            })
           
            
        }catch(err) {
           
            next( err)
        }
    }).catch(err=>{
      
        next( err)
    })

}

module.exports = {changePwdMiddleWare}