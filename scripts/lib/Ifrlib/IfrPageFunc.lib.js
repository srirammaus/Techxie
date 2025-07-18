import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';

let WindowLimit= window.matchMedia("(min-width:800px)");

function cachePage (F_num) {
/**
 * set the pages to localstorage
 */
    let currentPage = document.documentElement.outerHTML;
    let lastPage = {
        URL: document.documentURI,
        page: currentPage,
        F_num:F_num,
        timestamp:Date.now()

    }
    //check if it is already cached , if there any changes added delete folder in the local storage
    if(localStorage.getItem(F_num) == null || localStorage.getItem(F_num) == undefined ) {
        localStorage.setItem(F_num,JSON.stringify(lastPage))
    }
    
}
function fetchIfrPageFromIfr (URL,body,method= "POST") {
    return new Promise((resolve,reject) =>{  //lib
        fetch(URL,{
            method:method,
            body : JSON.stringify(body),
            headers:
            {
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then( resp=> {
            console.log(resp.headers.get("Content-Type"));
            return resp.text()
        }).then(html=>{
            //'data:text/html;charset=utf-8,' + encodeURI(html);
            // let parser = new DOMParser();
            // let newDoc = parser.parseFromString(html.toString(),'text/html');
            // get the main content
            let Ifr = IfrElements.getParentIfr()
            Ifr.srcdoc = html;

            Ifr.addEventListener("load",(e)=>{
                resolve(Ifr);

            })
                
        })
    })
}
function cache () {

}
function pageTracker_ (key = null,value = null){
    /**
     * set the pageTracker
     * if both key and value is null then it should be set to default
     * clear the pageTracker,P_Fnum , F_num session for every load
     * key and value represent thec F_num and P_F_num
     * key - F_num
     * value - P_F_num
     * It is now used to for going back and Forth
     */
    if(key == null && value == null) {
        let pageTracker = {}
        sessionStorage.setItem ("pageTracker",JSON.stringify(pageTracker))
    }else {
        let val = JSON.parse(sessionStorage.getItem("pageTracker"));
        console.log(val)
        let clone = Object.assign({},val);
        console.log(clone[key])
        clone[key]= value;
        // console.log(JSON.stringify(clone))
        sessionStorage.setItem("pageTracker",JSON.stringify(clone));
    }

}
function delFolder (URL,body,method="POST") {
    return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,
            body :JSON.stringify(body),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            },

        }).then(resp =>{
        
            return resp.text();
        }).then(text =>{//this is text but we consider as html
            resolve(text)
        }).catch(err=>{
            console.error(err.message)
        })
    })
}
function rename (URL,body,method="POST") {
        return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,
            body :JSON.stringify(body),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            },

        }).then(resp =>{
        
            return resp.text();
        }).then(text =>{//this is text but we consider as html
            resolve(text)
        }).catch(err=>{
            console.error(err.message)
        })
    })
}
function delFile (URL,body,method="POST") {
    return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,
            body :JSON.stringify(body),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            },

        }).then(resp =>{
        
            return resp.text();
        }).then(text =>{//this is text but we consider as html
            resolve(text)
        }).catch(err=>{
            console.error(err.message)
        })
    }) 
}
function getFileInfo (URL,body,method="POST") {
        return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,
            body :JSON.stringify(body),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            },

        }).then(resp =>{
        
            return resp.text();
        }).then(text =>{//this is text but we consider as html
            resolve(text)
        }).catch(err=>{
            console.error(err.message)
        })
    }) 
}
function viewFile(URL,method="GET") {
        return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,

        }).then(resp =>{
        
            return resp.text();
        }).then(text =>{//this is text but we consider as html
            resolve(text)
        }).catch(err=>{
            console.error(err.message)
        })
    }) 
}
function getCurrentFolder () {
     /** This function has to get the current folder F_num */
     let currentF_num = sessionStorage.getItem("F_num")
     return currentF_num;
}
function setCurrentFolder (F_num) {
    sessionStorage.setItem("F_num",F_num)
}
function getParentFolder () {
    let parentF_num = sessionStorage.getItem("P_F_num")
    return parentF_num;
}
function setParentFolder (P_F_num) {
    sessionStorage.setItem("P_F_num",P_F_num)
}
function splitID(id) { // lib
    id =  id.split("-");
    return id[1];
    
}
/**
 * These are deault styles that are automtically should be ther
 * More box should hide where ever touch
 * videoplayer should hide where ever touch
 * phtoviewer should hide where ever touch
 * input field should be toggled back
 */
function defaultStyles (e) {
       //videoplayer , phtoviewer ,more
        let gallery_container = IfrElements.gallery_container;
        let videoContainer = IfrElements.videoContainer;
        let more = IfrElements.more;

    
        if(window.getComputedStyle(gallery_container).display != "none" && e.target.getAttribute("class") != "main-img"  && e.target.getAttribute("class") != "gallery-img") {
            gallery_container.style.display = "none";
            //main-img ,//gallery-img
        }

        if(window.getComputedStyle(videoContainer).display != "none" && e.target.getAttribute("id") != "my-video"  && e.target.getAttribute("class") != "video") {
            videoContainer.querySelector(".video video").pause()
            videoContainer.style.display = "none";
            //main-img ,//gallery-img
        }
        if(e.target.getAttribute("attr") != "pop-box") {
            // if(window.getComputedStyle(e.target).display != "none"){
            //     e.target.style.display = "block"
            // }
            let F_id = sessionStorage.getItem("morePopBox") 
            if(F_id != null || F_id != undefined) {
                let more =document.querySelector(`.small-frame-items div[Fo_id=${F_id}]`) ?? document.querySelector(`.small-frame-items div[f_id=${F_id}]`);
                console.log(more)
                more.children[1].style.display = "none"
            }

        }
        if(e.target.getAttribute("attr") != "small-Folder-new-name"  ) {
            let F_id = sessionStorage.getItem("renameFolder")
            if(F_id != null || F_id != undefined) {
                let element =document.querySelector(`.small-frame-items div[id=${F_id}]`);
                console.log(element)
                console.log(element.querySelector('div[attr="small-Folder-name"]'))
                element.querySelector('div[attr="small-Folder-name"]').classList.toggle("hide-name");
                element.querySelector('input[attr="small-Folder-new-name"]').classList.toggle("show-input")
                sessionStorage.removeItem("renameFolder")

            }

        }

    
   
}
export {splitID,
    setParentFolder,
    cachePage,
    getParentFolder,
    delFolder,
    viewFile,
    defaultStyles,
    rename,
        delFile,
        getFileInfo,
    pageTracker_,fetchIfrPageFromIfr,WindowLimit,getCurrentFolder,setCurrentFolder}