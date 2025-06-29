import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
import pageURLs from "/scripts/utils/pageURLs.js";
import Elements from '/scripts/lib/Elements.lib.js';
import apiConfig from '/scripts/utils/apiConfig.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";

function createFolder_() {
    let createFolder = Elements.createFolder;
    let decodeCookie = document.cookie.split(";");
    let body = {};
    for(let cookie of decodeCookie){
        cookie = cookie.trim()
        if(cookie.indexOf("username") == 0) {
            body.username = cookie.substring(Number("username".length) + 1,cookie.length)
        } else if(cookie.indexOf("userID") == 0) {
            body.userID = cookie.substring(Number("userID".length) + 1,cookie.length)
        }else {}
    }
    body.F_num = Weblib.getCurrentFolder();
    body.F_name = "Temp Folder 5";
        let params = {
        F_num: Weblib.getCurrentFolder(),
    }
    let page = "home";
    Weblib.createFolder(apiConfig.createFolder,body).then((txt)=>{
        loadFrame(page,params,"POST")

    })


        

}
function upload () {
            let driveUploadInput = Elements.driveUploadInput;
            driveUploadInput.click()
            console.log(driveUploadInput.files.fileName + " Name")

            driveUploadInput.addEventListener("change",function(){
                let formdata = new FormData();
                console.log("The current Folder number " + Weblib.getCurrentFolder())
                formdata.append("F_num",Weblib.getCurrentFolder())
                console.log("file added")
                for (let file of driveUploadInput.files) {
                        console.log(file.name + "Works perferct")
                        formdata.append("uploads",file)
                }
                Weblib.uploadFile(apiConfig.driveUploadFile,formdata).then(result =>{
                            console.log(result)
                })
            })
            
            // console.log(driveUploadInput.files[0].name + " Name 2")
            // console.log(formdata)
            // for(let file of driveUploadInput.files) {
            // 	console.log(file.name  + "fiile")
            // }

        
}
function loadFrame (page,body,method) {
    Weblib.fetchIfrPage(Elements.iframe_element,pageURLs[page],method,body).then((ifr) => {
    })  

}
function Back () {
    /**
        * atlast dont forget to change the P_F_num and F_num
     */
    let [currentPage,lastPage] = Weblib.getLastPage() 
    let body = {
        F_num: lastPage,
    }
    let page = "home";
    loadFrame(page,body,"POST");
    console.log(currentPage,lastPage)
    Weblib.setCurrentFolder(lastPage)
    Weblib.removePageTrackerItem (currentPage)
    //Now here actually i changed the current folder , so there shoul be a new Weblib.getLastPage needed
    Weblib.setParentFolder(Weblib.getLastPage()[1] ? Weblib.getLastPage()[1]: 0 )
}
function Forth () {

}
export{createFolder_,upload,Back}