
// export 

export class WebDrive {
	constructor(){
		//initialize	
		const FILE = ["Home","Recents","settings"];
		const URL = "http://techxie.local:3000/"
		const extension = ".html";
		// var small_frame_items = document.querySelector('.small-frame-items');
		// var wave = document.querySelector('.wave');
		// var wave_object = document.querySelector('.wave-obj');
		var header_ = document.querySelector('.header');
		var header_container = document.querySelector('.header-container');
		var search_dropdown = document.querySelector('.search-dropdown');
		var search_bar_input = document.querySelector('.search-bar .wrapper input');
		var nav_drawer = document.querySelector('.nav-drawer');
		var nav_drawer_close = document.querySelector('.nav-profile-container[attr="cont-3"] ');
		var nav_items = document.querySelector(".nav-items");
		var profile  = document.querySelector('.profile');
		var folder_map = document.querySelector('.Folder-map');
		var main = document.querySelector('.main');
		// alert("innerHeight : " + window.outerHeight);
		// alert("innerWidth  :" + window.outerWidth);

		//setting

		this.search_dropdown = search_dropdown;
		this.search_bar_input =  search_bar_input;
		this.nav_drawer = nav_drawer;
		this.nav_items = nav_items;
		this.profile= profile;
		this.nav_drawer_close = nav_drawer_close;
		this.header_container = header_container;
		// this.wave_object = wave_object;
		// this.wave = wave;
		this.folder_map = folder_map;
		this.main= main;
		this.header_ =  header_;
		this.FILE = FILE;
		this.URL = URL;
		this.extension = extension;
		

		
		//Run
		this.OnLoad();
		this.OnResize();
		this.OnClick();

		this.header();
		this.main_();
		this.iframe_();
		// this.GeneralEventListeners();
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
				this.iframe_()
			}
		})
	}
	OnLoad () {
		window.addEventListener('load',()=>{
			// console.log("i happend web 2 load ")
			// this.header();
			// this.main_();
			// this.iframe_();

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
			// waveContainer.style.transform = 'translate(0%, -5%)';

			var svg = document.createElement("object");
			this.svg = svg;
			svg.className = svgObj.class;
			svg.setAttribute("data", svgObj.data);
			svg.setAttribute("type", svgObj.type);

			waveContainer.appendChild(svg);

			// Assuming `this.header_` is correctly defined and accessible
			this.header_.prepend(waveContainer);

			// Move the height adjustment logic inside the load event listener
			svg.addEventListener("load", ()=> {
			  // console.log(waveContainer.getBoundingClientRect().height + " Load event");
			  this.header_container.style.height = this.svg.getBoundingClientRect().height + 'px';
			  this.header_container.style.width = '100%';
			  this.header_container.style.transform = 'translate(0%,-5%)';
			})		
		}else {
			
			this.header_container.style.height = document.querySelector(".wave-obj").getBoundingClientRect().height + 'px';
			this.header_container.style.width = '100%';
			this.header_container.style.transform = 'translate(0%,-5%)';
		}
		// this.header_container.style.height = this.wave_object.getBoundingClientRect().height + 'px';
		// this.header_container.style.transform = 'translate(0%,-5%)';
		// this.wave.style.transform = 'translate(0%,-5%)';
		// console.log(this.wave_object.getBoundingClientRect().height , this.wave_object.getBoundingClientRect().y);
		//setWave
		// breakpoints : width : 800 , 1600.
		// alert("i tampering..")
		// this.wave_object.style.transform =  'translate(0%,-5%)';
		//header_container 
		//  + this.wave_object.getBoundingClientRect().y + 'px'

	}

	main_() {

		this.main.style.setProperty('height','auto');
		// this.main.style.setProperty('height',(80/100 * window.screen.height) +'px');
		this.folder_map.style.setProperty('height',(10/100 * window.screen.height) + 'px');
		this.nav_drawer.style.width = "0%";


	}
	iframe_() {
		var iframe = document.getElementById("iframe-doc");
		var iframeDocument = iframe.contentWindow.document;
		var iframe_small_frame_items = iframeDocument.querySelector('.small-frame-items'); //For trash and Recents
		var iframe_settings = iframeDocument.querySelector('.settings');
		
		this.iframe = iframe;
		this.iframeDocument = iframeDocument;
		this.iframe_small_frame_items= iframe_small_frame_items;
		this.iframe_settings = iframe_settings;

		function default_() {
			// this.iframe.src = this.URL + this.FILE[0] + this.extension;
			this.iframe.addEventListener('load',()=>{
				this.iframe_();
			})

		}
		default_ = default_.bind(this)

		if(this.isValidIfr()){

			if(this.iframeDocument.readyState == 'complete'){
				console.log(this.iframeDocument.readyState)
				if(this.isIframeNotEmpty()){
					this.iframe.style.setProperty('height',(80/100 * window.screen.height) +'px');
					this.iframeDocument.body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');

				}else{
					default_();
				}
			}
			else {
				console.log(this.iframeDocument.readyState)
				
				this.iframe.contentWindow.addEventListener("load", () =>{
					if(this.isIframeNotEmpty()){
						this.iframe.style.setProperty('height',(80/100 * window.screen.height) +'px');
						this.iframeDocument.body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
					}else{
						console.log("Happend at 2..")
						default_()
					}

				})
			}
		}else{
			default_();
		}
	

	}
	isValidIfr () {

		if(!this.iframe || !this.iframeDocument){
			console.log(this.iframe.src)
			console.log("I detect this .." + this.iframeDocument)
			return false;
		}
		return true;
	}
	isIframeNotEmpty() {

		if(this.iframeDocument.body.children.length === 0 ){
			console.log(this.iframe.src)
			console.log("I detect this ..2   " + this.iframeDocument.body.children.length)
			return false;
		}			
		return true;
		
	}

	reload() {
		window.location.reload()
	}
	HandleViewerport() {
		var WL = window.matchMedia("(orientation: landscape) ")
		WL.addEventListener("change",function(){
			// alert("im first WL")
		})
	}
}

// new WebDrive()

// hidden when height gets low and width got hig
//if height gets low then it should reduce their height and while width got increase tranlate should [increase ] this should be decreased