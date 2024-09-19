import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';


function fetchPage (URL,body) {
    return new Promise((resolve,reject) =>{  //lib
        fetch(URL,{
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
            let parser = new DOMParser();
            let newDoc = parser.parseFromString(html.toString(),'text/html');
            //get the main content
            resolve(newDoc);
                
        })
    })
}
function cache () {

}
function ifrProcessDimension () { // lib
    try {
        const WindowLimit = parent.matchMedia("(min-width:800px)");
        
       // or use switch state for multiple media query

        if(WindowLimit.matches){

            IfrElements.iframe_ ().then(function(elem) {	
                if(elem[0] == true) {
                    ///
                    elem[1].style.setProperty('height',(80/100 * window.screen.height) +'px');
                    elem[2].body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
                }
            })
        }else{
            IfrElements.iframe_ ().then(function(elem) {	
                if(elem[0] === true){
                    elem[1].style.setProperty('height',(80/100 * window.screen.height) +'px');
                    elem[2].body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
                }
            })
        }

    }catch(err) {
        console.error(err)
    }

}
function splitID(id) { // lib
    id =  id.split("-");
    return id[1];
    
}

export {splitID,fetchPage,ifrProcessDimension}