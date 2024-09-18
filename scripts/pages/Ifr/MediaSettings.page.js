/**
 * This media settings shoul decides which css loads to webdrive first
 */
const WindowLimit = parent.matchMedia("(min-width:800px)");

function Match () {

	if(WindowLimit.matches){
		var path = "/assets/WebDrive-1.css";
		loadCss(path,"first");
	}else{
		var path = "/assets/WebDrive-2.css";
		loadCss(path,"second")
	}
}
function loadCss(path,class_) {
	if(!isExist(class_)){


		if(class_ == "first") {
			document.querySelector("link[class=second]")?.remove();
		}else{
			document.querySelector("link[class=first]")?.remove();
		}

		var link =  document.createElement('link');
		link.classList = class_;
		link.rel = "stylesheet";
		link.type = "text/css" ;
		link.href = path;	
		document.head.appendChild(link);
					

	}
}
function isExist(class_) {
	if(document.querySelector(`link[class=${class_}]`)){ 
		return true;
	}
}
Match();

//if CORS prblem use postmessage method
WindowLimit.addEventListener("change",function(e){
	console.log(window.innerWidth)
	Match();
})