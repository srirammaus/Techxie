/**
 * Specfically for webdrive page responsiveness and this is for more than 800
 */

import Elements from '/scripts/lib/Elements.lib.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import pageURLs from "/scripts/utils/pageURLs.js";
/**
 * my category
 * onload
 * onDOMcontentloaded
 * resize
 * */


export class WebDrive {
	constructor (){
		//below should be static later
		//,F_num =0F_id="F-0",f_num = 0,f_id ="f-0-0", -  just to remaind these are default values
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
	OnContentloaded() { //before asets download
		window.addEventListener('DOMContentLoaded',()=>{

		})
		
		
	}
	OnLoad(){ //after assets download
		window.addEventListener('load',()=>{ 
			this.header();
			this.mainFunc();
			Weblib.fetchIfrPage(Elements.iframe_element,pageURLs.home,"POST",Elements.bodyParams).then((ifr) => {
					WebDrive.iframe_();
				
			})
		
		
			
		})

	}
	OnResize(){ //while resizing..
		
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
			  data: "/assets/svg/header_wave.svg",
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
		// this.folder_map.style.height = "15%";
	
		
	}

	/**
	 * The lib function must be promise or async await
	 * This  function sets with and height for the iframe , first this verified whether iframe is alive or not
	 */
	static  iframe_(elem) {

		Elements.iframe_ ().then(function(elem) {	
			if(elem[0] == true) {
				elem[1].style.setProperty('height',(80/100 * window.screen.height) +'px');
			}
		})
	}

}

