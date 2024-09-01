/**
 * Works for Error handler
 * enable u uncaught Exception
 * if any error this should pass the respected result
 */
let result = {
    status:0,
    message:"something went wrong",
}
function ErrorMiddleware (err,req,res,next) {
    // process.on('uncaughtException',(err)=>{
    //     next(err);
    //  })
    /***
     * Nowitself it is only sending error msg thrrough json , later send HTML accodingly
     */
    console.log(err)
    if(err?.message) {
        result.message = err.message;
        res.send(result );
    }else if(err){
        result.message = err;
        res.send(result )
    }else{
        res.send(result)
    }
}
function caughtAnyExceptions(req,res,next){
    process.on('uncaughtException',(err)=>{
        console.log("I catch uncaught exception")
        next(err)
    })
    process.on('unhandledRejection',(err)=>{
        console.log("I catch at unhandled rejection")

        next(err)
    } )
    next()
}
module.exports = {ErrorMiddleware,caughtAnyExceptions}

