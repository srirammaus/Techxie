//pdf converter , it should convert any type of file to pdf
// once the conversion done then u have to expire the token
const validater = require(__dirname +'/validater.js');
const imgToPDF = require('image-to-pdf');
var fs = require('fs');
//this below result name is the directory name or B_name , but this tored in another converted directory
function converter(dir_files,result_name, cb){   //dir files should be array
    const pages = [];
    var res_name = result_name.split(".");
    if(typeof(dir_files) == "object"){
        for (file in dir_files){
            console.log("converter")
            pages.push(fs.readFileSync(dir_files[file]))   //loop this
        }
        cb(null,true)
    }else{
        cb(new Error("Args should be in array"));
    }
    try{
        process.on('uncaughtException',function(err){
            if(err){
                cb(new Error(err.message))
            }
        })
        imgToPDF(pages,imgToPDF.sizes.A4).pipe(fs.createWriteStream(__dirname+"/WebPdfConverted/"+ res_name[0]+".pdf")) //createing stream won't create if there is no directory
    }catch(err){
        cb(new Error("Something Went Wrong  : "+err.message));
    }
}
function Img_limit(IMG_LIMIT,cb){ // validate and verfiy about image , checking virus and malware in file ,
    if(typeof(IMG_LIMIT) == "object"){
        var flag;
        IMG_LIMIT == 100 || IMG_LIMIT < 100 ? cb(flag): cb(new Error("Limit Exceeded"));    
    }else{
        cb(new Error("TypeError : IMG_LIMIT should be array"))
    }
    return ;
}
function Img_size(size_limit = null,cb){  //setting size as args because you can use this function for future purpose
     var INFO,SIZE;
     const IMG_INFO = fs.stat(__dirname + "/Temp/sample.jpg",(err,stats) =>{ //store in temp location after this verfication this sould be moved 
        if(err){
            cb(new Error ("something went wrong"))
        }        
        INFO = stats;
        SIZE = stats.size / 1000;
        SIZE /= 1000;
        console.log(SIZE)   //Give value in convenient digit ,MB is the result
    });
     return;
}
function getSources_(directory_name){
    try{
        var directories = [];
        var directory = fs.readdirSync(__dirname + '/WebPdfConverter/'+directory_name);
        for(var i=0;i< directory.length; i++){
            directories.push(__dirname + '/WebPdfConverter/'+directory_name +"/"+directory[i]);
        }
        return directories;
    }catch(err){
        throw new Error("Invalid directory name")
        // return null; //if false then raise as "invalid directory name input, trynaa hack us?"
    }

}
//file code is activate time milli to hased
//Not in USE [date: Feb 20th]
function getSources(userID ,file_code){ //retriving images from respected folders
    var bucket_name = crypto.createHash('sha256','SALT').update(file_code.toString()).digest('hex')
    var BucketName = userID + '-'+bucket_name;
    return BucketName;
}
module.exports = {getSources_ , converter}
// Img_verification()

// converter(getSources_("11-98b20bf054ccc29a37b925281cc89706d3152ef51c9384fb3de2f92d39d8a3e0"),"Techxie.pdf",(err,result)=>{
//     if (err){
//         console.log("console")
//         console.log(err.message)
//     }else{
//         console.log("Displaying")
//         console.log("Pdf converted")
//     }
//     console.log("Printing")
// })


/*
* The meaning of this three lines is we can pass in either base64 or bu putting simply path or as buffer fs.readfile(...)
const pages = [
    "./pages/image1.jpeg", // path to the image  
    "data:image/png;base64,iVBORw...", // base64
    fs.readFileSync('./pages/image3.png') // Buffer
]
 
imgToPDF(pages, imgToPDF.sizes.A4)
    .pipe(fs.createWriteStream('output.pdf')


var fs = require('fs');

fs.appendFile('ExceptionHandlers.js', "New Content", function (err) {
  if (err) throw err;
  console.log('Saved!');
  const content = fs.createReadStream("mynewfile1.txt");
console.log(content)
});;*/
