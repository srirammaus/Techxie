function setBarHight () {	
	videoControls.style.setProperty("max-height","33px");
	videoControls.style.setProperty("min-height","17px");
	console.log((percentage/100) * window.getComputedStyle(videoContainer).height.split('px')[0])
	videoControls.style.height = ((percentage/100) * window.getComputedStyle(videoContainer).height.split('px')[0]) + "px";
	// console.log(window.getComputedStyle(videoControls).height +  "   VCT");

}

//auto oreint to landscape
//height manipulation for full screen
function onVideoResize () {
	videoContainer.addEventListener("resize",()=>{
		setBarHight();
	})
	window.addEventListener("fullscreenchange",()=>{
		setBarHight();
		if(!document.fullscreenElement){
			fullScreen(0)
		}
		
	})
	fullscreenButton.addEventListener('click', () => {
		var isEnabled = fullscreenButton.classList.contains("on");
		if(isEnabled){
			fullScreen(0)
			exitFS()
		}else{
			enterFS();
			fullScreen(1)

		}
	});
}
function fullScreen(args) {
	if(args == 1){
		fullscreenButton.classList.remove("off")
		fullscreenButton.classList.add("on")
		window.screen.orientation.lock("landscape-primary").then(function(){
			video.style.left = "7.5%";
			video.style.width = "85%"; //contain
			// video.style.width = "100%" //cover or wide/
			
		}).catch(function(err){
			console.log(err.message)
		})
	}else{

		fullscreenButton.classList.remove("on")
		fullscreenButton.classList.add("off")
		screen.orientation.unlock();
		video.style.left = "0";
		video.style.width = "100%";	
	}
}
function enterFS() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  }
}

function exitFS() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
function onOrientation () {
	//matchmedia
}
function onmouse_ (){
	//instead of mouse over\
	var timeID;
	videoContainer.addEventListener('mouseover',()=>{
		videoControls.style.opacity = 1
		timeID = setTimeout(function(){videoControls.style.opacity = 0},5000)
	})
	videoContainer.addEventListener('mouseout',()=>{
		clearTimeout(timeID)
		videoControls.style.opacity = 0;

	})
	videoContainer.addEventListener('touchstart',()=>{
		videoControls.style.opacity = 1
		timeID = setTimeout(function(){videoControls.style.opacity = 0},5000)

	})
}
setBarHight();
onVideoResize();
onmouse_();

				// screen.orientation.onchange = () =>{
				// 	// alert(window.innerWidth + "px px ")
				// 	video.style.width = window.innerWidth + "px";
				// }