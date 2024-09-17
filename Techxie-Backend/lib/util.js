let ExceptionHandler = require("./ExceptionHandlers.js")
var results = {
	status:0,
	message:"something went wrong",
}
function setCookie(res,arr) {
    for(let cookie of arr) {
        if(cookie?.expires){
            res.cookie(cookie.name,cookie.value,{
                expires:new Date(cookie?.expires ),
                httpOnly:true,
            });
        }else {
            res.cookie(cookie.name,cookie.value,{
                httpOnly:true,
            });
        }


    }

}
function convertErrors(err) {
    switch (true) {
        case err instanceof ReferenceError: //Internale server Error code
            //logs
            return new ExceptionHandler.PageError(err?.message,500)
            break;
        case err instanceof TypeError: //Internale server Error code
            //logs
            return new ExceptionHandler.PageError(err?.message,500)
            break;
        case err instanceof SyntaxError: //Internale server Error code
            //logs
            return new ExceptionHandler.PageError(err?.message,500)
            break;
        case err instanceof EvalError: //Internale server Error code
            //logs
            return new ExceptionHandler.PageError(err?.message,500)
            break;
 
        case err instanceof ExceptionHandler.BadGateway:
            return new ExceptionHandler.PageBadGateway(err?.message,500)
        break;
        case err instanceof ExceptionHandler.ConflictError:
            return new ExceptionHandler.PageConflictError(err?.message,500)
        break;
        case err instanceof ExceptionHandler.UnAuthorized:
            return new ExceptionHandler.PageUnAuthorized(err?.message,500)
        break;
        case err instanceof ExceptionHandler.ServerError: // 500
            return new ExceptionHandler.PageError(err?.message,500)
        break;
        case err instanceof ExceptionHandler.ClientError:
            return new ExceptionHandler.PageError(err?.message,500)
            break;
        default:
            return new ExceptionHandler.PageError(err?.message,500)
        break;
    }
}
function delCookie(res,arr) {
    for(let cookie of arr) {
        res.clearCookie(cookie?.name);
    }
}
function sendValidRes(res,status = 1,result) {
	results.status = status;
	results.message = result;
	res.send(results)
} 
module.exports = {setCookie,sendValidRes,delCookie,convertErrors}