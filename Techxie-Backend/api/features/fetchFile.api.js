//This will return the file from our storage server
const Files = require('../../lib/Files.js');
const fs =  require('fs');
var filter = require('../../lib/filter.js');
const dotenv = require('dotenv');
const { createTestAccount } = require('nodemailer');
dotenv.config({path:'../../config/.env'})
var ExecptionHandler = require('../../lib/ExceptionHandlers.js');

var result = {
    status:0,
    message:"something went wrong",
}
let username,F_id,f_id;
let userID;
let F_name;
let F_num; // for create folder - current forlder where eit is creating, for del foler the number is delete folder
// add auth
function setParameters (req){
    username = req.body.username || req.cookies.username;
    userID=req.body.userID || req.cookies.userID;
    F_name=req.body.F_name;
    F_num= req.body.F_num; // for create folder - current forlder where eit is creating, for del foler the number is delete folder
    console.log(F_num + "is it Nan")
    F_num = Number(F_num)
    console.log(F_num + "is it Nann")
    F_id = req.body.F_id;
    f_id =req.body.f_id;

}
var file = new Files.Files();

function getFilecountMiddleware(resolve,reject,req,res,next){
    /**
     * get file
     */
    let properties = ["body"];
    let requiredParams= ["username"]
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
        file.getFilecount("sriram",2,(err,file_count)=>{
            if(err){
                console.log(err)
            }else{
                console.log(file_count)
            }
        })
    }else {
        next(new ExecptionHandler.InternalServerError("something went wrong"))
    }}).catch(err=>{
        next(err)
    })

}

function getFileInfoMiddleWare(resolve,reject,req,response,next) {
        /**
         * first check it is a valid file,via db and get File info
        * second send the respected file data and  make a front end req which directs to file 
        */
    let properties = ["body"];
    let requiredParams= ["username","userID","f_id"];
    filter.Filter(req,response,next,properties,requiredParams).then(flag=>{

        if(flag == 1){
            setParameters(req);
            file.getFileInfo(username,userID,f_id,function(err,res){
                // process.env.baseURL
                let URL = process.env.baseURL + `User/file/viewFile/${userID}/`
                if(err){
                    reject (err) 
                }  else{
                    let f_name = res[0]?.f_name 
                    if(f_name  == undefined || f_name == null){
                        reject(new ExecptionHandler.BadRequest("Invalid request",200))
                    }else{
                        //Bugs
                        let URI = URL + `${f_name}`
                        result.status = 1;
                        result.message = {
                            f_name: f_name,
                            userID:userID,
                            URI: URI,
                        }
                        console.log(result);
                        response.send(result) //response
                    }
                }
        })
    }else {
        console.log("here it went")
        next(new ExecptionHandler.InternalServerError("something went wrong"))
    }}).catch(err=>{
        //Here the error not displaying in front page
        console.log(err)
        next(err)
    })

  
    
        
}
function viewFileMiddleware(resolve,reject,req,response,next) {
/**
 * Compulsory authentication need
 * get the f_name as the parameter and send the respected file
 */
let properties = ["params"];
let requiredParams= ["userID","f_name"]
filter.Filter(req,response,next,properties,requiredParams).then(flag=>{
    if(flag == 1){
        setParameters(req);
        let userID,f_name;
        userID =req.params.userID;
        f_name = req.params.f_name;
        fs.access(`F:/nodejs/projects/Techxie/Techxie-Backend/lib/WebDrive/${userID}/${f_name}`,(err)=>{
            if(err){
                console.log(err)
                response.send(result)
            }
            response.sendFile(`F:/nodejs/projects/Techxie/Techxie-Backend/lib/WebDrive/${userID}/${f_name}`)
    })

}else {
    next(err)}
}).catch(err=>{
    console.log("here the error")
    next(err)
})



}
function delFileMiddleware(resolve,reject,req,response,next){
    /**
     * check it is a valid file 
     * make it for inactive request
     */
    let properties = ["body"]
    let requiredParams= ["userID","username","f_id"]
    filter.Filter(req,response,next,properties,requiredParams).then(flag=>{
        if(flag == 1){
            setParameters(req);
            let username = req.body.username;
            let userID = req.body.userID;
            let f_id = req.body.f_id
            let splited = f_id.split("-");
            let P_F_num = splited[1]
            let item_number = splited[2]
            file.deleteFile(username,userID,item_number,P_F_num,(err,res)=>{
                if(err) {
                    reject(err)
                }else{
                    result.status = 1;
                    result.message = "successfully deleted"
                    response.send(result)
                }
            })
        }else {
            next(err)
        }

    })
}
function editFileMiddleware(resolve,reject,req,res,next){ 
    /**
     * edit files includes : Rename, texts [for text files like txt][in future bring the text editor inside the drive]
     */

}
function createFile(resolve,reject,req,response,next){
    /**
     * create the new file via app, not like applying
     * 
     */
    
}
function uploadFileMiddleware(resolve,reject,req,response,next) { 
    /**
     * This Middle Ware should be attached to  upload 
     * after upload done this continues
     * here the filter should be before the multer , so put it in multer area
     */
    // let properties = ["body","files"];
    // let requiredParams= [["username"]]
    // filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){}else {next("something went wrong")}}).catch(err=>{next(err)})

        setParameters(req);
        let filenames = [];
        let f_names = [];
        let fileTypes = [];
        let thumbanailsDir = []; // for now this is empty , chane it later
        console.log(req.body.fileExt + "This")
        for(let obj in req.files){
            filenames.push(req.files[obj].originalname || req.files[obj].filename)
        }
        // console.log(req.body?.f_names)
        for(let f_name of req.body?.f_names){
            f_names.push(f_name)
        }
        fileTypes = file.classifiedFileType(req?.body?.fileExt);
        console.log(username  + "This is that")
        console.log(F_num + "IS the fum valid")
        file.getFolderInfo(username,userID,F_num,(err,i_count)=>{ //-- done
            if(err){
                reject(err);
            }else{
                
                file.newFile(username,userID,F_num,filenames,fileTypes,thumbanailsDir,i_count,(err,i_count_1,f_id_array)=>{
                    if(err){
                        reject(err)
                    }else{
                        file.updateIcount(username,userID,F_num,i_count_1,(err,res)=>{
                            if(err){
                                reject(err)
                            }else{
                                file.getFilecount(username,userID,(err,file_count)=>{
                                    if(err){
                                        reject(err) //cbnew Error(
                                    }else{
                                        file.uploadFileInfo(username,userID,filenames,f_names,f_id_array,file_count,(err,res)=>{
                                            if(err){
                                                reject(err)
                                            }else{
                                                result.status = 1;
                                                result.message = "uploaded sucessfully"
                                                response.send(result)
                                            }
                                        })
                                    }
                                })
                            
                            }
                        })
                    }
                })
            }
        })
}

