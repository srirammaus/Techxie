// class main {
// 	constructor(message){
// 		console.log(message.toString())
// 	}
// }
// module.exports = {main1 : main}

//Encapsulation:-
var dump =['u','s'];
var d = ['u','s'];
for i in dump
class Encapsulation_{
	constructor(){
		var fullName;
	}
	setName(Name){
		//The actual use is encaps is by doing functions here with data [binding data with function]
		this.fullName = Name + "Smith";
	}
	getName(){
		return this.fullName;
	}

}
var en = new Encapsulation_();
en.setName("john");
console.log(en.getName())

//Object.defineProperty() you can define properties usning this
//prototype ,__proto__ is not moder usage . it is used reading properties not for writing purpose instread writeing purpose prototype is used
//Take Much More time to Explore prototype
var Animal = {
	animal: "tiger",
	walk(){
		console.log("I am waliking")
	}
}
console.log(Animal.animal); // property
Animal.walk() //method

class Animals{
	constructor(){
		var name = "shriram";
		this.name = name;
	}
	walking(){
		console.log("I am walking");
	}
	
}
var obj = new Animals();
console.log(obj.name);
obj.walking()

obj.walking = function(){
	console.log("I am not Walking not using prototype")
}
Animals.prototype.walking = function(){
	console.log("I am not Walking -using prototype")
}
Animals.prototype.NewWalking=function(){
	console.log("New Walk")
}
obj.walking()
obj.NewWalking()

//By using Prototye we can change native functions function and You can override any built-in function by just re-declaring it. parseFloat = function(a){ alert(a) }; Now parseFloat(3) will alert 3. But there is no concept of function overriding in this answer, i.e. overriding functionality but keeping the function name same.
 //polymorphism - doing same action in different forms

var arr = [1,1,1,1,1];
var text = "Shriam";
console.log(arr.length + "-" + text.length);
//event listners
var fs = require('fs');
var rs = fs.createReadStream('./drive.api.js');
rs.on('open', function () {
  console.log('The file is open');
});

function sample (){
	 var val = "dump";
	 var i = val.split('-');
	 console.log(i[0]);
}
sample();