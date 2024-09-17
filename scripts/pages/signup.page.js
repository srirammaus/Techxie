/**
 * Error should be in red alrert
 * invalidusername invalid inputs, password mismatach,user exist,,something went wrong ,try again later - it the last one happen del the cookies currently we  have and make del a session delete request but not in await and dont wait for any resp
 * 
 */
import apiConfig from "../utils/apiConfig.js";
const signupURL = apiConfig.signupAPI;
const verificationURL = apiConfig.userVerificationAPI;

const emailVerificationURL = apiConfig.emailVerificationURL;
const phoneVerificationURL = "";

const phase1 = document.querySelector('.phase-1');
const phase2 = document.querySelector('.phase-2');
const phase3 = document.querySelector('.phase-3');
const phase4 = document.querySelector('.phase-4');
const usernameInput = document.querySelector('#username');
const verifyUsernameBtn = document.querySelector('.phase-1 button');
const nextBtn = document.querySelector('.phase-2 button');
const verifyOtpBtn = document.querySelector('.phase-3 button');
const em = document.querySelector(".em"); //phase -3
const em_p = em.querySelector(".em p")
const UserRedAlert = phase1.querySelector(".red-alert");
const FormRedAlert = phase2.querySelector(".red-alert");

var currentPhase = phase1; //default

FormData.prototype.changeKeyName = function (existingKey,newKey,...values) {
    for( let val of values){
        this.append(newKey,val);
        this.delete(existingKey)
        
    }
}
FormData.prototype.filter = function(type){
    //bind is not updating this so we are usig func.call
    return filter.call(this,type);
}

// verifyOtpBtn.addEventListener("click",function (e) {

// })

function filter (type) { //type here is key
    
    let types = ["username","email","name","password","cpassword","ph_number"];
    if(types.includes(type)){
     
        switch (type) {
            /**
             * str limit for username is 25
             * trim the unwanted white spaces around it and warn if the use has white spaces in username
             */
            case types[0]: // username
                if(this.get(type) == '' || this.get(type) == undefined){
                    return false
                } // if empty add raise please add requested field  //throw new Error("Invalid Input Field") 
                else {
                    var val = this.get(type)
                    if(val.split(" ").length > 1 ) throw new Error("Username should not consist space in between");
                    if(val.length > 25) throw new Error ("Username limit exceeded")
                    this.set(type,val.trim());
                    return true;
                }
            case types[1]: 
                /**
                 * str limit for email is 25
                 * check whther it conatins @ and .
                 * trim it
                 */
                var val =this.get(type) ;
                

                if(val == '' || val == undefined || val.trim().length == 0){
                    return false
                }else {
                    const emailValue =val; 
                    const char = '@.'
    
                    if(!char.split('').every((eachChar)=>emailValue.includes(eachChar))){
                       return false; 
                    }
                    if(val.split(" ").length > 1 ) throw new Error("Username should not consist space in between");
                    if(val.length > 25) throw new Error ("email input limit exceeded")
                    this.set(type,emailValue.trim())
                    
                }
                
            case types[2]:
                /**
                 * str limit for name is 30
                 */
                var val = this.get(type) ;
                

                if(val == '' || val == undefined || val.trim().length == 0){
                    throw new Error("Invalid Name field")
                } 
                else {
                    if(val.length > 25) throw new Error ("email input limit exceeded")
                    this.set(type,val.trim());
                    return true;
                }
            case types[3]:
                var val = this.get(type);
                

                if(val == '' || val == undefined || val.trim().length == 0){
                    return false
                }
                if(val.length > 40) throw new Error ("password limit exceeded")
                this.set(type,val.trim());
                break;
            case types[4]:
                    var val = this.get(type);
                    

                    if(val == '' || val == undefined || val.trim().length == 0){
                        return false
                    }
                    if(val.length > 40) throw new Error ("password limit exceeded")
                    this.set(type,val.trim());
                    break;
            case types[5]:
                var val = Number(this.get(type));
                console.log(this.get(type))
                if(val == '' || val == undefined || val == NaN){
                    throw new Error("Not a Number")
                }
                if(typeof val != "number") throw new Error("Invalid Input field")
                if(val.length < 15 && val.length >= 10)  throw new Error ("Number input limit not reached")
                break;
            default:
               break;
            
        }
 
    }

}

