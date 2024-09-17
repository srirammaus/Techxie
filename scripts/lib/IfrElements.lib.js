//DOM raising voilation we are not putting the  new passwor din the form fiel , "auto-complete attr have some feture new-password, current-password, cc ,csc"
import apiConfig from "/scripts/utils/apiConfig.js";
export default class IfrElements {
    static FILE = ["settings","Trash","Recents","Home"];
	static URL = apiConfig.baseURL;
	static extension = ".html";

    static more =document.querySelectorAll(".small-frame-items div[data='more-box'] div[attr='pop-box']");
    static moreBtn = document.querySelectorAll(".mdi-dots-vertical"); //.small-frame-items div[data='more-btn']
    static setting_items = document.querySelectorAll(".settings-item");
    static sections = document.querySelectorAll(".settings > section[class $='-section']");
    static DoneBtn = document.querySelectorAll(".Done-btn")
    static mainPopBox = document.getElementById("mainPopBox");
    static FolderBtn = document.querySelectorAll(".small-Folder");
    static FileBtn = document.querySelectorAll(".small-File");

    static getClickedSection (attr) {
        let elem = document.querySelector(`.settings > section[class=${attr}` );
        return elem;
    }
    static getStyles(elem) {
        return window.getComputedStyle(elem);
    }
    static getChildren (elem){
        return elem.children;
    }
    static enableDisplay (elemArray){ //type array //display type flex
        if(Array.isArray(elemArray) === false){
            throw new Error("Invalid Parameter passed")
        }else{
            elemArray.forEach(element => {
                element?.style.setProperty("display","flex");
            });
        }
        
    }
    static disableDisplay (elemArray){ //type array
        if(Array.isArray(elemArray)=== false){
            throw new Error("Invalid Parameter passed")
        }else{
            
            elemArray.forEach(element => {
                element?.style.setProperty("display","none");
            });
        }
        
    }
    static getParent() {
        let parent = window.parent;
        return parent
    }
    static getParentIfr () {
        return this.getParent().document.getElementById("iframe-doc");
    }
    static iframe_() {
		return new Promise((resolve,reject) => {

			//this should be under window.onload or iframe.onload
			// var iframe_small_frame_items = iframeDocument.querySelector('.small-frame-items'); //For trash and Recents
			// var iframe_settings = iframeDocument.querySelector('.settings');

			var iframe = this.getParent().document.getElementById("iframe-doc");
			var iframeDocument = iframe.contentWindow.document;
			
			this.iframe = iframe;
			
			this.iframeDocument = iframeDocument;

			
			function default_() {

				this.iframe.addEventListener('load',()=>{
					this.iframe_();
				})
				console.log("failed 1")

			}
			default_ = default_.bind(this)
			if(this.isValidIfr()){

				if(this.iframeDocument.readyState == 'complete'){
					console.log(this.isIframeNotEmpty() + "This");
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
		if(this.iframeDocument.body.children.length === 0 ){
			return false;
		}			
		return true;
		
	}
    static toRedirect (val) {
        //check for cacheed page
        return window.location.href = this.FILE[val] //+ this.extension
    }
    static toReload () {

    }
}