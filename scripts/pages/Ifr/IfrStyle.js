/**
 * Dynamic page styles for Rececnts, home, trash - Ifr
 */
import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';

//main-pop-box include del , right click ,info box
function mainPopBox () {
    //activate which needed
    //it should be adjustable for mulitple devices


    //if del clicked
    delFrameStyles()
    
    
}
function delFrameStyles () { //right clikc and info disabled when delFrame is enable
    
    //max-with :420;
    //max-width:800;
    var mainPopBoxStyle = {
        "display":"none",
        "position":"absolute",
        "justify-content":"center",
        "align-items":"center",
        "top":"0",
    };
    var del_frame_style = { 
        "display":"inline-flex",
        "position":"relative",
        "flex-direction":"row",
        // this below should be dynamic
        "width":"50%",
        "height":"50%",
        "justify-content":"center",
        "align-items":"center",
        "background-color":"white",
        "box-shadow": "1px 1px 15px 5px #aaaaaa,-1px -1px 15px 5px #aaaaaa",
        "border-radius":"20px"

       
    };
    var optionStyle = {
        "display":"inline-flex",
        "position":"relative",
        "width":"50%",
        "height":"14%",
        "position":"relative",
        "justify-content":"center",
        "align-items":"center",
        "text-align":"center",
        
       
        
    }
    var optionA = {
        "width":"14%",
        "color":"white",
        "font-family": "'Poppins', sans-serif",
        "font-size":"2.5vh",
        "box-shadow": "1px 1px 15px 5px #aaaaaa,-1px -1px 15px 5px #aaaaaa",

    }
    // var del_frame= document.createElement("div");
    // IfrElements.mainPopBox.append(a);
    
    IfrElements.mainPopBox.style.cssText = Object.keys(mainPopBoxStyle).map(key => `${key}: ${mainPopBoxStyle[key]}`).join('; ');
    var del_frame = document.createElement("div");
    del_frame.innerHTML = `
        <div class=close></div>
        <div class=option attr=yes><a>YES</a></div>
        <div class=option attr=no><a>NO</a></div>
    `;
    del_frame.querySelectorAll(".option").forEach(element => {
        element.style.cssText = Object.keys(optionStyle).map(key => `${key}: ${optionStyle[key]}`).join('; '); 
    });
    del_frame.querySelector(".option[attr=yes] a").style.cssText = Object.keys(optionA).map(key => `${key}: ${optionA[key]}`).join('; ');
    del_frame.querySelector(".option[attr=no] a").style.cssText = Object.keys(optionA).map(key => `${key}: ${optionA[key]}`).join('; ');

    del_frame.querySelector(".option[attr=yes] a").style.setProperty("background-color","rgb(255, 77, 77)");
    del_frame.querySelector(".option[attr=no] a").style.setProperty("background-color","rgb(128, 128, 255)");

  

    del_frame.style.cssText = Object.keys(del_frame_style).map(key => `${key}: ${del_frame_style[key]}`).join('; ');
    IfrElements.mainPopBox.appendChild(del_frame)
    // console.log(IfrElements.mainPopBox)
}
function rightClickStyles () {

}
function infoStyles (){
    
}
mainPopBox();