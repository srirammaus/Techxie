const nodemailer = require("nodemailer");
const fs = require('fs');
//you can also use cheerio to maipulte stuuffs of HTML

//465 -ssl,25 -no ssl, 5877 - tls 
 
    
const Transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:"467", 
    secure:true,
    // debug:true,
    // logger:true,
    ignoreTLS:true,
    auth:{
        user:"xxx@gmail.com",
        pass:"xxx",

    }
})
async function createDocument () {
    await fs.readFile("D:/Techxie/pages/email.html",function(err,data) {
        if(err) throw new Error("something wenr wrong while fetching file");
        console.log(data)
    })
}
function generateLink(){

}
function getToken () {

} 
async function sendEmail () {
    createDocument();
    const msg = await Transporter.sendMail({
        from:"xx@gmail.com",
        to:"sxx@gmail.com",
        subject:"Confirm Your Email",
        text:"Random Text", 
        html:{
            path:"http://techxie.local:5000/User/pages/verifyemail",
        },
    })
    console.log(msg)
}

sendEmail().catch(err => {console.log(err)}) //take as log