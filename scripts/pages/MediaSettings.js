const WindowLimit = parent.matchMedia("(min-width:800px)");

function Match () {
	console.log(WindowLimit.matches)
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
			console.log("This Should happen 1")
		}else{

			document.querySelector("link[class=first]")?.remove();
			console.log("This Should happen 2")
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