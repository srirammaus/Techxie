/**
 * Specfically for webdrive page responsiveness and this is for more than 800
 */

import Elements from '/scripts/lib/Elements.lib.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import pageURLs from "/scripts/utils/pageURLs.js";
import apiConfig from '/scripts/utils/apiConfig.js';
import * as WebDrivepageFunc2 from "/scripts/pages/WebDrivepageFunc2.js"
import IfrElements from '../lib/Ifrlib/IfrElements.lib.js';
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
		this.driveUpload = Elements.driveUpload;
		this.driveUploadInput = Elements.driveUploadInput;
		this.createFolder = Elements.createFolder;
		this.addFiles = Elements.addFiles ;
		this.addFilesMenu = Elements.addFilesMenu;
		this.iframe_element = Elements.iframe_element;

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
			this.addFiles_();
			this.upload();
			this.goBack();
			this.createFolder_()

			//By default the Element.bodypararms.F_num is zero , so dont need to get that from the session storage
			//page url is now temporary
			Weblib.fetchIfrPage(Elements.iframe_element,pageURLs.home,"POST",Elements.bodyParams).then((ifr) => {
					WebDrive.iframe_();	
			})
			
		})

	}
	OnResize(){ //while resizing..
		
		window.addEventListener('resize',()=>{
			if(window.innerWidth > 800) {
				this.header();
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
			  console.log(document.querySelector(".wave-obj").getBoundingClientRect().height + 'px' + "before")

			  this.header_container.style.width = '100%';
			  this.header_container.style.transform = 'translate(0%,-25%)';
			});
		}else{
	  		this.header_container.style.height = document.querySelector(".wave-obj").getBoundingClientRect().height + 'px';
			console.log(document.querySelector(".wave-obj").getBoundingClientRect().height + 'px' + "After")
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
	addFiles_() {
		let addFilesMenu = this.addFilesMenu;
		
		// this.addFiles.addEventListener("click",function(e){
		// 	e.stopPropagation()
		// 	if(window.getComputedStyle(addFilesMenu).display == "none" ){

		// 		addFilesMenu.style.display = "flex"
		// 	}else {
		// 		addFilesMenu.style.display = "none"

		// 	}
		// })
		this.addFiles.addEventListener("click",(e)=>{
			e.stopPropagation();
			addFilesMenu.classList.toggle("show")
		})
	}
	upload () {
		/** upload and show some loading graphics */
		let driveUploadInput = this.driveUploadInput
		this.driveUpload.addEventListener("click",function(){
			WebDrivepageFunc2.upload()
		})
		// Weblib.uploadFile
	}
	createFolder_ () {	
	
		this.createFolder.addEventListener("click",(e)=>{
			
			WebDrivepageFunc2.createFolder_().then((result)=>{
				result = JSON.parse(result)
				if(result.info != null || result.info != undefined) {{
					let F_id = result.info.F_id;
					Elements.iframe_().then((elem)=>{
						if(elem[0]){
							console.log(F_id)
							let element = elem[2].querySelector("#"+F_id);
							element.querySelector('div[attr="small-Folder-name"]').classList.toggle("hide-name");
							element.querySelector('input[attr="small-Folder-new-name"]').classList.toggle("show-input")
							// element.classList.add(".show-input")
							sessionStorage.setItem("renameFolder",F_id?F_id: "F-" +1);
							//After this balance process has been undertaken by iframe,In iframe im adding input lisnter
						}
					})
				}}
			})

		})
	}
	
	goBack () {
		Elements.BackBtn.addEventListener("click",function(){
			// Weblib.cacheIfrPage(Elements.iframe_element,pageURLs.home,Weblib.getCurrentFolder())
			WebDrivepageFunc2.Back()
		})
	}
	photoViewer () {

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

