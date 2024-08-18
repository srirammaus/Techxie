//This will return the file from our storage server
const Files = require('../../lib/Files.js');
var result = {
    status:0,
    message:"something went wrong",
}
let username,F_id,f_id;
let userID;
let F_name;
let F_num; // for create folder - current forlder where eit is creating, for del foler the number is delete folder

function setParameters (req){
    username = req.body.username;
    userID=req.body.userID;
    F_name=req.body.F_name;
    F_num= req.body.F_num; // for create folder - current forlder where eit is creating, for del foler the number is delete folder
    F_num = Number(F_num)
    F_id = req.body.F_id;
    f_id =req.body.f_id;

}
var file = new Files.Files();
function getFilecountMiddleware(resolve,reject,req,res,next){
    //get file count
    file.getFilecount("sriram",2,(err,file_count)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log(file_count)
        }
    })
}
function viewFileMiddleware(resolve,reject,req,res,next) {

}
function delFileMiddleware(resolve,reject,req,res,next){

}
function editFileMiddleware(resolve,reject,req,res,next){ //like Rename

}
function insertFileMiddleware(resolve,reject,req,response,next) { //Later plan
    /**
     * This Middle Ware should be attached to  upload 
     * after upload done this continues
     */
        setParameters(req);
        filenames = [];
        for(let obj in req.files){
            filenames.push(req.files[obj].originalname || req.files[obj].filename)
        }
        console.log(filenames)
        file.getFolderInfo(username,userID,F_num,(err,i_count)=>{ //-- done
            if(err){
                reject(err.message);
            }else{
                file.newFile(username,userID,F_num,filenames,i_count,(err,i_count_1,f_id_array)=>{
                    if(err){
                        reject(err.message)
                    }else{
                        file.updateIcount(username,userID,F_num,i_count_1,(err,res)=>{
                            if(err){
                                reject(err.message)
                            }else{
                                file.getFilecount(username,userID,(err,file_count)=>{
                                    if(err){
                                        reject(err.message) //cbnew Error(
                                    }else{
                                        file.uploadFileInfo(username,userID,f_id_array,file_count,(err,res)=>{
                                            if(err){
                                                reject(err.message)
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
function getFileInfoMiddleWare (resolve,reject,req,res,next) {

}
function getFilecountMiddleware(resolve,reject,req,res,next) {

}
function MiddleWare(func){
    return (req,res,next) =>{
        return new Promise((resolve,reject)=>{
            try {
                switch (func) {
                    case 1:
                        return insertFileMiddleware(resolve,reject,req,res,next)
                    case 2:
                        return viewFileMiddleware(resolve,reject,req,res,next) //list out the files
                    case 3:
                        return delFileMiddleware(resolve,reject,req,res,next)
                    case 4: 
                        return editFileMiddleware(resolve,reject,req,res,next)
                    case 5:
                        return getFileInfoMiddleWare(resolve,reject,req,res,next) // get info from drive info
                    default:
                        reject("something went wrong")
                }
            }catch(err) {
                result.message = err + " custom  error";
                res.send(result)
            }
         }).catch(err=>{
            result.message = err;
            res.send(result)
         })
    }
  

}
module.exports = { MiddleWare}