/**
 * This applicable for webdrive only to maintain the interation between the UI and their function , the function's respected algorithm should be written in webdrive.lib
 */
import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
import * as webdrive_1 from "/scripts/pages/WebDrive-1.js";
import * as webdrive_2 from "/scripts/pages/WebDrive-2.js";
import pageURLs from "/scripts/utils/pageURLs.js";
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import Elements from '/scripts/lib/Elements.lib.js';

/**
 * 1.event listner[all in order]
 * 2.corresponding fuctions[all in order]
 */
function GeneralEventListeners(){
	Elements.search_bar_input.addEventListener('focus',()=>{
		Elements.search_dropdown.style.display = 'block'
	})

    Elements.search_bar_input.addEventListener('focusout',()=>{
        setTimeout(function(){
            Elements.search_dropdown.style.display = "none"
        },100)
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
        console.log(item)
        item.addEventListener('click',function(event){
            // console.log(i)
            // Elements.toRedirectIfr(i ==3?0:i);  
            // Elements.iframe_element.onload = () =>{
                loadFrameContent(i)
            // }
        })
        if(i==3) break;
        
    }

}
function loadFrameContent (elemId) {
    switch (elemId) {
        case "0":
        case 0 : //"settings"
            loadFrame("settings",Elements.bodyParams,"GET");
            break;
        case "1":
        case 1: // "Trash" 
            loadFrame("Trash",Elements.bodyParams,"POST");
            break;
        case "2":
        case 2: //"Recents"
            loadFrame("Recents",Elements.bodyParams,"POST");
            break;
        case "3":
        case 3:  //storage
            loadFrame("Trash",Elements.bodyParams,"POST");
            break;

        default  : //"home"
            break;
    }

}
function loadFrame (page,body,method) {
    Weblib.fetchIfrPage(Elements.iframe_element,pageURLs[page],method,body).then((ifr) => {

    })  

}
function updateSearchValue () {
    Elements.search_suggestion.forEach(element => {
        element.onclick = () =>{
            Elements.search_bar_input.value = element.querySelector("a")?.innerHTML;
        }
        element.onmouseover = ()=>{
            Elements.search_bar_input.value = element.querySelector("a")?.innerHTML
        }
    });
}

function MoveBack() {
//for mobile page-btn, for desktop back btn

}
function MoveFront() { //This feature not available for Desktop

}
try {
	GeneralEventListeners();
    updateSearchValue();
	sideNav();
	
}catch (e){
	console.log(e)
}
// cached [pagination also]
// cookies
// session management
// system design 
// essential javascript's in javascript.info
// Functions

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
