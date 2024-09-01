//This will fetch data from db collection
var filter = require('../../lib/filter.js');
const Folder = require('../../lib/Folder.js')
var result = {
    status:0,
    message:"something went wrong",
}
let username,F_id ;
let userID;
let F_name;
let F_num; // for create folder - current forlder where eit is creating, for del foler the number is delete folder
let folder = new Folder.Folder();
function setParameters (req){
    username = req.body.username;
    userID=req.body.userID;
    F_name=req.body.F_name;
    F_num= req.body.F_num; // for create folder - current forlder where eit is creating, for del foler the number is delete folder
    F_num = Number(F_num)
    F_id = req.body.F_id;
}
function createFolderMiddleware(resolve,reject,req,res,next) {
    //filter and type should evaluated
    let properties = ["body"];
    let requiredParams= ["username","userID","F_num"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
        setParameters (req)
        folder.checkLastFolderNum(username,userID,F_num,(err,F_count,i_count,active,P_F_num,item_number)=>{ //item_number = res
          
            if(err){ 
                reject(err);
            }else{
                // this F_count-1 should be used as actual F_num given by the user
        
                folder.NewFolder(username,userID,F_num,F_name,F_count,i_count,(err,F_id_array)=>{
                    if(err){
                        reject(err.message);
                    }else{ // new folder i data created up to this
            
                        folder.updateIcount(username,userID,F_num,i_count,(err,result_)=>{
                            if(err){
                                reject(err)
                            }else{
                                folder.updateFcount(username,userID,F_count,(err,result__)=>{
                                    if(err){
                                        reject(err); 
                                    }else{
                                        folder.uploadFolderInfo(username,userID,F_name,F_id_array,undefined,(err,results)=>{
                                            if(err){
                                                reject(err.message)
                                            }else{
                                                result.status = 1;
                                                result.message = "folder created succesfully",
                                                result.info = results

                                                res.send(result)
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
    }else {
        next("something went wrong")
    }}).catch(err=>{
        next(err)
    })
    
  

}
//csrf needed
function delFolderMiddleware(resolve,reject,req,response,next){
    let properties = ["body"];
    let requiredParams= ["username","userID","F_num"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
        setParameters (req)
        folder.checkLastFolderNum(username,userID,F_num,(err,F_count,i_count,active,P_F_num,item_number)=>{
            if(err){
                reject(err)
            }else{
                if(active == 0 ){
                    reject("Folder Already deleted");
                }else{
                    folder.DeleteFolder(username,userID,F_num,P_F_num,item_number,(err,res)=>{
                        if(err){
                            reject(err.message)
                        }else{
                            result.status = 1;
                            result.message = "successfully deleted"
                            response.send(result)
                        }
                    })
                }
            }
        })
    }else { 
        next("something went wrong")
    }}).catch(err=>{
        next(err)
    })

}
function editFolderMiddleware(resolve,reject,req,res,next){ //like Rename

}
function viewFolderMiddleware(resolve,reject,req,response,next) { 
    /**
     * This is retirve all the active folders and files in requested folder
     */
    let properties = ["body"];
    let requiredParams= ["username","userID","F_num"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
        setParameters (req)
        folder.viewFolder(username,userID,F_num,(err,res)=>{
            if(err){
                reject(err.message);
            }else{
                console.log("Before: ")
                console.log(res)
                var filteredresult = folder.viewFolderFilter(res)
                console.log("After: ")
    
                result.message =Object.assign({},filteredresult); // check what if here would be a reference error how to caught eg: invalid veriable or splelling mistakei declared here filteredddresult 
                result.status = 1;
                response.send(result)
                
            }
        })
    }else { 
        next("something went wrong")
    }}).catch(err=>{
        next(err)
    })

}
function getFolderInfoMiddleWare (resolve,reject,req,response,next) {
    let properties = ["body"];
    let requiredParams= ["username","userID","F_id"];
    filter.Filter(req,res,next,properties,requiredParams).then(flag=>{if(flag == 1){
        setParameters(req)
        folder.getFolderInfo(username,userID,F_id,(err,res)=>{
            if(err){
                reject(err.message)
            }else{
                result.status = 1;
                result.message = res;
                response.send(result);
            }
        })
    }else {
        next("something went wrong")
    }}).catch(err=>{
        next(err)
    })

}
function MiddleWare(func){
    return (req,res,next) =>{
        return new Promise((resolve,reject)=>{
            try {
                switch (func) {
                    case 1:
                        return createFolderMiddleware(resolve,reject,req,res,next)
                    case 2:
                        return viewFolderMiddleware(resolve,reject,req,res,next) //list out the files
                    case 3:
                        return delFolderMiddleware(resolve,reject,req,res,next)
                    case 4: 
                        return editFolderMiddleware(resolve,reject,req,res,next)
                    case 5:
                        return getFolderInfoMiddleWare(resolve,reject,req,res,next) // get info from drive info
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

// createFolderMiddleware(0,0,0)

// try {
//     return new Promise((resolve,reject)=>{

//     }).catch(err=>{
//         result.message = err.message;
//         res.send(result)
//     })
// } catch (error) {
//     res.send(result)
// }
