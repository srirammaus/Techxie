import apiConfig from "/scripts/utils/apiConfig.js";
export default class Elements {
	static FILE = ["settings","Trash","Recents","home"];
	static URL = apiConfig.baseURL;
	static extension = ".html";

	static iframe_element = document.getElementById("iframe-doc"); //not use
    static header_= document.querySelector('.header')
    static header_container = document.querySelector('.header > .header-container');
    static search_dropdown = document.querySelector('.search-dropdown');
    static search_bar_input = document.querySelector('.search-bar .wrapper input');
    static search_suggestion = document.querySelectorAll('.search-suggestion')
	static nav_drawer = document.querySelector('.nav-drawer');
    static nav_drawer_close = document.querySelector('.nav-profile-container[attr="cont-3"] ');
    static nav_items = document.querySelector(".nav-items");
    static profile  = document.querySelector('.profile');
    static folder_map = document.querySelector('.Folder-map');
    static main = document.querySelector('.main');
    static Recents = document.querySelector('.nav-item[attr=Recents]')
	static Trash = document.querySelector('.nav-item[attr=Trash]')
	static Account_settings= document.querySelector('.nav-item[attr=Account-settings]')
    static folder_wrapper = document.querySelector('.Folder-wrapper > div > a');
	static homeIcon = document.getElementById("home-icon");
	

	constructor() {
		let gifr;
		this.gifr = gifr;
	}
	/**
	 * 
	 * @returns 
	 * How to to use this iframe_
	 * Elements.iframe_(ifr).then()...
	 */

	static iframe_(ifr = null) {
		return new Promise((resolve,reject) => {

			//this should be under window.onload or iframe.onload
			// var iframe_small_frame_items = iframeDocument.querySelector('.small-frame-items'); //For trash and Recents
			// var iframe_settings = iframeDocument.querySelector('.settings');
			
			console.log(ifr)
			var iframe = ifr == null? document.getElementById("iframe-doc") : ifr ;
			var iframeDocument = iframe.contentWindow.document;
			
			this.iframe = iframe;
			
			this.iframeDocument = iframeDocument;

			
			function default_() {

				this.iframe.addEventListener('load',()=>{
					this.iframe_(ifr);
				})
				console.log("failed 1")

			}
			default_ = default_.bind(this)
			if(this.isValidIfr()){

				if(this.iframeDocument.readyState == 'complete'){
					// console.log(this.isIframeNotEmpty() + "This");
					if(this.isIframeNotEmpty() == true ){	//&& iframeDocument.location.href == iframe.src because we ae using
						this.setCurrentIfr(this.iframe);		
						console.log("failed 2")
						resolve([true,this.iframe,this.iframeDocument])
			
						

					}else{
						console.log("failed 4")
						default_()
				

					}
				}else {
			
					
					this.iframe.contentWindow.addEventListener("load", () =>{
						if(this.isIframeNotEmpty()){
							this.setCurrentIfr(this.iframe);
								resolve([true,this.iframe,this.iframeDocument]);

						}else{
							default_()
						}

					})
				}

			}else{

				console.log("failed 3")
				default_()
			
			}
		}) 


	}
	static setCurrentIfr (ifr_value) {
		this.gifr = ifr_value;
	}
	static getCurrentIfr () {
		return this.gifr;
	}
	static isValidIfr () {

		if(!this.iframe || !this.iframeDocument){

			return false;
		}
		return true;
	}
	static isIframeNotEmpty() {
		console.log(this.iframeDocument.body)
		if(this.iframeDocument.body.children.length === 0 ){
			return false;
		}			
		return true;
		
	}
	
	static toRedirect (val) {
		window.location.href= this.FILE[val] + this.extension
	}
	static toRedirectIfr (val) {
		this.iframe_element.src = this.FILE[val] + this.extension
		// ifr.contentWindow.location.href = this.FILE[val] + this.extension
	}
	static toReloadIfr(ifr) {
		ifr.contentWindow.location.reload()
	}

    
}

