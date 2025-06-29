/**
 * This applicable for  webdrive only
 */
import pageURls from '/scripts/utils/pageURLs.js';

function cacheIfrPage (ifr,URL,F_num) { //not in use
/**
 * set the pages to localstorage
 */
    let currentPage = ifr.contentDocument.documentElement.outerHTML;
    console.log(currentPage)
    let lastPage = {
        URL: URL,
        page: currentPage,
        F_num:F_num,
        timestamp:Date.now()

    }
    //check if it is already cached , if there any changes added delete folder in the local storage
    if(localStorage.getItem(F_num) == null || localStorage.getItem(F_num) == undefined ) {
        localStorage.setItem(F_num,JSON.stringify(lastPage))
    }
    
}
function isCachedPage (F_num) {
    localStorage.getItem(F_num)
}
function cacheMedia (f_num) {

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
function getLastPage () {
    /**Cache should be implemented later here */
    let currentFolder = getCurrentFolder();
    let parentFolder = sessionStorage.getItem("pageTracker");
    parentFolder = JSON.parse(parentFolder)[currentFolder];
    return [currentFolder ,parentFolder];

}
function removePageTrackerItem (key) {
    let pageTracker = JSON.parse(sessionStorage.getItem("pageTracker"));
    delete pageTracker[key];
    sessionStorage.setItem("pageTracker",JSON.stringify(pageTracker))


}
function fetchIfrPage (ifr,URL,method,body) { // folder 
    /**
     * @param F_num=0 means deault is Home
     * check if it is in cache
     * if not fetch it
     * 
     */
    let fetchParams = {
        method:method,
        headers:
        {
            "Content-Type": "application/json;charset=utf-8",
        },
    }
    if(method == "POST") {
        fetchParams.body = JSON.stringify(body)
    }
    return new Promise((resolve,reject) =>{ 
        fetch(URL,fetchParams).then( resp=> {
            return resp.text()
        }).then(html=>{ //this is text but we consider as html
            //'data:text/html;charset=utf-8,'  + encodeURI(html);
            ifr.srcdoc = html;

            ifr.addEventListener("load",function(){            
                console.log("Success")  
                resolve(ifr)

            })
                
        }).catch(err=>{
            reject(err)
        })
    })


}
function fetchPage(URL,body,method = "GET") { //Not i use
    return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,
            body : JSON.stringify(body),
            headers:
            {
                "Content-Type": "application/json;charset=utf-8",
            }

        }).then(resp =>{
            return resp.text();
        }).then(text =>{//this is text but we consider as html
            resolve(text)
        }).catch(err=>{
            console.error(err.message)
        })
    })
}
/**
 * upload file from the device to server
 */
function uploadFile (URL,body,method="POST") {
    /**
     * getting username , userID , session token, session id , xsrf token , F_num , uploads
     */
  
    return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,
            body :body,

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
function getParentFolder () {
    let parentF_num = sessionStorage.getItem("P_F_num")
    return parentF_num;
}
function setCurrentFolder (F_num) {
    sessionStorage.setItem("F_num",F_num)
}
function setParentFolder (P_F_num) {
    sessionStorage.setItem("P_F_num",P_F_num)
}
function createFolder (URL,body,method="POST") {

      return new Promise((resolve,reject)=>{
        fetch(URL,{
            method:method,
            body : JSON.stringify(body),
             headers:
            {
                "Content-Type": "application/json;charset=utf-8",
            }

        }).then(resp =>{
        
            return resp.text();
        }).then(text =>{//this is text but we consider as html
            console.log("once done then it reloads")
            resolve(text)
        }).catch(err=>{
            console.error(err.message)
        })
    })
}
function fetchFile () {
    //get the media file
}
function fetchFileInfo(){

}
function deleteFile () {

}
function deleteFolder () {

}
function editFolder () {
    
}
function editFile () {

}

export {fetchPage,
    fetchIfrPage
    ,uploadFile
    ,setCurrentFolder
    ,getCurrentFolder
    ,createFolder
    ,cacheIfrPage,
    isCachedPage,
    getParentFolder,
    getLastPage,
    pageTracker_,
    removePageTrackerItem,
setParentFolder}

/**
 *       if(sessionStorage.getItem("pageTracker") == null){ // 99.99 this function never gonna run, because we already 
            let pageTracker = {}
            pageTracker[key] = value;
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
 */