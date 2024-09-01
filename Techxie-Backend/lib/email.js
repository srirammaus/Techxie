var DB = require('./../config/M_Database')
var validater = require(__dirname + '/' + 'validater.js');
var SMTPMailer = require(__dirname + '/SMTPmailer.js')
/** too much error handling and callbacks pending
 * setUser and generateToken and setToken,once set ,then check for valid user and email and verify_e is 0
 * if that was 1 send 404 page , if 0 send the token, if there is already token send new token and link 
 * verify token if the recieved is valid and return to proper page
 * once the verification done set the verify_e to 1
 * if change email then change the email and verificaition e to 0
*/
const dotenv = require('dotenv');

dotenv.config({path:'./config/.env'})
class email {
    constructor(){
        var token;
        this.token = token;

    }
    setUser(username,email,userID){
        this.username = username;
        this.email = email;
        this.userID = userID;
        return this;
    }
    getConnection(){
        return DB;
    }
    insertToken(){
        let expire; //expire it by zeros in ones
    }
    generateToken(n){ //study how the token is generating later
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	    var token = '';
	    for(var i = 0; i < n; i++) {
	        token += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return token;
    }
    verifyEmail(username,email,userID,cb){// get token if ther already //essential

        validater.isValidEmail(this.username || username,this.email || email,this.userID || userID,null,(err,res)=> {
            if(err) {
                cb(new Error(err.message))

            }
            else {
            // create a db or do something for those email storing
            console.log("----")    
            console.log(res)
                if(res?.verified_e == 0){
                    // send new token if also have 
                    console.log("Not registered")
                    let flag = 1;
                    // console.log(res)
                    cb(null,flag)
                }else{
                    //redirect to 404 page
                    cb(new Error("Already registered email -- 404 Error"))
                }
            }
        })        
    }
    verifyToken(username,userID,email,token,cb){ //This shoudl verify token and
        let flag;
        let query = {"credentials.username":username,"credentials.USER_ID":userID,email:email.toString(),token:token.toString()}
        let data = {
            verified_e:1,
        }
        this.getConnection().getConnection((err,db) =>{
            if(err){
                cb(new Error("something went wrong at line 43"))
            }else{
                DB.UpdateDocument(db,query,null,"USERS",data,(err,res)=>{
                    if(err) {
                        cb(new Error(err))
                    }
                    else{
                        //check for valid token
                        // console.log(res)
                        res?.modifiedCount == 1 ? cb(null,flag):cb(new Error("invalid Parameters"))
                    }
                })
            }
        })
    }
    unVerifyEmail() {
        //if something went bad
    }
    setTokentoDB(cb){//This should made the setToken and this should add into user acc token
        let flag =1;
        let query = {"credentials.username":this.username,"credentials.USER_ID":this.userID,email:this.email};
        let data ={
            token:this.getToken(),
        }
        this.getConnection().getConnection((err,db)=>{

            if(err) cb(new Error("something went wrong at line 70"));
            else{
                DB.UpdateDocument(db,query,null,"USERS",data,(err,res) =>{
                    if(err) {
                        cb(new Error(err.message))
                    }
                    else{
                        
                        console.log(res)
                        res?.modifiedCount == 1? cb(null,flag):cb(new Error("something went wrong"));

                    }
                })
           }
        })
    }
    changeEmail(){
        
    }
    sendToken(cb) {
        //configure to nodemailer
        //setDoc
        //sendemail
        let mailer = new SMTPMailer.SMTPmailer();
        try {
            mailer.setDoc(this.getURL())
            mailer.sendEmail().catch((err)=>{
                //err as log
                cb( new Error("something went"))
            }).then(()=>{
                cb(null,1)
            })    
        }catch(err) {
            cb(new Error(err))
        }
        

    }
    setToken(){
        this.token = this.generateToken(24);
        return this;
    }
    getToken(){
        return this.token;
    }
    getURL(){
        return process.env.baseURL+`User/api/verifyMail/${this.getToken()}?username=${this.username}&USER_ID=${this.userID}&email=${this.email}`
    }
}

module.exports = {email};
