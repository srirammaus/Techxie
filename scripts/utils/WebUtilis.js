var search_dropdown = document.querySelector('.search-dropdown');
var search_bar_input = document.querySelector('.search-bar .wrapper input');
var nav_drawer = document.querySelector('.nav-drawer');
var nav_drawer_close = document.querySelector('.nav-profile-container[attr="cont-3"] ');
var nav_items = document.querySelector(".nav-items");
var profile  = document.querySelector('.profile');
var folder_map = document.querySelector('.Folder-map');
// var iframe = document.getElementById("iframe-doc");
// var iframeDocument = iframe.contentWindow.document;

const FILE = ["Home","Recents","settings"];
const URL = "http://techxie.local:3000/"
const extension = ".html";

function GeneralEventListeners(){
	search_bar_input.addEventListener('focus',()=>{
		search_dropdown.style.display = 'block'
	})
	search_bar_input.addEventListener('focusout',()=>{
		search_dropdown.style.display = "none"
	})
	// window.addEventListener("click",)


}

function sideNav () {
	profile.addEventListener('click',()=>{
		if(window.innerWidth < 800 ){
			nav_drawer.style.width = '100%';
		}
	});
	nav_drawer_close.addEventListener('click',() =>{
		if(window.innerWidth < 800 ){
			nav_drawer.style.width = "0px";
		}

	});
}
//if click pop box shoud open and if anyother opp open it should be close
// if window click , nothing should be there and it should be if (!...)
function more_(iframe ,iframeDocument) {
	var check = null;
	var ElementBtn;
	var Element;
	var more = iframeDocument.querySelectorAll(".small-frame-items div[data='more-box'] div[attr='pop-box']");
	var moreBtn = iframeDocument.querySelectorAll(".mdi-dots-vertical"); //.small-frame-items div[data='more-btn']
	iframe.contentWindow.addEventListener("click",(e)=>{

		if(e.target.className == moreBtn[1].className  ){
			ElementBtn = e.target;
			Element = e.target.nextSibling;
			if(Element.className == more[1].className) {
				if(iframe.contentWindow.getComputedStyle(Element).display === "block"){
		
					Element.style.display = "none";
					// ElementBtn.style.setProperty('z-index',0)
				}else {
					more.forEach(function(element,i){
						element.style.display = "none";
						// ElementBtn.style.setProperty('z-index',0)
					})
					Element.style.display = "block";
					// ElementBtn.style.setProperty('z-index',99)
				}
			}

		}else{
			more.forEach((elem,i)=>{
				elem.style.display = "none";
			})
		}
	})
	
}
//listners are not adding because of loading issue

function iframe_ () {
	var iframe = document.getElementById("iframe-doc");
	var iframeDocument = iframe.contentWindow.document;
	function default_ (){
		iframe.addEventListener('load',()=>{
			iframe_();
		})

	}
	if(isValidIfr(iframe ,iframeDocument)){
		if(iframeDocument.readyState == 'complete'){

			if(isIframeNotEmpty(iframeDocument)){
				more_(iframe ,iframeDocument)
			}else{

				default_()
			}
		}else{
			iframe.contentWindow.addEventListener("load",()=>{
				if(isIframeNotEmpty(iframeDocument)){
					more_(iframe ,iframeDocument)
				}else{

					default_()
				}
			})
		}
		
	}else{
		throw new Error("something went wrong")
	}
}

function isValidIfr (iframe ,iframeDocument) {

	if(!iframe || !iframeDocument){

		return false;
	}
	return true;
}
function isIframeNotEmpty(iframeDocument) {
	if(iframeDocument.body.children.length === 0 ){

		return false;
	}			
	return true;
	
} 
try {
	GeneralEventListeners();
	sideNav();
	iframe_();
}catch (e){
	console.log(e)
}

