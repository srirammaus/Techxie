import IfrElements from '/scripts/lib/IfrElements.js';
import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';

// Add this file to every iframe pages

function GeneralEventListeners () {
    window.addEventListener("load",function(){
        more_();  
        AccountSetting();
        defaultSectionSetting();
    });
    IfrElements.DoneBtn.forEach(function(e,i) {
        e.addEventListener('click',function (){
            IfrElements.toRedirect(0)
        })
    })
    
}
function AccountSetting () {
    IfrElements.setting_items.forEach(function(e,i){
        e.addEventListener('click',function(){
            let elem = IfrElements.getClickedSection(e.getAttribute('attr'));
            switch (elem.className) {
                case "password-section":
                    //asks for old, new and confirm password
                    //then it should validate, then sent for confirmation
                    // processing , if success done, else fail


                    defaultSectionSetting();
                    var {items,verification} = setEachSectionSetting(elem);
                  
                    // corresponding function goes from here
                    verification.style.setProperty("display","none");
                    items.style.setProperty("display","flex");

                    break;
                case "storage-section":
                    //asks for storage buying option it should contain a redirect page which shows the highly occupied files,blurred etc..

                    defaultSectionSetting();
                    var {items,verification} = setEachSectionSetting(elem);
                    break;
                case "phone-section":
                    defaultSectionSetting();
                    var {items,verification} = setEachSectionSetting(elem);
                    //asks for mobile number,if valid number ,then sent for verifcation
                    //it should be load in meantime ,if success done, else fail
                    break;
                case "email-section":
                    defaultSectionSetting();
                    var {items,verification} = setEachSectionSetting(elem);
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

function defaultSectionSetting () {
    //1st one setting section omit it //email-1,phone-2,storage-3,paswword-4
    IfrElements.sections.forEach(function(e,i){
        if(i != 0) {
          e.style.setProperty('display','none');  
        }
    })
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

try {
    GeneralEventListeners();
	
}catch (e){
	console.log(e)
}