var multer = require('multer');
var fs = require('fs');
var crypto = require('crypto');
var DB =  require('./../config/M_Database');
var xsrf_verification_lib = require(__dirname + '/xsrf_verification').xsrf_verification;
var OAuth = require(__dirname + '/OAuth').OAuth;
class pdf_upload{
    constructor(){
        var Auth = new OAuth();
    }
    setVaribles(userID,xsrf_token){
        this.userID = userID;
        this.xsrf_token = xsrf_token;
    }
    isValidFile(fileType){ // size and file type stuffs
        var check;
        var validFileFormats = ['png','jpg','jpeg','pdf','mp4']; // i think if we change the header we could pentetrarte here
        var split_ = fileType.split('/');
        check = validFileFormats.indexOf(split_[1]);
        if(check == -1){
            return false;
        }
        return true;
    }
    //arsg - bucket_data_name from setmulter engine
    initialize(bucket_data_name){ // base setup dir or bucket 
        var f_values,u_id,xsrf_token,Bucket,getFileName,sessionID,username,session_token;
        var xsrf_verification = new xsrf_verification_lib();
        var multer_ =  multer.diskStorage({
            destination: async (req,file,cb)=>{ // filter should be used here
                username = req.body.username;
                u_id =req.body.userID;
                xsrf_token = req.body.xsrf_token;
                session_token = req.body.session_token || req.body.access_token;
                sessionID = req.body.sessionID;
                if(u_id == null || xsrf_token == null || username == null || sessionID ==null || session_token ==null){
                    cb(new Error("Invalid Input Fields")) // temp
                }else{ // this verfication can also be done in there [setmulter cb(null,false)]
                    new OAuth().Authenticate(username,session_token,sessionID,(err,result_)=>{
                        if(err){
                            cb(new Error(err.message))
                        }else if(result_ == 1){
                            var xsrf_verification_filter = xsrf_verification.filter([req.body.userID,req.body.xsrf_token]);
                            var xsrf_verification_setter = xsrf_verification.setter([xsrf_verification_filter[0],xsrf_verification_filter[1]]);
                            xsrf_verification.verify((err,flag,res)=>{
                                if(err){
                                    cb(new Error(err.message))
                                }else if(flag == 0){
                                    cb(new Error("csrf Expired"));
                                    //redirect to home page , if there is valid session token
                                }
                                else{
                                    f_values = this.filter([u_id,xsrf_token])
                                    this.setVaribles(f_values[0],f_values[1]);
                                    this.setBucketName(bucket_data_name)
                                    this.setBucket(u_id,xsrf_token,(err,dir)=>{
                                        if(err){ 
                                            cb(new Error(err.message))}
                                        else{
                                            cb(null,dir);
                                        }
                                    });
                                      // catch the bucket not created error through multer
                                }
                            })
                        }else{
                            cb(new Error("something went wrong"))
                        }
                    })
                }
            
            },
            filename: (req,file,cb)=>{
                getFileName = this.setFileName(file.originalname);
                console.log(getFileName)
                cb(null,getFileName)
            }
        })
        return multer_;
    }
    // args - [bucket_data_name is the time of the req reached , which is used in the bucket's co name]
    setMulter(bucket_data_name){ //engine + verification
        var xsrf_verification = new xsrf_verification_lib();
        var setup = multer({storage:this.initialize(bucket_data_name),
                fileFilter: (req,file,cb)=>{
                            if(!this.isValidFile(file.mimetype)){
                                return cb(null,false,new Error("Upload a valid File"));
                            }else{
                                console.log(req.body)
                                var u_id = req.body.userID;
                                var xsrf_token = req.body.xsrf_token;
                                console.log(u_id);
                                console.log(xsrf_token)
                                if(u_id == null || xsrf_token == null){
                                    cb(new Error("undefined values")) // temp
                                }else{// return the bucket name here
                                    cb(null,true);       
                                }
                                //if here false mean select a file to upload

                            }
            }
        })
        return setup;

    }
    //args - user-id and xsrf_token 
    setBucket(u_id,xsrf_token,cb){ // creating dir 
        // var getBucketName = this.setBucketName()
        var dir = __dirname + '/WebPdfConverter/' + this.getBucketName(); // catch the bucket not created error through multer
        try{
            if(!fs.existsSync(dir)){
                this.setFileData(u_id,xsrf_token,dir,(err,flag)=>{
                    if(err){
                        cb(new Error(err.message))
                    }else{
                        fs.mkdirSync(dir,{recursive: true}); 
                        cb(null,dir);
                    }
                })
            }else{
                cb(null,dir);
            }
        }catch(err){
            cb(new Error(err.message))
            console.log("upload to session log")// get orginal err to log
        }
        
        // return dir;
    }

    //args - bucket id name from function initialie 
    setBucketName(bucket_data_name){
        // var B_name = crypto.createCipher('aes-128-cbc',this.userID);
        // var bucket_name = B_name.update(D.toString(),'utf8','hex');
        // bucket_name += B_name.final('hex');
        // console.log(this.activated_time_milli)
        var bucket_name = crypto.createHash('sha256','SALT').update(bucket_data_name.toString()).digest('hex')
        var BucketName = this.userID + '-'+bucket_name;
        this.BucketName = BucketName;
        return BucketName; 
    }
    setFileName(original_filename){
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var xsrf_token = '';
        for(var i = 0; i < 15; i++) {
            xsrf_token += chars[Math.floor(Math.random() * chars.length)];
        }
        var f_name = original_filename.toString() + '-' + xsrf_token;
        return f_name; 
    }
    setFileData(u_id,token,bucket_dir,cb){
        var date = Date.now();
        var date_string = new Date(date).toString();
        var Data = {
            Date : date,
            Date_ : date_string,
            USER_ID: u_id,
            xsrf_token: token,
            BucketName: this.getBucketName(),
            Bucket_dir:bucket_dir,

        }
        DB.getConnection((err,db)=>{
            if(err){cb( new Error("Something went wrong"))}
            else{
                DB.InsertDocument(db,"WebPdfConverter_Data",Data,(err,res)=>{
                    if(err){
                        cb(new Error("something went wrong"))
                    }else{
                        cb(null,true);
                    }
                })
            }
        })
    }
    getBucketName(){
        return this.BucketName;
    }
    getUserId(){
        return this.userID;
    }
    BucketMeta(){ // forward to this to other server that will save this data to specific user's folder
        return ;
    }
    getRMulter(){
        return multer;
    }
    ImgVirusDetector(){
        return;
    }
    filter(val){
        for (var i=0;i<val.length;i++){
            val[i] = val[i].trim();
        }
        return val;
    }

}
module.exports = {pdf_upload}