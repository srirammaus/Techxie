/***
 * This file used to change the password , throught OTP,
 * thought PrePWD. through email
 * 
 */
var DB = require('./../config/M_Database');
var ExceptionHandler = require('./ExceptionHandlers.js')
var crypto = require('crypto')
class changePwd{
    constructor () {
        var currentHash,newHash,hashedPwd;
        this.currentHash = currentHash;
        this.newHash = newHash;
        this.hashedPwd = hashedPwd;


    }
    getConnection (){
        return DB;
    }
    createHash(password){
		//CIPHER VS HASH Ciphers are algorithms that can encrypt or decrypt data based on shared or public/private keys. Hashes (a.k.a. Message Digests) are one way, irreversible conversion of an input source
		var c_hash = crypto.createHash('sha256');
		var result = c_hash.update(password).digest('base64');
		this.result = result;
		return result;
	}
    setHash (pwd) {
        this.hashedPwd = this.createHash(pwd)
    }
    getNewHash() {
        return this.hashedPwd;

    }
    getcurrentHash () {
        return this.hashedPwd
    }
    /**
     * check valid user through server.validater
     * check OAUth 
     * check for csrf
     */
    changePwdThroughEmail() {

    }
    changePwdThroughMobile () {

    }
    changePwdThroughOld (username,currentPwd,newPwd) {
        /**
         * Actually this authenticated with CSRF and OAuth respectedky 
         * match for old hash
         * 
         */
        
        const query = {"credentials.username": username};
        let getConn = this.getConnection();
        this.setHash(newPwd);
        const data = {  
            "credentials.password": this.getNewHash().toString(),
        }
        function changePass (resolve,reject,newPwd){ 
            getConn.getConnection((err,db)=>{
                if(err){
                    reject(new ExceptionHandler.ServerError("something went  wrong"));
                }else{
                    DB.UpdateDocument(db,query,null,"USERS",data,(err,res)=>{
                        if(err) {
                            reject(new ExceptionHandler.ServerError(err))
                        }else{
                            if(res?.modifiedCount == 1) {
                                resolve(1)  //flag
                                // reject("something went wrong ")
                            } else {
                                reject(new ExceptionHandler.ServerError("something went  wrong"));
                            }
                           
                        }
                    })
                }
            })
        }
        
        return new Promise ((resolve,reject) =>{

            if(this.checkItisSamePwd(currentPwd,newPwd)) {
                getConn.getConnection((err,db)=>{
                    if(err){
                        reject(new ExceptionHandler.ServerError("something went  wrong"));
                    }else{
                        DB.FindDocument(db,'USERS',query,(err,res)=>{
                            if(err){
                                reject(new ExceptionHandler.ServerError("something went  wrong"));
                            }else{
                                if(typeof res == "undefined" || res == null ){
                                    reject(new ExceptionHandler.UnAuthorized("Invalid username"));
                                }else{
                                    // console.log(res.credentials)
                                    let fetched_userID = res.credentials?.USER_ID;
                                    this.setHash(currentPwd); // for validation of pwd with db
                                    if(res.credentials?.password == this.getcurrentHash()){
                                        if(res?.verified_e == 1){
                                            //change pwd
                                            changePass(resolve,reject,newPwd)
                                        }else{
                                            //redirect to email verification by sending verification email to client or user
                                            reject( new ExceptionHandler.UnAuthorized("email not verified"));
                                        }
        
                                    }else{
                                        reject(new ExceptionHandler.UnAuthorized("Invalid password"))
                                    }
                                }
                            }
                        })
                    }
                })
            }else {
                reject(new ExceptionHandler.UnAuthorized("current passwword and new password should nnot be same"));
            }
            
        })

    }
    checkItisSamePwd (currentPwd,newPwd) {
        if(currentPwd.toString().trim()  === newPwd.trim() ) {
            return false
        }else {
            return true
        }
    }

} 
  
// var forgot = new forgotPwd();
// !async function(){
//     try {
//         await forgot.changePwdThroughOld("newuse4321","12344",123444);
//     }catch(err) {
//         console.log(err?.message || err);
//     }
// }();
module.exports = {changePwd}
