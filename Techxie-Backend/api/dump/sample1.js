// var sample = require(__dirname +'/sample.js');
// new sample.main1("message");
var crypto = require('crypto');
var hash = crypto.createHash('sha256');
var pwd = "sriram2003";
var ans = hash.update(pwd).digest('base64');
console.log(ans);

// let john = { name: "John" };

// let weakMap = new WeakMap();
// weakMap.set(john, "documents");

// console.log(JSON.stringify(john))
// class sample1{
// 	constructor(){
// 		var text = "Text String";
// 		this.text =  text;
// 	}
// 	test(){
// 		var text2 = "Text2 string";
// 		this.text2 = text2;
		
// 	}
// }
// module.exports = sample1;