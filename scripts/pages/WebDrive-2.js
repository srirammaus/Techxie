/**
 * Specfically for webdrive page responsiveness and this is for less than 800
 */
import Elements from '/scripts/lib/Elements.lib.js';
import * as Weblib from "/scripts/lib/webdrive.lib.js";
import pageURLs from "/scripts/utils/pageURLs.js";
import * as WebDrivepageFunc2 from "/scripts/pages/WebDrivepageFunc2.js"

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
		this.driveUpload = Elements.driveUpload;
		this.driveUploadInput = Elements.driveUploadInput;
		this.createFolder = Elements.createFolder;
		this.addFiles = Elements.addFiles ;
		this.addFilesMenu = Elements.addFilesMenu;
		this.iframe_element = Elements.iframe_element;
		
		
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
			this.addFiles_()
			this.upload()
			this.goBack()
			this.createFolder_()
			Weblib.fetchIfrPage(Elements.iframe_element,pageURLs.home,"POST",Elements.bodyParams).then((ifr) => {
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
		this.nav_drawer.style.width = "0%";
		this.folder_map.style.setProperty('height',(10/100 * window.screen.height) + 'px');



	}
		/**
	 * The lib function must be promise or async await
	 * This  function sets with and height for the iframe , first this verified whether iframe is alive or not
	 */

	static iframe_() {
		
		Elements.iframe_ ().then(function(elem) {	
			if(elem[0] === true){
				console.log("reached here")
				elem[1].style.setProperty('height',(80/100 * window.screen.height) +'px');
			}
		})
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