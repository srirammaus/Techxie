var Folder = require('../../../lib/Folder.js');
var ExceptionHandler =require('../../../lib/ExceptionHandlers.js');
var filter = require('../../../lib/filter.js');
var util = require('../../../lib/util.js');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * This middleware fetch data from the library and if fails it throws to error page 
 * No need to validate cookies here because the cookies already validated via the authentiation, so if there is no username or userid it will kick him out
 */
function homeMiddleware(req,res,next)  {
    // let properties = ["cookies"];
    // let requiredParams= ["username","userID","F_num"];
    // filter.Filter(req,response,next,properties,requiredParams).then(flag=>{if(flag == 1){
    try {
        let properties = ["body"];
        let requiredParams= ["F_num"]
        console.log(req.body)
        filter.Filter(req,res,next,properties,requiredParams).then(()=>{
            let username = req.cookies.username;
            let userID = req.cookies.userID;
            let F_num = req.body.F_num;
            return new Promise((resolve,reject)=>{
        
                try {
        
                    let folder =  new Folder.Folder();
                    folder.viewFolder(username,userID,F_num,(err,res)=>{
                        if(err){
                            reject(err);
                        }else{
                            if(res == undefined || res.length == 0 ) {
                                next(new ExceptionHandler.PageBadGateway("Bad gateway"))
                            }else {
                                console.log(res)
                                let RawData = res;
                                setHomeData(req,RawData,next);
                                if(req.body.Folders.length == 0 && req.body.Files == 0) {
                                    next(new ExceptionHandler.PageEmptyFolder("Database Misbehaved"))
                                }else{
                                    next();
                                    
                                }
                                // res.set("Content-Type", "text/html");
                            }
                            // var filteredresult = folder.viewFolderFilter(res)
                            // console.log("After: ")
                
                            // result.message =Object.assign({},filteredresult); // check what if here would be a reference error how to caught eg: invalid veriable or splelling mistakei declared here filteredddresult 
                            // result.status = 1;
                            // response.send(result)
                            
                            
                        }
                    })
                    
        
                }catch(err) {
                    next(util.convertErrors(err))
                    
                }
        
            }).catch(err=>{
                next(util.convertErrors(err))
            })
        }).catch((err)=>{
            console.log("Im the catcher")
            next(util.convertErrors(err))
        })
    }catch (err) {
        next(new ExceptionHandler.PageError("Internal server error"))
    }
    //     setParameters (req)
    

    // }else { 
    //     next( ExceptionHandler.InternalServerError("something went wrong"));
    // }
// }).catch(err=>{
//         next(err)
//     })

}
function setHomeData (req,RawData,next) {
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
                console.log("succes")
                item.active == 1? Folders.push(item):null; //if you put liek this {item} then it adds like {item:{..}} , if you remove braces then it only add the values
                break;
            case item?.f_name != undefined:
                console.log("succes")
                item.active == 1?Files.push(item):null;
                break;
            default:
                break;
        }
    }
    req.body.Folders = Folders;
    req.body.Files = Files;
    

}
module.exports = {homeMiddleware}

//admin2
//admin2

//admin