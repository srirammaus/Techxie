/**
 * Dynamic page styles for Rececnts, home, trash - Ifr
 * This is General sizes which will aplly for both, this will works according by css's media query
 */
import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';

//main-pop-box include del , right click ,info box
function mainPopBox () {
    //activate which needed
    //it should be adjustable for mulitple devices


    //if del clicked
    // delFrameStyles()

    //if copied
    // popCopied()

    //if info box clicked
    // infoStyles();
    
    
}
function delFrameStyles () { //right clikc and info disabled when delFrame is enable
    //first look for existing element , if there any remove it
    let mainPopBox = IfrElements.mainPopBox;
    if(mainPopBox.children.length > 0) {
        console.log("child gonna be removed")
        mainPopBox.removeChild(mainPopBox.firstChildElement);
    }
    //max-with :420;
    //max-width:800;
    //Hide this by top = -50% , not by none
    var mainPopBoxStyle = {
        // "display":"flex",
        "top":"25%",
    };
    var frame_style = { 


       
    };
    var optionStyle = {        
       
        
    }
    //dont use VH or VW for font sizes
    var optionA = {


    }
    // var frame= document.createElement("div");
    // mainPopBox.append(a);
    
    mainPopBox.style.cssText = Object.keys(mainPopBoxStyle).map(key => `${key}: ${mainPopBoxStyle[key]}`).join('; ');
    var frame = document.createElement("div");
    frame.classList.add("frame");
    frame.setAttribute("attr","del-frame");
    frame.innerHTML = `
        <div class=close><i class="mdi mdi-close"></i></div>
        <div class=option attr=yes><a>YES</a></div>
        <div class=option attr=no><a>NO</a></div>
    `;
    // frame.querySelectorAll(".option").forEach(element => {
    //     element.style.cssText = Object.keys(optionStyle).map(key => `${key}: ${optionStyle[key]}`).join('; '); 
    // });
    // frame.querySelector(".option[attr=yes] a").style.cssText = Object.keys(optionA).map(key => `${key}: ${optionA[key]}`).join('; ');
    // frame.querySelector(".option[attr=no] a").style.cssText = Object.keys(optionA).map(key => `${key}: ${optionA[key]}`).join('; ');

    frame.querySelector(".option[attr=yes] a").style.setProperty("background-color","rgb(255, 77, 77)");
    frame.querySelector(".option[attr=no] a").style.setProperty("background-color","rgb(128, 128, 255)");

  

    // frame.style.cssText = Object.keys(frame_style).map(key => `${key}: ${frame_style[key]}`).join('; ');
    mainPopBox.appendChild(frame)
    // console.log(mainPopBox)
}
function rightClickStyles () {

}
function infoStyles (){
    let mainPopBox = IfrElements.mainPopBox;
    
    var mainPopBoxStyle = {
        "top":"20%",
    }
    if(mainPopBox.children.length > 0) {
        mainPopBox.removeChild(mainPopBox.firstChildElement);
    }
    mainPopBox.style.cssText = Object.keys(mainPopBoxStyle).map(key => `${key}: ${mainPopBoxStyle[key]}`).join('; ');
    let frame = document.createElement("div");
    frame.classList.add("frame");
    frame.setAttribute("attr","info");

    //dynamic data

    //temporary data 
    let temp_data = {

        "name":"temp",
        "date" :"24-1.2025",
        "size" : "65MB",
        "naame":"temp",
        "daate" :"24-1.2025",
        "siaze" : "65MB",
        
    }
    //if video there should be duration , etcc.
    //if photo pixel size hsould be mentioned

    //the below close should be must display:none
    frame.innerHTML = `
        <div class=close><i class="mdi mdi-close"></i></div> 
        <div class= title-coloumn></div>
        <div class=description-coloumn></div>
    `;
    let title_coloumn = frame.querySelector(".title-coloumn");
    let description_coloumn= frame.querySelector(".description-coloumn");
    mainPopBox.appendChild(frame)

    let count = 1;
    for (let key in temp_data) {
        let title_item = document.createElement("div");
        title_item.classList.add("title-item");
        title_item.setAttribute("item",count)
        title_item.innerHTML =  `
        <a>${key}</a>
        `
        title_coloumn.appendChild(title_item);
        
        let description_item = document.createElement("div");
        description_item.classList.add("description-item");
        description_item.setAttribute("item",count);
        description_item.innerHTML =   `
        <a>${temp_data[key]}</a>
        `
        description_coloumn.appendChild(description_item);

        count +=1;

    }
    

}
function popCopied () {
    var mainPopBoxStyle = {
        // "display":"flex",
        "top":"10%",
    };
    //first look for existing element , if there any remove it
    let mainPopBox = IfrElements.mainPopBox;
    if(mainPopBox.children.length > 0) {
        mainPopBox.removeChild(mainPopBox.firstChildElement);
    }
    mainPopBox.style.cssText = Object.keys(mainPopBoxStyle).map(key => `${key}: ${mainPopBoxStyle[key]}`).join('; ');
    
    let frame = document.createElement("div");
    frame.classList.add("frame");
    frame.setAttribute("attr","popCopied");
    frame.innerHTML = `
        <a>copied</a>
    `;
    mainPopBox.appendChild(frame);
    
    setTimeout(() => {
        mainPopBox.style.top = "-50%";
    }, 2000);
}
mainPopBox();

