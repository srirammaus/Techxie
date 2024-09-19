/**
 * Specfically for webdrive page responsiveness and this is for less than 800
 */
import Elements from '/scripts/lib/Elements.lib.js';
import * as driveFunc from "/scripts/lib/webdrive.lib.js";
import * as Weblib from "/scripts/lib/webdrive.lib.js";
// export 

export class WebDrive {
	constructor(){
		//initialize

		this.search_dropdown = Elements.search_dropdown;
		this.search_bar_input =  Elements.search_bar_input;
		this.nav_drawer = Elements.nav_drawer;
		this.nav_items = Elements.nav_items;
		this.profile= Elements.profile;
		this.nav_drawer_close = Elements.nav_drawer_close;
		this.header_container = Elements.header_container;
		this.folder_map = Elements.folder_map;
		this.main= Elements.main;
		this.header_ =  Elements.header_;
		this.FILE = Elements.FILE;
		this.URL = Elements.URL;
		this.extension = Elements.extension;
		

		
		//Run
		this.OnLoad();
		this.OnResize();
		this.OnClick();

		this.header();
		this.main_();
		this.HandleViewerport()
	}
	OnClick(){
		window.addEventListener('click',()=>{
	
		})
	}
	OnResize () {	
		window.addEventListener('resize',()=>{
			if(window.innerWidth < 800 ){
				console.log("i happend web 2 resize ")
				this.header();
				this.main_();
				
				WebDrive.iframe_()
			}
		})
	}
	OnLoad () {
		window.addEventListener('load',()=>{
			this.homePage()
			Weblib.fetchPage(Elements.iframe_element,0).then((flag) => {
				WebDrive.iframe_();
				
			})

		})
	}

	header() {
		if(!document.querySelector(".wave-obj")){
			
			const waveContainerObj = {
			  class: "wave",
			};

			const svgObj = {
			  data: "assets/svg/header_wave.svg",
			  class: "wave-obj",
			  type: "image/svg+xml",
			};

			var waveContainer = document.createElement("div"); // Corrected tag name
			this.waveContainer = waveContainer;
			waveContainer.className = waveContainerObj.class;

			var svg = document.createElement("object");
			this.svg = svg;
			svg.className = svgObj.class;
			svg.setAttribute("data", svgObj.data);
			svg.setAttribute("type", svgObj.type);

			waveContainer.appendChild(svg);

			this.header_.prepend(waveContainer);

			svg.addEventListener("load", ()=> {
			  this.header_container.style.height = this.svg.getBoundingClientRect().height + 'px';
			  this.header_container.style.width = '100%';
			  this.header_container.style.transform = 'translate(0%,-5%)';
			})		
		}else {
			
			this.header_container.style.height = document.querySelector(".wave-obj").getBoundingClientRect().height + 'px';
			this.header_container.style.width = '100%';
			this.header_container.style.transform = 'translate(0%,-5%)';
		}


	}

	main_() {

		this.main.style.setProperty('height','auto');
		this.folder_map.style.setProperty('height',(10/100 * window.screen.height) + 'px');
		this.nav_drawer.style.width = "0%";


	}
		/**
	 * The lib function must be promise or async await
	 * This  function sets with and height for the iframe , first this verified whether iframe is alive or not
	 */
	homePage () { // default
		//we can also use srcdoc but it is not gauranteed , because browser compactibility
		driveFunc.fetchPage(Elements.iframe_element,0);
	
	}
	static iframe_() {
		
		Elements.iframe_ ().then(function(elem) {	
			if(elem[0] === true){
				console.log("reached here")
				elem[1].style.setProperty('height',(80/100 * window.screen.height) +'px');
				elem[2].body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
			}
		})
	}

	reload() {
		window.location.reload()
	}
	/**
	 * For the Orientation
	 */
	HandleViewerport() {
		var WL = window.matchMedia("(orientation: landscape) ")
		WL.addEventListener("change",function(){
		})
	}
}

// new WebDrive()

// hidden when height gets low and width got hig
//if height gets low then it should reduce their height and while width got increase tranlate should [increase ] this should be decreased