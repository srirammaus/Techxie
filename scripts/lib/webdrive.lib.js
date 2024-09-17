
import pageURls from '/scripts/utils/pageURLs.js';

function cachePage (F_num) {

}
function cacheMedia (f_num) {

}
function fetchPage (ifr,F_num =0,F_id="F-0",f_num = 0,f_id ="f-0-0") { // folder 
    /**
     * @param F_num=0 means deault is Home
     * check if it is in cache
     * if not fetch it
     * 
     */
    let body ={
        F_num: F_num,
        F_id: F_id,
        f_id:f_id,
    }
    
    return new Promise((resolve,reject) =>{ 
        fetch(pageURls.home,{
            method:"POST",
            body : JSON.stringify(body),
            headers:
            {
                "Content-Type": "application/json;charset=utf-8",
            }
        }).then( resp=> {
            return resp.text()
        }).then(html=>{
            //'data:text/html;charset=utf-8,' + encodeURI(html);
            ifr.srcdoc = html;
            //
            resolve(ifr)
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

export {fetchPage}


 
//             ifr.addEventListener("load",function(){ // check for src load
//                     resolve(1)

//             })