function getFilecountMiddleware(resolve,reject,req,res,next) {

}

function test(resolve,reject,req,response,next) { 
    /**
	 * below codes are used to test error handling techniques
	 */
    // setParameters(req);
    //     file.testcb1(username,userID,f_id,function(err,res){
  
    //             let URL = process.env.baseURL + `User/file/viewFile/${userID}/`
    //             if(err){
    //                 reject (err) 
    //             }  else{
    //                 result.status = 1;
    //                 result.message = "great work";
    //                 resolve(result) 
    //             }
    //     })
    throw new Error("Invalid Request")
        
        


}

/**
 * In this middlware , the return like syntax provide either resolve or rejcet
 */
function MiddleWare(func){

        return (req,res,next) =>{

            return new Promise(async (resolve,reject)=>{
                try {
                    switch (func) {
                        case 1:
                            return uploadFileMiddleware(resolve,reject,req,res,next)
                        case 2:
                            return getFileInfoMiddleWare(resolve,reject,req,res,next) //list out the files
                        case 3:
                            return viewFileMiddleware(resolve,reject,req,res,next)
                        case 4: 
                            return editFileMiddleware(resolve,reject,req,res,next)
                        case 5:
                            return delFileMiddleware(resolve,reject,req,res,next) // get info from drive info
                        case 6:
                            await test(resolve,reject,req,res,next)//literally act like await
                            // res.send(ans)
                            break;
                        default:
                            reject(new ExecptionHandler.InternalServerError("something went wrong"))
                    }
                }catch(err) {
                   next(err)
                }
             }).catch(err=>{
    
                next(err)
             }).then(data =>{
                res.send(data)
             })
        }
    
    
  

}

module.exports = { MiddleWare,test}