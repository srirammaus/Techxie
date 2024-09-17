/**
 *  Error should be in red alrert
 * invalid inputs invalid password,username invalid,something went wrong ,try again later - it the last one happen del the cookies currently we  have and make del a session delete request but not in await and dont wait for any resp
 * 
 */
import extendedFormData from '/scripts/utils/extendedFormData.js';
import apiConfig from '/scripts/utils/apiConfig.js';
import pageURLs from '/scripts/utils/pageURLs.js';

class login {
    constructor(){
        let userData = {
   
        }
        let loginContainer =  document.querySelector(".login");
        let loginForm = document.querySelector(".login-form")
        let UserRedAlert = loginForm.querySelector(".red-alert");
        let loginBtn = document.querySelector(".login-btn");
        let forgotBtn = document.querySelector(".fg-btn");
        let em = document.querySelector(".em");

        const loginURL= apiConfig.loginAPI;
        const AuthURL = apiConfig.authAPI;
        const emailVerificationURL = apiConfig.emailVerificationURL;
        const csrfURL  = apiConfig.csrfAPI;

        this.AuthURL = AuthURL;
        this.loginURL = loginURL;
        this.emailVerificationURL = emailVerificationURL;
        this.csrfURL = csrfURL;
        this.loginForm =loginForm;
        this.loginBtn = loginBtn;
        this.loginContainer =loginContainer;
        this.em = em;
        this.userData = userData;
        this.UserRedAlert = UserRedAlert;
        
    }
    makeLogin(){
        // UserRedAlert.innerHTML = "*Please fill the requested field"
        // UserRedAlert.style.setProperty("display","block")
        // add the filter
        this.loginBtn.addEventListener("click",async (e)=>{
           
            e.preventDefault();
            console.log(this.loginForm)   
            let formData =  new extendedFormData(this.loginForm);
            for(let key of formData.keys()){
                console.log(key)
                if(!formData.filter(key)){
                    //pop the please fill up the form
                    this.UserRedAlert.innerHTML = "*Please fill the requested field"
                    this.UserRedAlert.style.setProperty("display","block")
                    return false;
                }
            }
            this.UserRedAlert.innerHTML = "*";
            this.UserRedAlert.style.setProperty("display","none");
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

                this.UserRedAlert.innerHTML += result.message;
                
            }else {
                //does nothing
                this.UserRedAlert.innerHTML += "something went wrong";
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
            //red alert
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
        let resp = await authResponse.json();
        if(resp?.status == 1) {
            //initate a csrf token
            this.reqToken();
            window.location.href = pageURLs.drive;
        }else {
            //red alrert
            console.log(resp)
        }
    }
    async reqToken() { // csrf
        try {
            let resp = await fetch(this.csrfURL,{
                method:"POST",
            })
            return await resp.json();
        }catch(err) {   
            console.log(err);
        }
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
