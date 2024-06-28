import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';

import * as webdrive_1 from "/scripts/pages/WebDrive-1.js";
import * as webdrive_2 from "/scripts/pages/WebDrive-2.js";
import Elements from '/scripts/lib/Elements.js';
/**
 * 1.event listner[all in order]
 * 2.corresponding fuctions[all in order]
 */
function GeneralEventListeners(){
	Elements.search_bar_input.addEventListener('focus',()=>{
		Elements.search_dropdown.style.display = 'block'
	})
	Elements.search_bar_input.addEventListener('focusout',()=>{
		Elements.search_dropdown.style.display = "none"
	})


}

function sideNav () {
	Elements.profile.addEventListener('click',()=>{
		if(window.innerWidth < 800 ){
			Elements.nav_drawer.style.width = '100%';
		}
	});
	Elements.nav_drawer_close.addEventListener('click',() =>{
		if(window.innerWidth < 800 ){
			Elements.nav_drawer.style.width = "0px";
		}

	});
    let item;
    let nav_items_children = Elements.nav_items.children;
    for(let i in nav_items_children) {
        item  = nav_items_children[i];
        console.log(i)
        item.addEventListener('click',function(){
            // i = i === 3? 3-1:i; 
            
            Elements.toRedirectIfr(i ==3?0:i);  
            Elements.iframe_element.onload = () =>{
               loadFrame();
            //    FrameListeners();
            }
        })
        if(i==3) break;
        
    }

}
function loadFrame () {
    if(window.innerWidth > 800) {
        webdrive_1.WebDrive.iframe_()
    }else{
        webdrive_2.WebDrive.iframe_();
        Elements.nav_drawer.style.width = "0%";
    }

}

function MoveBack() {
//for mobile page-btn, for desktop back btn

}
function MoveFront() { //This feature not available for Desktop

}
try {
	GeneralEventListeners();
	sideNav();
	
}catch (e){
	console.log(e)
}
// function FrameListeners() {
//     if(document.readyState != "complete" ){
//         window.addEventListener("load",function(){
//             more_();  
//         })
//     }else{
//         more_();   
//     }

// }
// function more_ () { //later add this to iframe page
//     Elements.iframe_ ().then(function(elem) {	
//         if(elem[0] === true){


//             var check = null;
//             var ElementBtn;
//             var Element;
//             var more =elem[2].querySelectorAll(".small-frame-items div[data='more-box'] div[attr='pop-box']");
//             var moreBtn = elem[2].querySelectorAll(".mdi-dots-vertical"); //.small-frame-items div[data='more-btn']
//             Elements.iframe.contentWindow.addEventListener("click",(e)=>{
    
//                 if(e.target.className == moreBtn[1].className  ){
//                     ElementBtn = e.target;
//                     Element = e.target.nextSibling;
//                     if(Element.className == more[1].className) {
//                         if(elem[1].contentWindow.getComputedStyle(Element).display === "block"){
                
//                             Element.style.display = "none";
//                             // ElementBtn.style.setProperty('z-index',0)
//                         }else {
//                             more.forEach(function(element,i){
//                                 element.style.display = "none";
//                             })
//                             Element.style.display = "block";
//                         }
//                     }
    
//                 }else{
//                     more.forEach((elem,i)=>{
//                         elem.style.display = "none";
//                     })
//                 }
//             })
//         }    
    
    
    
//     })
    
// }
