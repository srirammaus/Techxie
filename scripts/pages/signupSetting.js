
var currentUser = {};

function setCurrentUser (obj)  {
    currentUser = obj;
}

function getCurrentUser () {
    return currentUser;
    
}
function newLocalStorage (obj) {
    //obj type should object
    if(obj != undefined  && obj != null ){
        for(key in obj){
            localStorage.setItem(key,obj[key])
        }
        
    }
}
function getInputData(){
    // process to get data from HTML file
    result = {

    }
    return result;
}
function newsessionStorage (obj) {
    //obj type should object
    if(obj != undefined  && obj != null ){
        for(key in obj){
            sessionStorage.setItem(key,obj[key])
        }
        
    }
}
function defaultHeaders () {
    var Headers ={
        'Content-Type': 'application/json;charset=utf-8'
    }
    return Headers
}