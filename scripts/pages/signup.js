const signupURL = "http://127.0.0.1:5000/signup";
const verificationURL = "http://127.0.0.1:5000/UserVerification";
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



verifyOtpBtn.addEventListener("click",function (e) {

})


async function userVerification () {
    //diable the current phase
    //check whether there is valid input 
    //fetch
    let formData =  phase1.querySelector("form");

    let response = await fetch (verificationURL,{
        method: 'POST',
        body: new URLSearchParams(new FormData(formData)) ,
    });
    var result = await response.json();
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
    let formaData =  new FormData(phase2.querySelector("form"));
    formaData.append("username",getCurrentUser().username);
    formaData.append("userID",getCurrentUser().USER_ID)
    let DATA = new URLSearchParams(formaData);

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