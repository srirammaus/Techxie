/**
 * This js is completely for setting setction
 */
import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';
import settings from "/scripts/lib/Ifrlib/settings.lib.js";
import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import pageURls from '/scripts/utils/pageURLs.js';
import apiConfig from '/scripts/utils/apiConfig.js';
import Func from "/scripts/lib/Function.js"

class IfrSettingsFunc {
    constructor (){
        let processing,done,failed;

        this.processing = processing;
        this.done = done;
        this.failed = failed;

        this.OnLoad();
        this.OnResize();
    }
    OnLoad (){
        /**
         * Onload Event Listners
         */
        window.addEventListener("load",()=>{
            settings.loadStyle();
            this.hideAllSectionsExceptFirst();
            this.handleAccountSettingsInteractions(); 
        });
    }
    OnResize () {
        /**
         * Resize Event Listners
         */
        window.addEventListener("resize",()=>{
            settings.loadStyle();
        })
    }
    /***
     * @param password
     * asks for old, new and confirm password
     * then it should validate, then sent for confirmation
     * processing , if success done, else fail

    *  @param storage
    *  asks for storage buying option it should contain a redirect page which shows the highly occupied files,blurred etc..

    *  @param phone
    * asks for mobile number,if valid number ,then sent for verifcation
    * it should be load in meantime ,if success done, else fail
    *  @param email
    * 
    * asks for email  valid email ,then sent for verifcation
    * it should be load in meantime ,if success done, else fail
    */
    handleAccountSettingsInteractions () {
        IfrElements.setting_items.forEach((e,i)=>{
            e.addEventListener('click',()=>{
                let elem = IfrElements.getClickedSection(e.getAttribute('attr'));
                switch (elem.className) {
                    case "password-section":
                        const {items,verification} = this.handleAllSectionInteraction(elem)
                        this.handlePasswordSectionInteraction(items,verification)
                        break;
                    case "storage-section":
                        // this.handleAllSectionInteraction(elem);
                        break;
                    case "phone-section":
                        this.handleAllSectionInteraction(elem);
                        break;
                    case "email-section":
                        this.handleAllSectionInteraction(elem);
                        break;
                    default:
                        break;
                }

            })
        })
        
    }
    /**
     * return the children of each section setting
     * */

    setEachSectionSetting (elem) {
        elem.style.setProperty("display",'flex');
        return {items:elem.children[0],verification:elem.children[1]};

    }
    /**
     * 1st one setting section omit it  || email-1,phone-2,storage-3,paswword-4
     */
    hideAllSectionsExceptFirst () {

        IfrElements.sections.forEach((e,i)=>{
            if(i != 0) {
                e.style.setProperty('display','none');  
            }
        })
    }
    handleAllSectionInteraction(elem) { //handlePasswordSectionInteraction
        this.hideAllSectionsExceptFirst();
        var {items,verification} = this.setEachSectionSetting(elem);
    
        // corresponding function goes from here
        IfrElements.disableDisplay([verification])
        IfrElements.enableDisplay([items])
        this.processing = verification.querySelector(".verification-wrapper[attr=processing]");
        this.done = verification.querySelector(".verification-wrapper[attr=done]");
        this.failed = verification.querySelector(".verification-wrapper[attr=failed]");
        return {items:items,verification:verification};
        
        
        // let verify_btn = items.querySelector(".verify-btn");
        // verify_btn.onclick =()=>{
        //     IfrElements.disableDisplay([items])
        //     IfrElements.enableDisplay([verification])
    
        //     let processing,done,failed;
      
            
        //     //intialize
        //     IfrElements.disableDisplay([done,failed]);
    
        //     //1st step processing
        //     IfrElements.enableDisplay([processing])
            
        //     setTimeout(function(){
        //         IfrElements.disableDisplay([processing]);
        //         //setp 2 done or failed
    
        //         IfrElements.enableDisplay([done])
        //     },1500)
        // }  
    }
    /**
     * 
     * @param {It contains the 1st element of the clicked section} items 
     * @param {It contains the verification process, contains done, failed, processing} verification 
     * Invalid parameter and unsame pwd in new pass and confirm pass only display in input under field   
    */
    handlePasswordSectionInteraction (items,verification) {
        let verify_btn = items.querySelector(".verify-btn");
        let promptMsg = items.querySelector(".prompt-message");

        verify_btn.onclick =()=>{
            promptMsg.style.display = "none";
            let currentPass = items.querySelector("input[name='currentpassword']").value
            let newPass = items.querySelector("input[name='newpassword']").value;
            let confirmPass = items.querySelector("input[name='confirmpassword']").value
          

            let filteredInputs = Func.filter ([currentPass,newPass,confirmPass])
            if(Array.isArray(filteredInputs) ){
                if(newPass != confirmPass){
                    promptMsg.style.display = "inline-flex";
                    promptMsg.innerHTML = "Password Mismatched"
                }else {
                IfrElements.disableDisplay([items])
                IfrElements.enableDisplay([verification])

                //intialize
                IfrElements.disableDisplay([this.done,this.failed]);

                //1st step processing view
                IfrElements.enableDisplay([this.processing])
                settings.changePwd(filteredInputs[0],filteredInputs[1],filteredInputs[2]).then(response =>{
                    //if success done should be displayed
                    if(response?.status == 1) {
                        IfrElements.disableDisplay([this.processing]);
                        IfrElements.enableDisplay([this.done])
                    }else {
                        IfrElements.disableDisplay([this.processing]);
                        IfrElements.enableDisplay([this.failed])
                    }
                }).catch(err=>{
                    console.log(err)
                    IfrElements.disableDisplay([this.processing]);
                    IfrElements.enableDisplay([this.failed])
                })

                }
            }else {
                promptMsg.style.display = "inline-flex";
                promptMsg.innerHTML = "*Invalid parmeter"
            }
            
        }
          

    }
    handleChangeEmail(items,verification) {

    }
    handleChangeNumber (items,verification) {

    }
    handleStorage () {
        
    }
    
}
new IfrSettingsFunc();



