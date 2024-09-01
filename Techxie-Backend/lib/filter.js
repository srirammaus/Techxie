//filter

const { isValidUsername } = require("./validater");
var result = {
    status:0,
    message:"something went wrong"
}
/**
 * Filter
 * check it was defind or not
 * string - username,password,cpassword,email,tokne,csrftoken,refresh_token,request,session_tokenor accesstoken,name,BucketName,driveName,foldername,filename,F_name,F_id,f_name,f_id
 * Number - userID,ph_number,F_count,F_num,P_F_num,item_number,active,i_count,f_num,grant_code,file_count
s
 */

let string_parameter = ["username","password","cpassword","email","token","csrf_token","refresh_token","session_token","sessionID","access_token","BucketName","F_name","F_id","f_name","f_id","filename","currentPass","newPass","B_name"];
let number_parameters = ["userID","USER_ID","ph_number","F_count","F_num","grant_code"];

//NOTE: requiredParams arrays of arrays which should contain args
// properties - req.body
function Filter(req,res,next,properties,requiredParams){ 
    /**
     * it should acts as middlwware not middlesare
     * check the req.{..} is defined
     * check the params are defined
     * check this params were avail in existing params list
     * check their types accordingly
     * if possible change the type
     * if key in either string params or number params or if type is diff then pass error
     */
    let body,query,params,cookies;

    function isDefinedNotEmpty(val) { //chek isObject later
            console.log(val)
            return val != undefined && Object.keys(val).length > 0;
    }
    function checkType (arg,type) {
        
    }
    function main(){
        return new Promise ((resolve,reject) =>{
            for (let prop of properties) { //prop -req.body,query,or cookiess  || prop.parameters
                if(isDefinedNotEmpty(req[prop])){
                    let newRequiredParams = Array.isArray(requiredParams[properties.indexOf(prop)]) ==true ?requiredParams[properties.indexOf(prop)]:requiredParams;
                    for(let key of newRequiredParams){
                        //check indexof
                        if(key in req[prop] ==false ) {
                            reject("Invalid Input")
                        }else {
                            let keyType = typeof key;
                            let changedKey ;
                           if( keyType == "string" || keyType == "number"){ //if this condtion satisfies let them in
                                if(number_parameters.includes(key)) { // if they are already number nowoories else change them to number and it to their own place , req.body...  && if Nan reject it 
                                    changedKey = Number(req[prop][key]);
                                    changedKey <= 0 || changedKey >= 0 ? req[prop][key] = changedKey : reject("something went went wrong") ;
                                }   
                           }else {
                                reject("Invalid values passed")
                           }
                        }
                    }            
                }else {
                    reject("Invalid Inputss")
                }
            }
            resolve(1);
         

     
        })

    }
    
    return main()
}

module.exports = {Filter}
/**
 * how to use filter
 * function testMiddleWare (req,res,next) {
   let properties = ["body"] // this place is very important
   let requiredParams = ["username","currentPass","newPass"]//this place is very important
   filter.Filter(req,res,next,properties,requiredParams).then((flag)=>{
      if(flag == 1) {
         res.send("Done and Dusted")   // no need else statement because there is already next event
      }else {
         next("something went wrong")
      }
   }).catch(err =>{
      console.log("reached here")
      next(err)
   })
  
   
}
 */
            // console.log(objTypes);
            // for (let objtype in objTypes) { // This type should need to expand later 
                
            //     if(objTypes[objtype] == "string") {
            //         console.log(string_parameter.includes(objtype))
            //         string_parameter.includes(objtype)== false ? reject("Invalid type"): null; 
            //     }else if(objTypes[objtype] == "number") {
            //         number_parameters.includes(objtype)  == false?reject("Invalid type"):null;
            //     }else {
            //         reject("something went wrong")
            //     }
            // }
            // resolve(1);

// function Filter (req,res,next) {
//     /**
//      * check for req.body
//      * check for req.params
//      * check for req.query
//      * check for cookies
//      * check for session
//      * if possible check for formData
//      */ 
//     let parameters = req.parameters;
//     if(parameters == undefined) next("something went wrong,parameters not defined") // parameters not defined

//     let body,query,params,cookies,formData;
//     let defindProperties = [];
//     function isDefinedandEmpty(val) { //chek isObject later
//         return val != undefined && Object.keys(val).length > 0;
//     }
//     function defineProp (){
//         isDefinedandEmpty(req?.body) ?defindProperties.push(req.body) :console.log("Im none");
//         isDefinedandEmpty(req?.query)  ?defindProperties.push(req.query) :console.log("Im none");
//         isDefinedandEmpty(req?.params) ?defindProperties.push(req.params) :console.log("Im none");
//         isDefinedandEmpty(req?.cookies) ?defindProperties.push(req.cookies) :console.log("Im none");
//     }
//     function main () {
//         defineProp(); 
//         for(let prop of defindProperties) { // prop - body,query,params,cookies
//             /**
//              * from this filter starts it work
//              * first check for it is defined
//             */
//            console.log(parameters)
//             for(let params of parameters){
//                 console.log(params)
//                 if(prop[params] == undefined || prop[params] == null) {
//                     next("Invalid Inputss")
//                 }else {
//                     next(); //continue to
//                 }
//             }


//         }
//         // res.send("Filter test done")
//     }
//     main();
// }