

const Elementsetting_1= {

    header: document.querySelector(".navigation .tools"),//not happen to resize
    side_nav_main:document.querySelector(".main .side-nav"),
    side_nav:document.querySelector('.main .side-nav .thumbnails'),
    pdf_viewer:document.querySelector('.main .maindoc'),
    main:document.querySelector('.main'),
    dropdown:document.querySelector('.tools .seperator .dropdown'),
    dropdown_content:document.querySelector('.seperator .dropdown .dropdown-content'),
    default :function (){
        // let min_dropdown_content_height = 15.9993489583/100 * (this.height/ 2) 
        // this.min_dropdown_content_height = min_dropdown_content_height + "px";

    
    },
    create : function(){


        let header_height = window.innerWidth > window.innerHeight?  15/100 * this.sr_height: 15/100 *this.sr_height;
        let pdf_viewer_height= window.innerWidth > window.innerHeight? 85/100 *this.height:85/100 *this.height;
        let side_nav_height = window.innerWidth > window.innerHeight? 85/100 * this.height :85/100 *this.height;
        let side_nav_main_width = 25 /100 * this.sr_width;
        let dropdown_width = 7 /100 * this.width;

        this.header_height = header_height+ "px";
        this.side_nav_height =side_nav_height+ "px";
        this.pdf_viewer_height= pdf_viewer_height+ "px";
        this.dropdown_width = dropdown_width+ "px";
        this.side_nav_main_width = side_nav_main_width + "px";

        // this.min_dropdown_width = min_dropdown_width + "px";
        
    },
    set : function(){
    
        this.header.style.height = this.header_height 
        this.main.style.paddingTop = this.header_height 
        this.pdf_viewer.style.height = this.pdf_viewer_height 
        this.side_nav.style.height = this.side_nav_height
        this.dropdown.style.width = this.dropdown_width 
        this.dropdown_content.style.minHeight = this.min_dropdown_content_height;
        this.side_nav_main.style.width = this.side_nav_main_width;
    },

    resize: function(){
        window.addEventListener('resize',()=>{
            if(window.innerWidth > 800 ){
           
                this.height = window.innerHeight;
                this.width = window.innerWidth;

                this.create()
                this.set()
            }            
        })
    },
    init:function(){
        height = window.innerHeight
        width = window.innerWidth

        sr_width = window.screen.width
        sr_height =window.screen.height

        this.height = height;
        this.width = width ;
        this.sr_width = sr_width;
        this.sr_height = sr_height;
        
        this.default();
        this.create();
        this.set();
        this.resize()
    },
    print(){
       console.log( this.header_height)
    }
}
//for mobile application
const Elementsetting_2= {


    header: document.querySelector(".navigation .tools"),
    side_nav:document.querySelector('.main .side-nav .thumbnails'),
    pdf_viewer:document.querySelector('.main .maindoc'),
    main:document.querySelector('.main'),
    dropdown:document.querySelector('.tools .seperator .dropdown'),
    dropdown_content:document.querySelector('.seperator .dropdown .dropdown-content'),
    default :function (){
        // let min_dropdown_content_height = 15.9993489583/100 * (this.height/2 )
        // this.min_dropdown_content_height = min_dropdown_content_height + "px";

    
    },
    create : function(){

        let header_height = 15/100 * this.sr_height;
        let pdf_viewer_height= 85/100 *this.height;
        let side_nav_height = 85/100 * this.height;
        let dropdown_width = 7 /100 * this.width;

        this.header_height = header_height+ "px";
        this.side_nav_height =side_nav_height+ "px";
        this.pdf_viewer_height= pdf_viewer_height+ "px";
        this.dropdown_width = dropdown_width+ "px";

        
    },
    set : function(){

        this.header.style.height = this.header_height 
        this.main.style.paddingTop = this.header_height 
        this.pdf_viewer.style.height = this.pdf_viewer_height 
        this.side_nav.style.height = this.side_nav_height
        this.dropdown.style.width = this.dropdown_width 
        this.dropdown_content.style.minHeight = this.min_dropdown_content_height;
        // this.dropdown_content.style.background = "yellow";
        // alert(window.innerWidth + " hey " + window.innerHeight)

    },
    resize:function(){
        window.addEventListener('resize',()=>{
            
            if(window.innerWidth  < 800 ){ 

                this.height = window.innerHeight;
                this.width = window.innerWidth;
                this.create()
                this.set()  
            }          
        })
    },
    init:function(){
        height = window.innerHeight
        width = window.innerWidth

        sr_width = window.screen.width
        sr_height =window.screen.height

        this.height = height;
        this.width = width ;
        this.sr_width = sr_width;
        this.sr_height = sr_height;

        this.default()
        this.create();
        this.set();
        this.resize()

    },
    print(){
       console.log( this.header_height)
    }
}
let WindowLimit= window.matchMedia("(min-width:800px)");

function HandleViewerport () {
    if(WindowLimit.matches){

        Elementsetting_1.init();
    }else {
        
        Elementsetting_2.init();
    }    
}

window.addEventListener("DOMContentLoaded",()=>{
    HandleViewerport();  
})
//we are using inline resize event so we can use this..
WindowLimit.addEventListener("change",function(event){
    HandleViewerport();
})


// window.addEventListener("resize",function (){
//     if(window.innerWidth > 800 ) {
//         Elementsetting_1.init()
//     }else{
//         Elementsetting_2.init();
//     }
// })
// import * as ExceptionHandler from '/scripts/ExceptionHandler.js';
// try{
    
//  throw new ExceptionHandler.StyleError();
// }
// catch(err){
//  console.log(err.message);
// }0