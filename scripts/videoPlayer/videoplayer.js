
// import * as lib from '/videoPlayer/scripts/lib/videolib.js';
/**
 * condition:-
 * 
 * */
const videoContainer = document.querySelector(".video-container");
const videoControls = document.getElementById("video-controls")
const video = document.getElementById('my-video');
const playpauseBtn = document.getElementById('play-pause-btn');
const playBtn= document.querySelector("#play-pause-btn .mdi-play");
const pauseBtn= document.querySelector("#play-pause-btn .mdi-pause");
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
const muteBtn = document.getElementById('mute-btn');
const speedBtn = document.getElementById('speed-btn');
const fullscreenButton = document.getElementById('full-screen-btn');
const loader = document.getElementById("loader");
const percentage = 5.3984575835475574;

function isPlaying(video){
	return !video.paused && !video.ended;
}
function checkType_(){
	if (video.canPlayType('video/mp4') === 'probably') {
    // MP4 format is supported
    // Add video source and start playback
  	} else {
	    // MP4 format is not supported
	    // Provide alternative content or formats
	}
}
function loadVideo_()  {

}
function videoQuality() {

}
function autoPlay_(){
	if(isPlaying(video)){
		//pause
		video.pause();
		playBtn.style.display = "inline";
		pauseBtn.style.display = "none"
	}else{
		//play
		video.play();
		playBtn.style.display = "none";
		pauseBtn.style.display = "inline"
	}
}
function onPlaying (){
	video.addEventListener("playing",()=>{

		if(!isPlaying(video)){

			playBtn.style.display = "none";
			pauseBtn.style.display = "inline";
			console.log("Worked..")			
		}
	})
}
// Play/Pause Functionality
function play_pause (argument) {
	// body... mdi-fullscreen-exit mdi-pause-circle-outline

	playpauseBtn.addEventListener("click",()=>{
		if(isPlaying(video)){
			//pause
			video.pause();
			playBtn.style.display = "inline";
			pauseBtn.style.display = "none"

		}else{
			//play
			video.play();
			playBtn.style.display = "none";
			pauseBtn.style.display = "inline";
		}
	})
}

function seekBar_ () {	
	
	//if range changed it should play according to time
	seekBar.addEventListener('input',()=>{
		const seekTime = (video.duration / 100) * seekBar.value;
 		video.currentTime = seekTime;
 		if(isPlaying(video) === false) {
 			video.pause();
 		}
	})
	//move according to the time
	video.addEventListener("timeupdate",()=>{
		seekBar.value = (video.currentTime/video.duration) * 100;
	})


}



function PiP_ () {

}



function volumeBar_() {
	volumeBar.addEventListener('input', () => {
		if(video.volume < 0.4 && volumeBar.value <0.4){
			video.volume = 0.1;
			volume_();
		}else{
			const vol = volumeBar.value;
			video.volume = 0;
			volume_();
			volumeBar.value = vol;
			video.volume =volumeBar.value 
			// video.volume = volumeBar.value;
		}
  		
	});
}
function Mute_(){
	
	muteBtn.addEventListener('click', () => {
		volume_()
	});
}
function volume_(){
	var newElement = document.createElement('span');
	if (video.volume === 0) {
		// Unmute
		video.volume = 1;
		volumeBar.value=1;
		muteBtn.removeChild(muteBtn.firstChild);
		newElement.innerHTML = '<i class="mdi mdi-volume-high"></i>';
		muteBtn.appendChild(newElement);	    
	} else {
	// Mute

		video.volume = 0;
		volumeBar.value=0;
		muteBtn.removeChild(muteBtn.firstChild);
		newElement.innerHTML = '<i class="mdi mdi-volume-off"></i>';
		muteBtn.appendChild(newElement);	    
	}
}
function playbackRate (){
	var newElement = document.createElement('span');
	speedBtn.addEventListener('click', () => {
	const currentSpeed = video.playbackRate;
		if (currentSpeed === 1) {
			// Set playback speed to 1.5x
			video.playbackRate = 1.5;
			speedBtn.removeChild(speedBtn.firstChild);
			newElement.innerHTML = '<i class="mdi mdi-fast-forward">1.5x</i>';
			speedBtn.appendChild(newElement);
			
		} else if (currentSpeed === 1.5) {
			// Set playback speed to 2x
			video.playbackRate = 2;
			speedBtn.removeChild(speedBtn.firstChild);
			newElement.innerHTML = '<i class="mdi mdi-fast-forward">2x</i>';
			speedBtn.appendChild(newElement);
		} else {
			// Set playback speed to 1x (default)
			video.playbackRate = 1;
			speedBtn.removeChild(speedBtn.firstChild);
			newElement.innerHTML = '<i class="mdi mdi-fast-forward"></i>';
			speedBtn.appendChild(newElement);
		}
	});
}

//space keyword inout forgotten
function Buffer_(){
	video.addEventListener("timeupdate",()=>{

		// console.log(video.currentTime)
		// console.log(video.currentTime + "   "+ video.buffered.start(video.buffered.length -1) + "  " +video.buffered.end(video.buffered.length-1) + "   " + video.buffered.length )

	})

	
	video.addEventListener("seeking",()=>{
		const buffCLen = video.buffered.length -1 ;
		const buffStart = video.buffered.start(buffCLen);
		const buffEnd = video.buffered.end(buffCLen);
		console.log("Seeked")


	})
}
function loading_() {
	video.addEventListener('waiting',(e)=>{
		loader.style.display = "block"
	})
	video.addEventListener("playing",()=>{
			loader.style.display = "none";

	})
}
function ended_ () {
	video.addEventListener("ended",()=>{
		seekBar.value = 0;
		playBtn.style.display = "inline";
		pauseBtn.style.display = "none"
	})
}
function download (){

}
function subtitles (){

}
function thumbnails(){

}
function preloadImg(){
	//like youtube showing imgs down
}


Buffer_();
loading_()
onPlaying()
play_pause();
seekBar_();
volumeBar_();
playbackRate()
PiP_();
Mute_();
ended_()