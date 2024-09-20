import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';


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
            Ifr.addEventListners("load",(e)=>{
                resolve(Ifr);

            }).catch(err=>{
                reject(err)
            })
                
        })
    })
}
function cache () {

}

function splitID(id) { // lib
    id =  id.split("-");
    return id[1];
    
}

export {splitID,fetchIfrPageFromIfr}