async function userVerification () {
    /***
     * check if the user exist,if exist make a red small pop alert
     * no empty fields alert
     * filter words
     * switch to next phase
     * disable current phase
     * make enter button enable 
     */
    try {
        let formData = new FormData(phase1.querySelector("form"));

        for(let key of formData.keys()){
            if(!formData.filter(key)){
                //pop the please fill up the form
                UserRedAlert.innerHTML = "*Please fill the requested field"
                UserRedAlert.style.setProperty("display","block")
                return false;
            }
        }
        UserRedAlert.innerHTML = "*";
        UserRedAlert.style.setProperty("display","none");

        let response = await fetch (verificationURL,{
            method: 'POST',
            body: new URLSearchParams(formData) ,
        });
        let result = await response.json();
        // console.log(result)
        if(result?.message?.USER_ID){
            /**
             * @param userID 
             * @param username
             * @param signup - 0 or 1
             * log everything
             * setting the current phase to display none
             * change the current phase to signup form and display them as flex
             */
            setCurrentUser(result.message)
            currentPhase.style.setProperty("display","none");
            phase2.style.setProperty("display","flex");
            currentPhase = phase2;
               
        }else if(result.status == 0) {
            /**
             * @param status - if the status said to be zero it should display the respected error it recived
             * log everything 
            */
            UserRedAlert.innerHTML += result.message || "something went wrong,try again";
            UserRedAlert.style.setProperty("display","block")
            return false;     
        }
        else{
            UserRedAlert.innerHTML += "Something went wrong,try again"
            UserRedAlert.style.setProperty("display","block")
            return false;
        }
              
    } catch (error) {
        //log
        UserRedAlert.innerHTML += "Something went wrong,try again"
        UserRedAlert.style.setProperty("display","block")
        return false;
    }

    
    


}  
verifyUsernameBtn.addEventListener("click",function(e){
    e.preventDefault()
    userVerification();
})
function signup () {
    /** 
     * Without agree dont let 
     * create a terms and condition pop up
     * move to next phase
     * set current phase disable
     * make a small session to maintain for 1 day for that particular device
     * filter inputs
     * password limits and rules
     * number limit
     * email check 
     */
    try {
        let formData =  new FormData(phase2.querySelector("form"));

        for(const pair of Array.from(formData.entries())){ //chaning the current to Array 
            formData.changeKeyName(pair[0],pair[0].split('-')[1],pair[1])
        }
        formData.append("username",getCurrentUser().username);
        formData.append("userID",getCurrentUser().USER_ID);
        for(let key of formData.keys()){
            console.log(key)
            if(formData.filter(key) == false){
                // console.log(formData.filter(key))
                return false;
            }
        }
        FormRedAlert.style.setProperty("display","none")
        FormRedAlert.innerHTML = "*";
        let DATA = new URLSearchParams(formData);
        console.log(signupURL)

      
        fetch(signupURL,{
            //i think by default is  urlencoded !
            method:"POST",
            body:DATA,
            // headers: defaultHeaders(),
            // body:JSON.stringify(DATA),
           
        }).then(response=>{
            return response.json()
        }).then(result =>{
            console.log(result)
            
            if(result?.message?.flag == 1) {
                setCurrentUser(result.message)
                currentPhase.style.setProperty("display","none");
                // phase3.style.setProperty("display","flex");
                em.style.setProperty("display","flex")
                currentPhase = em;
                emailVerification();
            }else if(result?.status == 0) {
                FormRedAlert.innerHTML += result.message || "something went wrong,try again";
                FormRedAlert.style.setProperty("display","block")
                return false;     
            }
            else{
                FormRedAlert.innerHTML += result.message || "something went wrong,try again";
                FormRedAlert.style.setProperty("display","block")
                return false;     
            }
            
        })      
    } catch (error) {
        FormRedAlert.innerHTML += result.message || "something went wrong,try again";
        FormRedAlert.style.setProperty("display","block")
        return false;     
    }


}
nextBtn.addEventListener("click",function(e){
    e.preventDefault()
    signup();
})
//This for mobile confirmation 
// for mail , the mail should send to person's mail id and redirect again to dashboard

// verifyOtpBtn.addEventListener("click",function(e) {
//     e.preventDefault();
//     //if success redirect to dashboard! else to home page

// })
function emailVerification () {

    /**
     * email and phone
     * phone voip [plivo,twillio]
     * smtp
     */
    try{
        em.querySelector("a").innerHTML = getCurrentUser().email;
        let email,username, userID;
        let data = {
            email : getCurrentUser().email,
            userID :  getCurrentUser().userID,
            username  : getCurrentUser().username,
        }
        console.log(data)
    
        fetch(emailVerificationURL,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(data)
        }).then(resp =>{
            return resp.json();
        })
        .then(data=>{
            if(data.status == 0) {
                em_p.innerHTML =  "something went wrong"
            }
        }).catch(err=>{
            //response should be in UI
            console.log(err?.message  )
            em_a.innerHTML = "something went wrong"
        })
    }catch(error){
       em_a.innerHTML = "something went wrong"
    }
   

}
function phoneVerification () {

}

// setTimeout(()=>{
//     signup(),
// },5000)
//possiblites