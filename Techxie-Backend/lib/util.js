
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
module.exports = {setCookie,sendValidRes,delCookie}