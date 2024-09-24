/**
 * For below 800
 * get limit from parent elase the default should be 800
 */
import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';

export class IfrPage {
    constructor () {

        this.Onload();
        this.OnResize();
    }
    Onload(){

        window.addEventListener("load",()=>{
            this.loadElements();
            IfrPage.IfrProcessDimension();

        })
    
    }
    OnResize() {
        try {
            //getting parent else default
            IfrElements.getParent().addEventListener('resize',()=>{
                if(window.innerWidth > 800) {
                    IfrPage.IfrProcessDimension();
                }
            })
        }
        catch(err){
            window.addEventListener('resize',()=>{
                if(window.innerWidth > 800) {
                    IfrPage.IfrProcessDimension();
                }
            })
        }
      
    }
    /**
     * This function should be used to add styles to certain elements
     */
    loadElements(){
        
    }
    static IfrProcessDimension(){
        //setting body height
        IfrElements.body().style.setProperty("overflow-y","hidden")
        IfrElements.body().style.setProperty('height',(100/100 * window.screen.height) +'px');
        IfrElements.small_frame_items.style.setProperty("height","85%")
    }
}