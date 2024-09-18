/**
 * This function should be applied to home ,recnets,trash
 */
import IfrElements from '/scripts/lib/IfrElements.lib.js';

import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import pageURls from '/scripts/utils/pageURLs.js';

// Add this file to every iframe pages

function initializeGlobalEventListeners () {
    window.addEventListener("load",function(){
        more_();  
        handleAccountSettingsInteractions();
        hideAllSectionsExceptFirst();
        homeElementListener();
        
    });
    IfrElements.DoneBtn.forEach(function(e,i) {
        e.addEventListener('click',function (){
            IfrElements.toRedirect(0)
        })
    })
    
}
function handleAccountSettingsInteractions () {
    IfrElements.setting_items.forEach(function(e,i){
        e.addEventListener('click',function(){
            let elem = IfrElements.getClickedSection(e.getAttribute('attr'));
            switch (elem.className) {
                case "password-section":
                    //asks for old, new and confirm password
                    //then it should validate, then sent for confirmation
                    // processing , if success done, else fail
                    handleAllSectionInteraction(elem)
                    break;
                case "storage-section":
                    //asks for storage buying option it should contain a redirect page which shows the highly occupied files,blurred etc..

                    // handleAllSectionInteraction(elem);
                    break;
                case "phone-section":
                    handleAllSectionInteraction(elem);
                    //asks for mobile number,if valid number ,then sent for verifcation
                    //it should be load in meantime ,if success done, else fail
                    break;
                case "email-section":
                    handleAllSectionInteraction(elem);
                    //asks for email  valid email ,then sent for verifcation
                    //it should be load in meantime ,if success done, else fail
                    break;
                default:
                    break;
            }

        })
    })
 
}
//return the children of each section setting
function setEachSectionSetting (elem) {
    elem.style.setProperty("display",'flex');
    return {items:elem.children[0],verification:elem.children[1]};

}

function hideAllSectionsExceptFirst () {
    //1st one setting section omit it //email-1,phone-2,storage-3,paswword-4
    IfrElements.sections.forEach(function(e,i){
        if(i != 0) {
          e.style.setProperty('display','none');  
        }
    })
}
function handleAllSectionInteraction(elem) { //handlePasswordSectionInteraction
    hideAllSectionsExceptFirst();
    var {items,verification} = setEachSectionSetting(elem);

    // corresponding function goes from here
    IfrElements.disableDisplay([verification])
    IfrElements.enableDisplay([items])

    let verify_btn = items.querySelector(".verify-btn");
    verify_btn.onclick =()=>{
        IfrElements.disableDisplay([items])
        IfrElements.enableDisplay([verification])

        let processing,done,failed;
        processing = verification.querySelector(".verification-wrapper[attr=processing]");
        done = verification.querySelector(".verification-wrapper[attr=done]");
        failed = verification.querySelector(".verification-wrapper[attr=failed]");
        
        //intialize
        IfrElements.disableDisplay([done,failed]);

        //1st step processing
        IfrElements.enableDisplay([processing])
        
        setTimeout(function(){
            IfrElements.disableDisplay([processing]);
            //setp 2 done or failed

            IfrElements.enableDisplay([done])
        },1500)
    }  
}
function more_ () {
    var check = null;
    var ElementBtn;
    var Element;
    document.addEventListener("click",(e)=>{
        if(IfrElements.moreBtn.length > 0 ){
            if(e.target.className == IfrElements.moreBtn[1].className  ){
                ElementBtn = e.target;
                Element = e.target.nextSibling;
                if(Element.className == IfrElements.more[1].className) {
                    if(window.getComputedStyle(Element).display === "block"){
            
                        Element.style.display = "none";
                        // ElementBtn.style.setProperty('z-index',0)
                    }else {
                        IfrElements.more.forEach(function(element,i){
                            element.style.display = "none";
                        })
                        Element.style.display = "block";
                    }
                }

            }else{
                IfrElements.more.forEach((elem,i)=>{
                    elem.style.display = "none";
                })
            }
        }
    })
}
/**
 * The next page function is used to go next page whereas the last page is used to go back to last pages
 * cache compulsory
 * right cache planning is not decided yet - september 14
 */
function homeElementListener () {
   
    IfrElements.FolderBtn.forEach((elem)=>{
        elem.addEventListener("click",function(e){
            nextPage(elem)
        })
    })
    IfrElements.FileBtn.forEach((elem)=>{
        elem.addEventListener("click",function(){
            console.log( "clicked"+splitID(elem.id))
        })
    })
}
function nextPage (elem) {
    //srcdoc might impact performance
    // let sessionSotrage = new sessionStorage();
    let F_num;
    F_num = splitID(elem.id);

    let body ={
        F_num: F_num,
        
    }
    return new Promise((resolve,reject) =>{ 
        fetch(pageURls.home,{
            method:"POST",
            body : JSON.stringify(body),
            headers:
            {
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then( resp=> {
            return resp.text()
        }).then(html=>{
            //'data:text/html;charset=utf-8,' + encodeURI(html);
            console.log(html)
            let parser = new DOMParser();
            let newDoc = parser.parseFromString(html.toString(),'text/html');
            //get the main content
            document.body = newDoc.body;

                
        })
    })

}

function splitID(id) {
    id =  id.split("-");
    // if(id.length == 3) {
    //     //file
    //     return id[1] // anyway we need 
    // }else {
        //folder id
    return id[1];
    // }
    
}
function lastPage () {

}
try {
    initializeGlobalEventListeners();
  
	
}catch (e){
	console.log(e)
}