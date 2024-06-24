
// var webdrive;

// async function main() {
	// window.innerWidth > 800 ? webdrive = await import("/scripts/WebDrive-1.js") : webdrive = await import("/scripts/WebDrive-2.js");
	// new webdrive.WebDrive();
// }

// main();
// window.addEventListener('resize',()=>{
// 	main();
// })


//FYI: we can also use aysnc in script tag and we can also use await in import statement but it affcects domcontnloaded
import * as webdrive_1 from "/scripts/pages/WebDrive-1.js";
import * as webdrive_2 from "/scripts/pages/WebDrive-2.js";
let WindowLimit= window.matchMedia("(min-width:800px)");

function HandleViewerport () {
	try {


	    if(WindowLimit.matches){
	    	console.log("change 1")
	        new webdrive_1.WebDrive();
	    }else {
	        console.log("changed 2")
	        new webdrive_2.WebDrive();
	    }    
	}catch (err) {
		console.log(err);
	}
}


HandleViewerport();  


WindowLimit.addEventListener("change",function(event){
    HandleViewerport();
})

// function mediaHandler () {
// 	const minWidth = 800;

// 	if(window.innerWidth > minWidth){
// 		new webdrive_1.WebDrive();
// 	}else{
// 		new webdrive_2.WebDrive();
// 	}
// }
// try {
// 	mediaHandler();
// }catch (e) {
// 	console.log("Error Caught : " + e.message)
// }


// window.addEventListener('resize',()=>{
// 	const minWidth = 800;

// 	if(window.innerWidth > minWidth){
// 		new webdrive_1.WebDrive();
// 	}else{
// 		new webdrive_2.WebDrive();
// 	}
// })
