
import * as ExceptionHandler from '/scripts/utils/ExceptionHandler.js';
/**
 * my category
 * onload
 * onDOMcontentloaded
 * resize*/
// export 
export class WebDrive {
	constructor (){
		const FILE = ["Home","Recents","settings"];
		const URL = "http://techxie.local:3000/"
		const extension = ".html";

		// var wave = document.querySelector('.wave');
		// var wave_object = document.querySelector('.wave > object');
		// var small_frame_items = document.querySelector('.small-frame-items');
		// var small_File  = document.querySelector('.small-File');
		// var small_File_a = document.querySelectorAll('.small-File div[attr="small-File-name"] a ');
		var header_= document.querySelector('.header')
		var header_container = document.querySelector('.header > .header-container');
		var search_dropdown = document.querySelector('.search-dropdown');
		var search_bar_input = document.querySelector('.search-bar .wrapper input');
		var nav_drawer = document.querySelector('.nav-drawer');
		var nav_drawer_close = document.querySelector('.nav-profile-container[attr="cont-3"] ');
		var profile  = document.querySelector('.profile');
		var folder_map = document.querySelector('.Folder-map');
		var nav_drawer = document.querySelector('.nav-drawer');
		var main = document.querySelector('.main');
		var Recents = document.querySelector('.nav-item[attr=Recents]')
		var folder_wrapper = document.querySelector('.Folder-wrapper > div > a');
	

		
		// this.small_frame_items = small_frame_items;
		// this.small_File_a = small_File_a;
		// this.small_File = small_File;
		this.folder_wrapper = folder_wrapper;
		this.folder_map = folder_map;
		this.Recents = Recents;
		this.header_ =  header_;
		this.header_container = header_container;
		this.nav_drawer  = nav_drawer;
		this.nav_drawer_close = nav_drawer_close;
		this.main= main;
		this.FILE = FILE;
		this.URL = URL;
		this.extension = extension;
		// this.wave = wave;
		// this.wave_object = wave_object;

		this.search_bar_input = search_bar_input;
		this.search_dropdown = search_dropdown;
		


		//Run
		this.header();
		this.mainFunc();
		this.iframe_()

		

		// alert(window.innerHeight);
		this.OnContentloaded();
		this.OnLoad();
		this.OnResize();
		



	}
	OnContentloaded() {
		window.addEventListener('DOMContentLoaded',()=>{
			// alert('checking...')
		})
		
		
	}
	OnLoad(){
		window.addEventListener('load',()=>{ 
			// console.log("i happend web 1 load ")
			// this.header();
			// this.mainFunc();
			// this.iframe_()
			// because it having img and we using img size as height
			
		})

	}
	OnResize(){
		
		window.addEventListener('resize',()=>{
			if(window.innerWidth > 800) {
				this.header();
				this.mainFunc();
				this.iframe_()
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
			// waveContainer.style.transform = 'translate(0%, -25%)';

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
			  this.header_container.style.transform = 'translate(0%,-25%)';
			});
		}else{
	  		this.header_container.style.height = document.querySelector(".wave-obj").getBoundingClientRect().height + 'px';
			this.header_container.style.width = '100%';
			this.header_container.style.transform = 'translate(0%,-25%)';
		}
	


		// this.header_container.style.height = svg.getBoundingClientRect().height + 'px';
		// this.header_container.style.transform = 'translate(0%,-25%)';
		// this.wave.style.transform = 'translate(0%,-25%)';
		//There is no problem with this-----------

		// this.header_container.style.backgroudColor = 'yellow';
		// (svg problem occuring here also, if svg not loaded this subraction never happen wave seems ugly)
		// this.header_container.style.height = (80/100 * window.innerHeight) + 'px';
	}

	mainFunc(){
		var Height = window.screen.height;
		this.main.style.setProperty('height',Height + 'px')
		this.nav_drawer.style.width = '17%';
		this.folder_map.style.height = "15%";
		// this.small_frame_items.style.setProperty('height',(80/100 * window.screen.height) +'px');

		// this.iframe.onload = ()=>{

		// 	this.iframe.style.setProperty('display','flex');
		// 	this.iframe.style.setProperty('height',Height + 'px');
		// 	try {
		// 		// this.iframeDocument.body.children[0].style.setProperty('display','block');
		// 		this.iframeDocument.body.children[0].style.setProperty('height', Height+ 'px');
		// 	} catch(e) {
		// 		// statements
		// 		console.log(e);
		// 		// redirection
		// 	}

		// }	
		// this.iframeDocument.body.children[0].style.setProperty('background-color','yellow');

		
	}
	//please check this after height function only works other
	iframe_() {
		var iframe = document.getElementById("iframe-doc");
		var iframeDocument = iframe.contentWindow.document;
		var iframe_small_frame_items = iframeDocument.querySelector('.small-frame-items'); //For trash and Recents
		var iframe_settings = iframeDocument.querySelector('.settings');
		
		this.iframe = iframe;
		this.iframeDocument = iframeDocument;



		function default_() {
			// this.iframe.src = this.URL + this.FILE[0] + this.extension;
			this.iframe.addEventListener('load',()=>{
				this.iframe_();
			})

		}
		default_ = default_.bind(this)
		if(this.isValidIfr()){

			if(this.iframeDocument.readyState == 'complete'){
			
				if(this.isIframeNotEmpty()){					
					this.iframe.style.setProperty('height',(80/100 * window.screen.height) +'px');
					this.iframeDocument.body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');

				}else{
			
					default_()
			

				}
			}else {
		
				
				this.iframe.contentWindow.addEventListener("load", () =>{
					if(this.isIframeNotEmpty()){
						this.iframe.style.setProperty('height',(80/100 * window.screen.height) +'px');
						this.iframeDocument.body.children[0].style.setProperty('height',(80/100 * window.screen.height) +'px');
					}else{
			
						default_()
					}

				})
			}

		}else{
			default_()
			// this.small_frame_items.style.setProperty("display","flex");
		}


	}
	isValidIfr () {

		if(!this.iframe || !this.iframeDocument){
			// console.log(this.iframe.src)
			// console.log("I detect this .." + this.iframeDocument)
			return false;
		}
		return true;
	}
	isIframeNotEmpty() {
		if(this.iframeDocument.body.children.length === 0 ){
			return false;
		}			
		return true;
		
	}
	toRedirect (val) {

		window.location.href = FILE[val] + ".html"
	}
	toReload() {
		window.location.reload()
	}

}

