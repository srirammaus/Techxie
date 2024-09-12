var Folder = require('../../../lib/Folder.js');
var ExceptionHandler =require('../../../lib/ExceptionHandlers.js');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * This middleware fetch data from the library and if fails it throws to error page 
 */
function homeMiddleware(req,res,next)  {
    // let properties = ["cookies"];
    // let requiredParams= ["username","userID","F_num"];
    // filter.Filter(req,response,next,properties,requiredParams).then(flag=>{if(flag == 1){
    //     setParameters (req)
    let username = "admin3";
    let userID =7963 ;
    let F_num = 0;
    return new Promise((resolve,reject)=>{

        try {

            let folder =  new Folder.Folder();
            folder.viewFolder(username,userID,F_num,(err,res)=>{
                if(err){
                    reject(err);
                }else{
                    if(res == undefined || res.length == 0 ) {
                        next(new ExceptionHandler.BadRequest("Emtpy data"))
                    }else {
                        const {Folders,Files} = setHomeData(res,next)
                        req.body.Folders = Folders;
                        req.body.Files = Files;
                        next();
                    }
                    // var filteredresult = folder.viewFolderFilter(res)
                    // console.log("After: ")
        
                    // result.message =Object.assign({},filteredresult); // check what if here would be a reference error how to caught eg: invalid veriable or splelling mistakei declared here filteredddresult 
                    // result.status = 1;
                    // response.send(result)
                    
                    
                }
            })
            

        }catch(err) {
            next(err)
            
        }

    }).catch(err=>{
        next(err)
    })

    // }else { 
    //     next( ExceptionHandler.InternalServerError("something went wrong"));
    // }
// }).catch(err=>{
//         next(err)
//     })

}
function setHomeData (RawData,next) {
    /**
     * array structure
     * Folder:[{},{},{}]
     * File:[{},{},{}]
     * F- {}- F_name,active-1
     * f-{}-f_name,f_desc,f_thumbnail_dir,active-1
     * items -> [array] ->{}
     */
    let Folders,Files;
    Folders = [];
    Files = [];
    for (let item of RawData.items ){
        switch (true) {
            case item?.F_name != undefined:
                item.active == 1? Folders.push(item):null; //if you put liek this {item} then it adds like {item:{..}} , if you remove braces then it only add the values
                break;
            case item?.f_name != undefined:
                item.active == 1?Files.push(item):null;
                break;
            default:
                next(new ExceptionHandler.InternalServerError("Database Misbehaved"))
                break;
        }
    }
    return {Folders,Files}

}
module.exports = {homeMiddleware}