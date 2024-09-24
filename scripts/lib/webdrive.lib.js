/**
 * This applicable for  webdrive only
 */
import pageURls from '/scripts/utils/pageURLs.js';

function cachePage (F_num) {

}
function cacheMedia (f_num) {

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

export {fetchPage,fetchIfrPage}


 
//             ifr.addEventListener("load",function(){ // check for src load
//                     resolve(1)

//             })