export default class extendedFormData extends FormData {
    constructor(form){
        super(form);
        
        this.form = form;
        
    }
   
    filter (type) { //type here is key
    
        let types = ["username","email","name","password","cpassword","ph_number"];
        if(types.includes(type)){
         
            switch (type) {
                /**
                 * str limit for username is 25
                 * trim the unwanted white spaces around it and warn if the use has white spaces in username
                 */
                case types[0]: // username
                    if(this.get(type) == '' || this.get(type) == undefined){
                        return false
                    } // if empty add raise please add requested field  //throw new Error("Invalid Input Field") 
                    else {
                        var val = this.get(type)
                        if(val.split(" ").length > 1 ) throw new Error("Username should not consist space in between");
                        if(val.length > 25) throw new Error ("Username limit exceeded")
                        this.set(type,val.trim());
                        console.log("this comes under formdata usernmae")
                        return true;
                    }
                case types[1]: 
                    /**
                     * str limit for email is 25
                     * check whther it conatins @ and .
                     * trim it
                     */
                    var val =this.get(type) ;
                    
    
                    if(val == '' || val == undefined || val.trim().length == 0){
                        return false
                    }else {
                        const emailValue =val; 
                        const char = '@.'
        
                        if(!char.split('').every((eachChar)=>emailValue.includes(eachChar))){
                           return false; 
                        }
                        if(val.split(" ").length > 1 ) throw new Error("Username should not consist space in between");
                        if(val.length > 25) throw new Error ("email input limit exceeded")
                        this.set(type,emailValue.trim())
                        return true;
                    }
                    
                case types[2]:
                    /**
                     * str limit for name is 30
                     */
                    var val = this.get(type) ;
                    
    
                    if(val == '' || val == undefined || val.trim().length == 0){
                        throw new Error("Invalid Name field")
                    } 
                    else {
                        if(val.length > 25) throw new Error ("email input limit exceeded")
                        this.set(type,val.trim());
                        return true;
                    }
                case types[3]:
                    var val = this.get(type);
                    
    
                    if(val == '' || val == undefined || val.trim().length == 0){
                        return false
                    }
                    if(val.length > 40) throw new Error ("password limit exceeded")
                    
                    this.set(type,val.trim());
                    return true;
                case types[4]:
                        var val = this.get(type);
                        
    
                        if(val == '' || val == undefined || val.trim().length == 0){
                            return false
                        }
                        if(val.length > 40) throw new Error ("password limit exceeded")
                        this.set(type,val.trim());
                        return true;
                case types[5]:
                    var val = Number(this.get(type));
                    console.log(this.get(type))
                    if(val == '' || val == undefined || val == NaN){
                        throw new Error("Not a Number")
                    }
                    if(typeof val != "number") throw new Error("Invalid Input field")
                    if(val.length < 15 && val.length >= 10)  throw new Error ("Number input limit not reached")
                    return true;
                default:
                   break;
                
            }
     
        }
    
    }
}
