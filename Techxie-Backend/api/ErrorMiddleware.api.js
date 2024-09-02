/**
 * According to Error the log API should recieve error log
 * enable uncaught Exception
 * if any error this should pass the respected result
 * 500 -Internal server error
 * 501 -Not implemented
 * 502 - Bad gateway
 * From 400 to 405 are client side error , so create client Custom Error
 * pages - 404  - bad request and 502 - bad gateway and 503 - service unavailable
 */
var ExceptionHandler = require("./../lib/ExceptionHandlers.js")

let result = {
    status:0,
    message:"something went wrong",
}
function ErrorMiddleware (err,req,res,next) {
    /***
     * Nowitself it is only sending error msg thrrough json , later send HTML accodingly
     */
    switch (true) {
        case err instanceof ReferenceError: //Internale server Error code
            //logs
            send(res,500)
            break;
        case err instanceof TypeError: //Internale server Error code
            //logs
            send(res,500)
            break;
        case err instanceof SyntaxError: //Internale server Error code
            //logs
            send(res,500)
            break;
        case err instanceof EvalError: //Internale server Error code
            //logs
            send(res,500)
            break;
        case err instanceof ExceptionHandler.ServerError: // 500
            send(res,err.code)
            break;
        case err instanceof ExceptionHandler.ClientError: // 400 to 405
            //logs
            //err instance of BadRequest is example
            send(res,err.code)
            break;
        case err instanceof Error:
            //logs
            send(res,500)
            break;
        default:
            send(res)
            break;
    }

}
function Logs (err) {
    console.log(err.message)
}
function send(res,code = 500) { // 500 default,Because if the err.code became undefined so it is actually a 500 code and internal error
    res.statusCode = code;
    res.send(result)
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

/**
 * check for passsing through it - pass
 * check for server error can read internal server error in error middlware -pass
 * try to implement status code throught exceptionhadnler this.code and set a default code - pass
 */