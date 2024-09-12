import extendedFormData from '/scripts/utils/extendedFormData.js';
import apiConfig from '/scripts/utils/apiConfig.js';

class login {
    constructor(){
        let userData = {
   
        }
        let loginContainer =  document.querySelector(".login");
        let loginForm = document.querySelector(".login-form")
        let loginBtn = document.querySelector(".login-btn");
        let forgotBtn = document.querySelector(".fg-btn");
        let em = document.querySelector(".em");

        const loginURL= apiConfig.loginAPI;
        const AuthURL = apiConfig.authAPI;
        const emailVerificationURL = apiConfig.emailVerificationURL;

        this.AuthURL = AuthURL;
        this.loginURL = loginURL;
        this.emailVerificationURL = emailVerificationURL;
        
        this.loginForm =loginForm;
        this.loginBtn = loginBtn;
        this.loginContainer =loginContainer;
        this.em = em;
        this.userData = userData;
        
    }
    makeLogin(){
        this.loginBtn.addEventListener("click",async (e)=>{
           
            e.preventDefault();
            // console.log(this.loginForm)   
            let formData =  new extendedFormData(this.loginForm);
            console.log(this.loginURL)
            let loginResp = await fetch(this.loginURL,{
                method: 'POST',
                body: new URLSearchParams(formData),
            }) 
            let result = await loginResp.json();
            let parameters = result?.result;
            console.log(result)
            //email not verifieed error
            // console.log(...GRANT_VALUES)
            if(result?.status ==1 ){
                console.log(result)
                this.userData.email = result.message.email;
                this.userData.username = result.message.username;
                this.userData.userID = result.message.userID;  
                this.setCurrentUser(this.userData);
                this.Authorization("GRANT_CODE",this.userData.username,this.userData.userID,result.message.sessionID,result.message.grant_code); 
            
            }else if(result?.status == -1){
                //the email is not verified
                this.userData.email = result.message.email;
                this.userData.username = result.message.username;
                this.userData.userID = result.message.userID;

                this.setCurrentUser(this.userData)
                this.validateEmail()
                this.loginContainer.style.setProperty("display","none");
                this.em.style.setProperty("display","flex");
                
            }else if(result?.status == 0) {
                //react the page according to the result
                
            }else {
                //does nothing
                console.error("something went wrong")
            }
        })
    }
    validateEmail() {

        this.em.querySelector("a").innerHTML =this.getCurrentUser().email;
        console.log(this.getCurrentUser() )
    
        fetch(this.emailVerificationURL,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(this.getCurrentUser())
        }).then(data=>{
            console.log("Email sent successfully")
        }).catch(err=>{
            //response should be in UI
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
   setCurrentUser (obj)  {
        var currentUser = obj;
        this.currentUser = currentUser;
    }
    getCurrentUser () {
        return this.currentUser;
    }

}
try {
    let Login = new login();
    Login.makeLogin();
}catch(err) {
    console.log(err)
}
