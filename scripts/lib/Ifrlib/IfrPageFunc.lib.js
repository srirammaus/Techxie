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
function fetchIfrPageFromIfr (URL,body) {
    return new Promise((resolve,reject) =>{  //lib
        fetch(URL,{
            method:"POST",
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
            //get the main content
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

export {splitID,
    setParentFolder,
    cachePage,
    getParentFolder,
    pageTracker_,fetchIfrPageFromIfr,WindowLimit,getCurrentFolder,setCurrentFolder}