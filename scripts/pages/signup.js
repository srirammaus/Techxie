const signupURL = "http://techxie.local:5000/User/signup";
const verificationURL = "http://techxie.local:5000/User/UserVerification";
const emailVerificationURL = "";
const phoneVerificationURL = "";

const phase1 = document.querySelector('.phase-1');
const phase2 = document.querySelector('.phase-2');
const phase3 = document.querySelector('.phase-3');
const phase4 = document.querySelector('.phase-4');
const usernameInput = document.querySelector('#username');
const verifyUsernameBtn = document.querySelector('.phase-1 button');
const nextBtn = document.querySelector('.phase-2 button');
const verifyOtpBtn = document.querySelector('.phase-3 button');

var currentPhase = phase1; //default

FormData.prototype.changeKeyName = function (existingKey,newKey,...values) {
    for(val of values){
        this.append(newKey,val);
        this.delete(existingKey)
        
    }
}

verifyOtpBtn.addEventListener("click",function (e) {

})


async function userVerification () {
    /***
     * check if the user exist,if exist make a red small pop alert
     * no empty fields alert
     * filter words
     * switch to next phase
     * disable current phase
     * make enter button enable 
     */


    let formData =  phase1.querySelector("form");

    let response = await fetch (verificationURL,{
        method: 'POST',
        body: new URLSearchParams(new FormData(formData)) ,
    });
    var result = await response.json();
    console.log(result)
    if(result?.USER_ID){
        setCurrentUser(result)
       currentPhase.style.setProperty("display","none");
       phase2.style.setProperty("display","flex");
       currentPhase = phase2;
            //should be valid untilyl signup happens
    }else{
        console.log(result);
    }
    
    //possiblity

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
    let formData =  new FormData(phase2.querySelector("form"));
 
    for(const pair of Array.from(formData.entries())){
        formData.changeKeyName(pair[0],pair[0].split('-')[1],pair[1])

    }
    for(const pai of formData.entries()){
        console.log(pai[0] + " this " + pai[1])
        
    }


    formData.append("username",getCurrentUser().username);
    formData.append("userID",getCurrentUser().USER_ID)
    let DATA = new URLSearchParams(formData);

    fetch(signupURL,{
        //i think by default is  urlencoded !
        method:"POST",
        body:DATA,
        // headers: defaultHeaders(),
        // body:JSON.stringify(DATA),
       
    }).then(response=>{
        return response.json()
    }).then(commits =>{
        console.log(commits)
        if(commits?.flag == 1) {
            currentPhase.style.setProperty("display","none");
            phase3.style.setProperty("display","flex");
            currentPhase = phase3;
        }
        else{
            
        }
        
    })

}
nextBtn.addEventListener("click",function(e){
    e.preventDefault()
    signup();
})
//This for mobile confirmation 
// for mail , the mail should send to person's mail id and redirect again to dashboard

verifyOtpBtn.addEventListener("click",function(e) {
    e.preventDefault();
    //if success redirect to dashboard! else to home page

})
function emailVerification () {
    //email and phone
    //smtp
    //phone voip [plivo,twillio]

}
function phoneVerification () {

}

// setTimeout(()=>{
//     signup();
// },5000)
//possiblites