/**
 * function delFrameStyles () { //right clikc and info disabled when delFrame is enable
    
    //max-with :420;
    //max-width:800;
    //Hide this by top = -50% , not by none
    var mainPopBoxStyle = {
        // "display":"flex",
        "position":"absolute",
        "justify-content":"center",
        // "align-items":"center",
        "transition": "top 1s linear",
        "top":"25%",
    };
    var frame_style = { 
        "display":"inline-flex",
        "position":"relative",
        "flex-direction":"row",
        // this below should be dynamic
        "width":"40%",
        "height":"25%",
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
    //dont use VH or VW for font sizes
    var optionA = {
        "display":"inline-flex",
        "width":"14%",
        "aspect-ratio": "2 /1",
        "border-radius":"10%",
        "text-align":"center",
        "justify-content":"center",
        "align-items":"center",
        "color":"white",
        "font-family": "'Poppins', sans-serif",
        "font-size":"25%",
        "box-shadow": "1px 1px 15px 5px #aaaaaa,-1px -1px 15px 5px #aaaaaa",

    }
    // var frame= document.createElement("div");
    // IfrElements.mainPopBox.append(a);
    
    IfrElements.mainPopBox.style.cssText = Object.keys(mainPopBoxStyle).map(key => `${key}: ${mainPopBoxStyle[key]}`).join('; ');
    var frame = document.createElement("div");
    frame.innerHTML = `
        <div class=close></div>
        <div class=option attr=yes><a>YES</a></div>
        <div class=option attr=no><a>NO</a></div>
    `;
    frame.querySelectorAll(".option").forEach(element => {
        element.style.cssText = Object.keys(optionStyle).map(key => `${key}: ${optionStyle[key]}`).join('; '); 
    });
    frame.querySelector(".option[attr=yes] a").style.cssText = Object.keys(optionA).map(key => `${key}: ${optionA[key]}`).join('; ');
    frame.querySelector(".option[attr=no] a").style.cssText = Object.keys(optionA).map(key => `${key}: ${optionA[key]}`).join('; ');

    frame.querySelector(".option[attr=yes] a").style.setProperty("background-color","rgb(255, 77, 77)");
    frame.querySelector(".option[attr=no] a").style.setProperty("background-color","rgb(128, 128, 255)");

  

    frame.style.cssText = Object.keys(frame_style).map(key => `${key}: ${frame_style[key]}`).join('; ');
    IfrElements.mainPopBox.appendChild(frame)
    // console.log(IfrElements.mainPopBox)
}
 */