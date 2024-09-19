/**
 * IfrPage - this means the pagination pages so dont include settings stuffs here
 * This function should be applied to home ,recents,trash
 * This is should maintain the page elements Interaction
 */
import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';
import * as IfrPageFuncLib from '/scripts/lib/Ifrlib/IfrPageFunc.lib.js';
import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import pageURls from '/scripts/utils/pageURLs.js';

// Add this file to every iframe pages

function initializeGlobalEventListeners () {
    window.addEventListener("load",function(){
        
        more_();  //This function call should only in window.onload because it works on document.onclick(..) ,so here
        homeElementListener();  //This can be any anywhere because of btn
    });
    IfrElements.DoneBtn.forEach(function(e,i) {
        e.addEventListener('click',function (){
            IfrElements.toRedirect(0)
        })
    })
    IfrElements.getParent().addEventListener("resize",function(){

    })
    
}


function more_ () {
    var check = null;
    var ElementBtn;
    var Element;
    // document.removeEventListener("click",handler,true)
    document.addEventListener("click",handler,true);
    function handler (e) {
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
    }

}

/**
 * The next page function is used to go next page whereas the last page is used to go back to last pages
 * cache compulsory
 * right cache planning is not decided yet - september 14
 */
function homeElementListener () {
   console.log("I ran")
    IfrElements.FolderBtn().forEach((elem)=>{
        console.log("i ran folder")
        elem.addEventListener("click",function(e){
            nextPage(elem)
        })
    })
    IfrElements.FileBtn().forEach((elem)=>{
        elem.addEventListener("click",function(){
            console.log( "clicked"+splitID(elem.id))
        })
    })
}
function nextPage (elem) {
    //srcdoc might impact performance
    // let sessionSotrage = new sessionStorage();
    let F_num;
    F_num = IfrPageFuncLib.splitID(elem.id);

    let body ={
        F_num: F_num,
        
    }
    IfrPageFuncLib.fetchPage(pageURls.home,body).then((newDoc)=>{

        document.body = newDoc.body;
        IfrPageFuncLib.ifrProcessDimension();
        let FolderBtn = document.querySelectorAll(".small-Folder");
        homeElementListener();
            
    
    })


}

function lastPage () {

}
try {
    initializeGlobalEventListeners();
  
	
}catch (e){
	console.log(e)
}

// function splitID(id) {
//     id =  id.split("-");
//     if(id.length == 3) {
//         //file
//         return id[1] // anyway we need 
//     }else {
//        //folder 
//         return id[1];
//     }
    
// }