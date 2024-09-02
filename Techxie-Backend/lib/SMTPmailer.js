const nodemailer = require("nodemailer");
const fs = require('fs');
const HTMLParser = require('node-html-parser');
const createHTML = require('create-html');
const { resolve } = require("path");
var ExceptionHandler = require('./ExceptionHandlers.js')
const dotenv = require('dotenv');
dotenv.config({path:'./../config/.env'})
//you can also use cheerio to maipulte stuuffs of HTML

//465 -ssl,25 -no ssl, 5877 - tls 



class SMTPmailer {
    constructor() {
        let doc;
        this.doc = doc;
    }
    createDocument (link) {
        const bodyStyle = {
            width:"100%",
            height:"auto",
        } //make it iterate over
        let bodyStyleString='';
        for( let item in bodyStyle){
            bodyStyleString += `${item}:${bodyStyle[item]};`
        }
        return new Promise(async function(resolve,reject){
            console.log(link)
            await fs.readFile("D:/Techxie/pages/email.html",function(err,data) {
                if(err) reject("something wenr wrong while fetching file");
                let parsedHTML = HTMLParser.parse(data.toString());
                parsedHTML.getElementById("link").innerHTML += `<a href=${link}>  Click Here </a>`;
                parsedHTML.querySelector("body").setAttribute("style",bodyStyleString)
                resolve(parsedHTML.querySelector("html").outerHTML)
              
            })
    
        })
    }
    //"<a href=''></a>"
    async setDoc(link) {
        try {
            this.doc = await this.createDocument(link)
        }catch(err) {
            /**
             * This error will be caught by the email.js 
             */
            throw new ExceptionHandler.InternalServerError(err)
        }
        
    }
    getDoc(){
        return this.doc;
    }
    getParameters() {
        return new Promise ((resolve,reject)=>{
            fs.readFile("./config/email.config.json",(err,data)=>{
                if(err){
                    reject(err)
                }
                console.log(data.toString())
                resolve(JSON.parse(data))
            })
        })
    }
    Transporter() {
        return nodemailer.createTransport({
            service:process.env.SMTPSERVICE,
            host:process.env.SMTPHOST,
            port:process.env.SMTPPORT, 
            secure:process.env.SMTPSECURE,
            // debug:true,
            // logger:true,
            ignoreTLS:true,
            auth:{
                user:process.env.SMTPUSER,
                pass:process.env.SMTPPASS,
        
            }
        })
    }
    async sendEmail () {
        const params =await this.getParameters()
        const msg = await this.Transporter().sendMail({
            from:process.env.SRCMAIL,
            to:"srirammaus@gmail.com",
            subject:params.subject.verifyEmail,
            text:"Random Text", 
            html:this.getDoc(),
        })
        // console.log(msg)
    }
    
}

module.exports ={SMTPmailer}
// sendEmail().catch(err => {console.log(err)}) //take as log
       // let htdoc = createHTML({
            //     title:"title",
            //     body:parseHTML.querySelector("body").innerHTML,
            //     css:'D:/Techxie/assets/email.css',
            //     script:"D:/Techxie/Techxie-Backend/lib/email.js",
            // })

