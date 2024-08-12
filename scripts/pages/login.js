import extendedFormData from '/scripts/utils/extendedFormData.js';
import apiConfig from '/scripts/utils/apiConfig.js';

class login {
    constructor(){
        let loginContainer =  document.querySelector(".login");
        let loginForm = document.querySelector(".login-form")
        let loginBtn = document.querySelector(".login-btn");
        let forgotBtn = document.querySelector(".fg-btn");
        
        const loginURL= apiConfig.loginAPI;
        const AuthURL = apiConfig.authAPI;
        

        this.AuthURL = this.AuthURL;
        this.loginURL = this.loginURL;

        this.loginForm =loginForm;
        this.loginBtn = loginBtn;
        
    }
    makeLogin(){
        this.loginBtn.addEventListener("click",async (e)=>{
           
            e.preventDefault();
            // console.log(this.loginForm)   
            let formData =  new extendedFormData(this.loginForm);
            let loginResp = await fetch(this.loginURL,{
                method: 'POST',
                body: new URLSearchParams(formData),
            }) 
            let result = await loginResp.json();
            let parameters = result?.result;


            // console.log(...GRANT_VALUES)
            this.Authorization("GRANT_CODE",parameters?.username,result?.userID,parameters?.sessionID,parameters?.grant_code); 
        })
    }
    async Authorization (request,username,userID,sessionID,GRANT_CODE= 0,REFRESH=0) {
        let formData = new extendedFormData();
        let args = [...arguments];
        let keys = ["request","username","userID","sessionID"];
        GRANT_CODE == 0 ?keys.push("refresh"):keys.push("grant_code");

        for ( let [index,elem] of args.entries() ) {
            if(elem == undefined || elem == null) throw new Error ("try again...")
                console.log(elem)
                formData.set(keys[index],elem)
        }
        
        let authResponse = await fetch(this.AuthURL,{
            method:'POST',
            body: new URLSearchParams(formData),
        })
        console.log(await authResponse.json())
    }
    refreshSession(){

    }
    forgotPassword(){

    }

}
let Login = new login();
Login.makeLogin();