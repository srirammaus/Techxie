//DOM raising voilation we are not putting the  new passwor din the form fiel , "auto-complete attr have some feture new-password, current-password, cc ,csc"
export default class IfrElements {
    static FILE = ["settings","Trash","Recents","Home"];
	static URL = "http://techxie.local:3000/"
	static extension = ".html";

    static more =document.querySelectorAll(".small-frame-items div[data='more-box'] div[attr='pop-box']");
    static moreBtn = document.querySelectorAll(".mdi-dots-vertical"); //.small-frame-items div[data='more-btn']
    static setting_items = document.querySelectorAll(".settings-item");
    static sections = document.querySelectorAll(".settings > section[class $='-section']");
    static DoneBtn = document.querySelectorAll(".Done-btn")
    static mainPopBox = document.getElementById("mainPopBox");

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
    static toRedirect (val) {
        //check for cacheed page
        return window.location.href = this.FILE[val] + this.extension
    }
    static toReload () {

    }
}