/**
 * This is used to req and response mangement
 */

export default class Func  {
    constructor (){

    }
    signup () {

    }
    login () {

    }
    deleteFile () {

    }
    Info (){

    }
    Notification () {
        //kafka 

    }
    copy () {

    }
    move () {

    }
    deleteAccount () {

    }
    loadPage () {

    }
    searchSuggesstion () {

    }
    loadSearch() {

    }
    FolderBar(){

    }
    request_ () {

    }
    response_ () {
        
    }
    fetchFoldersFiles() {
        //folders and files
    }
    fetchFile () {
        
    }
    /**
     * 
     * @param {Type should be array} inputs 
     * @returns 
     */
    static filter (inputs) {
        if(Array.isArray(inputs) ){
            let filteredInputs = []
            for (let input of inputs ){
                input = input.trim();
                if(input.length == 0){
                    return false
                }
                filteredInputs.push(input)
                console.log("three times")
            }
            return filteredInputs;
        }else { 
            return false;
        }
        
    }

}