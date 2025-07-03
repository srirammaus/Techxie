/**
 * IfrPage - this means the pagination pages so dont include settings stuffs here
 * This function should be applied to home ,recents,trash
 * This is should maintain the page elements Interaction
 * Average Items should be listned per page should be 50 , you have to add load more button somewhere else
 */
import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';
import * as IfrPageFuncLib from '/scripts/lib/Ifrlib/IfrPageFunc.lib.js';
import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import pageURls from '/scripts/utils/pageURLs.js';

import * as  IfrPage_1 from "/scripts/pages/Ifr/IfrPage-1.js";
import * as  IfrPage_2 from "/scripts/pages/Ifr/IfrPage-2.js";
import apiConfig from '/scripts/utils/apiConfig.js';

// Add this file to every iframe pages

function initializeGlobalEventListeners () {
    window.addEventListener("load",function(){
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


function more_(Element){
        console.log(Element)
        Element = Element.nextElementSibling

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
function moreItemListeners (elem) {
        //more having three elements they are info,delete , copy
        console.log(elem)
        elem = elem.nextElementSibling;
        console.log(elem)

        //copy 
        
        Array.from(elem.children).forEach(function(element,i) {
            element.addEventListener("click",function(e){
                if(elem.children[i].contains(e.target) ) {
                    switch (i) {
                        case 0:
                            //delete
                            //you have to make a check here dont forget put it later , may be there may nnot be a cokie
                            // if there any erroo ,then it pases to next page ,while clikcing delete
                            let username = document.cookie.split(";")[0]
                            let userID = document.cookie.split(";")[1]
                            let Fo_id = elem.parentElement.getAttribute("Fo_id");
                            let f_id = elem.parentElement.getAttribute("f_id")
                            if(Fo_id != null || Fo_id != undefined) {
                                let F_num = Fo_id.split("-")[1]
                                username  =  username.substring(9).trim()
                                userID = userID.substring(8).trim()
                                let body = {
                                    userID: userID,
                                    username: username,
                                    F_num:F_num,

                                }
                                console.log("the F_num is " + F_num)
                                IfrPageFuncLib.delFolder (apiConfig.delFolder,body).then((result)=>{
                                    let body_ = {
                                        F_num: IfrPageFuncLib.getCurrentFolder()
                                    }
                                    loadFrame("home",body_)
                                })
                            }else {
                                //For file deletion
                                username  =  username.substring(9).trim()
                                userID = userID.substring(8).trim()
                                let body = {
                                    userID:userID,
                                    username:username,
                                    f_id:f_id,
                                }
                                IfrPageFuncLib.delFile(apiConfig.delFile,body).then((result) =>{
                                    let body_ = {
                                        F_num: IfrPageFuncLib.getCurrentFolder()
                                    }
                                    loadFrame("home",body_)

                                })
                            }
           
                            break;
                        case 1: 
                            //copy
                            break;
                        case 2: 
                            //info
                            // IfrPageFuncLib.
                            break;
                        default:
                            break;
                    }
                }
                e.stopPropagation();

            })
        })

}
function moreItemsContentListeners (){
    if(mainPopBox.children.length >0 ){
        mainPopBox.querySelector(".close").addEventListener("click",(e)=>{
            mainPopBox.style.top = "-100%";
        })
        // mainPopBox.querySelector(".")
    }
    
}
/**
 * The next page function is used to go next page whereas the last page is used to go back to last pages
 * cache compulsory
 * right cache planning is not decided yet - september 14
 */
function homeElementListener () {
    let mainPopBox = IfrElements.mainPopBox;
    

    IfrElements.FolderBtn().forEach((elem)=>{
        elem.addEventListener("click",function(e){
            IfrPageFuncLib.cachePage(IfrPageFuncLib.getCurrentFolder())
            nextPage(elem)
        })
    })
    IfrElements.FileBtn().forEach((elem)=>{
        elem.addEventListener("click",function(){
            console.log( "clicked"+splitID(elem.id))
        })
    })
    IfrElements.moreBtn().forEach((elem)=>{
        elem.addEventListener("click",function(e){
            more_(elem)
            e.stopPropagation();
            moreItemListeners(elem);
        })
    
    })

}
function nextPage (elem) {
    //srcdoc might impact performance
    // let sessionSotrage = new sessionStorage();
    let F_num;
    F_num = IfrPageFuncLib.splitID(elem.id);
    IfrPageFuncLib.pageTracker_(F_num,IfrPageFuncLib.getCurrentFolder())

    IfrPageFuncLib.setParentFolder(IfrPageFuncLib.getCurrentFolder())  
    IfrPageFuncLib.setCurrentFolder(F_num)
   
    let body ={
        F_num: F_num,
        
    }
    //This hom is actaully pagination, this will be rendered by server 
    loadFrame("home",body)


} 

function loadFrame (page,body,method = "POST") {
    IfrPageFuncLib.fetchIfrPageFromIfr(pageURls[page],body,method).then((Ifr)=>{
    })
}
function HandleViewerport () {
	try {
	    if(IfrPageFuncLib.WindowLimit.matches){
	    	console.log("change 1")
	        new IfrPage_1.IfrPage();
	    }else {
	        console.log("changed 2")
	        new IfrPage_2.IfrPage();
	    }    
	}catch (err) {
		console.log(err);
	}
}





IfrPageFuncLib.WindowLimit.addEventListener("change",function(event){
    HandleViewerport();
})
//Good idea , but whike implementing ou have put all the function inalso doument.click
// function more_ () {
//     var check = null;
//     var ElementBtn;
//     var Element;
//     // document.removeEventListener("click",handler,true)
//     document.addEventListener("click",handler,true);
//     function handler (e) {
//         console.log(e.target)
//         e.stopPropagation();
//         if(IfrElements.moreBtn.length > 0 ){
//             if(e.target.className == IfrElements.moreBtn[1].className  ){
//                 ElementBtn = e.target;
//                 Element = e.target.nextSibling;
//                 if(Element.className == IfrElements.more[1].className) {
//                     if(window.getComputedStyle(Element).display === "block"){
            
//                         Element.style.display = "none";
//                         // ElementBtn.style.setProperty('z-index',0)
//                     }else {
//                         IfrElements.more.forEach(function(element,i){
//                             element.style.display = "none";
//                         })
//                         Element.style.display = "block";
//                     }
//                 }

//             }else{
//                 IfrElements.more.forEach((elem,i)=>{
//                     elem.style.display = "none";
//                 })
//             }
//         }
//     }

// }
//This below function in load , now i comment it
// function ifrProcessDimension () { // lib //I think no need of it
//     try {
//         const WindowLimit = parent.matchMedia("(min-width:800px)");
        
//        // or use switch state for multiple media query

//         if(WindowLimit.matches){
//             IfrElements.iframe_ ().then(function(elem) {	
//                 if(elem[0] == true) {
//                     ///
//                     elem[2].body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
//                 }
//             })
//         }else{

//             IfrElements.iframe_ ().then(function(elem) {	
//                 if(elem[0] === true){
//                     elem[2].body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
//                 }
//             })
//         }

//     }catch(err) {
//         console.error(err)
//     }

// }

try {
    HandleViewerport();  //dont put this inside window.onload becuase it already contains window.onload
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