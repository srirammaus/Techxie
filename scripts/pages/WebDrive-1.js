
import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
import Elements from '/scripts/lib/Elements.js';
/**
 * my category
 * onload
 * onDOMcontentloaded
 * resize*/
// export 

export class WebDrive {
	constructor (){
		//below should be static later


		this.folder_wrapper = Elements.folder_wrapper;
		this.folder_map = Elements.folder_map;
		this.Recents = Elements.Recents;
		this.header_ =  Elements.header_;
		this.header_container = Elements.header_container;
		this.nav_drawer  = Elements.nav_drawer;
		this.nav_drawer_close = Elements.nav_drawer_close;
		this.main= Elements.main;
		this.FILE = Elements.FILE;
		this.URL = Elements.URL;
		this.extension = Elements.extension;
		this.search_bar_input = Elements.search_bar_input;
		this.search_dropdown = Elements.search_dropdown;
		

		//Run
		this.header();
		this.mainFunc();

		this.OnContentloaded();
		this.OnLoad();
		this.OnResize();
		



	}
	OnContentloaded() {
		window.addEventListener('DOMContentLoaded',()=>{

		})
		
		
	}
	OnLoad(){
		window.addEventListener('load',()=>{ 
			this.header();
			this.mainFunc();
			WebDrive.iframe_()
			
		})

	}
	OnResize(){
		
		window.addEventListener('resize',()=>{
			if(window.innerWidth > 800) {
				WebDrive.iframe_()
			}
		})
	}


	
	header (){
	
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
			  this.header_container.style.transform = 'translate(0%,-25%)';
			});
		}else{
	  		this.header_container.style.height = document.querySelector(".wave-obj").getBoundingClientRect().height + 'px';
			this.header_container.style.width = '100%';
			this.header_container.style.transform = 'translate(0%,-25%)';
		}
	


	}

	mainFunc(){
		var Height = window.screen.height;
		this.main.style.setProperty('height',Height + 'px')
		this.nav_drawer.style.width = '17%';
		this.folder_map.style.height = "15%";
	
		
	}
	//The lib function must be promise or async await
	static iframe_() {
		Elements.iframe_ ().then(function(elem) {	
			
			if(elem[0] === true) {
				elem[1].style.setProperty('height',(80/100 * window.screen.height) +'px');
				elem[2].body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
			}
		})

	}

}

