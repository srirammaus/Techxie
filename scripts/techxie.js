// techxie javscript controller
import apiConfig from "./utils/apiConfig.js";

class techxie_{
	// #name = "shriram"; //private fields
	#nav_list = document.getElementById("nav_list");
	#nav_bar_btn = document.getElementById("hamburger");
	#close_btn = document.getElementById('close-bar');
	#dropdown = document.getElementById("dropdown");
	#dropdown_content = document.getElementById("dropdown-content");
	#Home = document.getElementById("Home");
	#home_img = document.getElementById("home-images");
	#btn_1= document.getElementById("btn-1");
	#btn_2= document.getElementById("btn-2");
	#gallery_container = document.getElementById("gallery-container")
	#main_section_container = document.getElementById("main-section-container")
	constructor(){
		this.onload();
		this.onresize();
		this.defaults();
		this.nav_bar();
		this.tools_lst_()
		this.project_container(6);
		this.project_card();
		this.gallery();
		this.contact_svg();
		this.contact();
		this.dump();
	}

	onload(){
		var Home,getWidth,home_img;
		Home = this.#Home;
		home_img = this.#home_img;
		window.addEventListener("load",function(){
			getWidth = document.documentElement.clientWidth;
			if(getWidth < 800 ){
				// home_img.style = {back}
			}
		})
	}
	onresize(){
		window.addEventListener("resize",()=>{
			this.contact();
		})
	}
	defaults(){ //things should be in some default places  when they called they have to show up themselves, unless they have to hide
		var getWidth,in_nav_list,in_dropdown_content,Home;
		in_nav_list = this.#nav_list; 
		in_dropdown_content = this.#dropdown_content;
		window.addEventListener("resize",function(){
			getWidth = document.documentElement.clientWidth;
			in_dropdown_content.style.height = "0";
			if(getWidth > '800'){
				in_nav_list.style.width = "100%"
			}
		})
	}
	nav_bar(){
		var in_nav_list = this.#nav_list; //in -  denotes the name of the variable we declared inside the function
		var in_dropdown_content = this.#dropdown_content;
		this.#nav_bar_btn.addEventListener("click", function(){
			// in_nav_list.style= {"display":" block"}
			in_nav_list.style.width = "100%";
			in_nav_list.style.overflow = "hidden";
		})
		this.#close_btn.addEventListener("click",function(){
			in_nav_list.style.width = "0"
		});
		this.#dropdown.addEventListener("click",function(){
			var Height = getComputedStyle(in_dropdown_content).height;
			if( Height == "200px"){
				in_dropdown_content.style.height = "0";
			}else{
				in_dropdown_content.style.height = "200px";
			}
		})

	}
	async tools_lst_(){ //get it through cdn , lets create that today iteself
		var resp = await fetch(apiConfig.tool_lstAPI);
		var tools_lst = await resp.json();
		console.log(tools_lst)
	}
	project_container(n_project_cards) { // get the n number of cards through cdn
		var btn,btn_1_x_y, btn_2_x_y, clicks;
		var prj_c_x_y,prj_c_styles,y_prj_c_x_y ,x_btn_1;
		var prj_card,prj_card_x_y,prj_card_w,total_width,last_12_percentage,default_prj_card_margin_left,default_prj_card_height ;
		var project_container = document.querySelector(".project-container");
		var elem_project_container = document.getElementById("project-container")
		for (let i=0; i< n_project_cards; i++){
			var project_card = document.createElement("div");
			var project_Thumbnail = document.createElement("div");
			//we can also use Document.Fragment to store the element instead of array 
			project_card.className = "project-card";
			project_Thumbnail.className = "project-Thumbnail"
				project_container.append(project_card)
				project_card.append(project_Thumbnail);
		}
		btn = document.querySelectorAll(".btn")
		btn_1_x_y = this.#btn_1.getBoundingClientRect();
		btn_2_x_y = this.#btn_2.getBoundingClientRect();
		prj_card = document.querySelectorAll(".project-card");
		default_prj_card_height = getComputedStyle(prj_card[0]).height.split("px")[0]
		default_prj_card_margin_left = getComputedStyle(prj_card[0]).marginLeft.split("px")[0];			
		prj_card_w = getComputedStyle(prj_card[0]).width.split("px")[0];
		var total = Number(prj_card_w) + Number(default_prj_card_margin_left);
		this.#btn_1.addEventListener("click",()=>{ //backward btn
			default_prj_card_margin_left = getComputedStyle(prj_card[0]).marginLeft;
			project_container.scrollBy("-"+total,project_container.getBoundingClientRect().y)

		})
		this.#btn_2.addEventListener("click",()=>{ //forward btn
			project_container.scrollBy(total,project_container.getBoundingClientRect().y)
		});
		window.addEventListener("scroll",function(event){
			prj_c_x_y = elem_project_container.getBoundingClientRect();
			prj_c_styles = getComputedStyle(elem_project_container).height.split('px')[0];
			y_prj_c_x_y = prj_c_x_y.y;
			x_btn_1 = btn_1_x_y.y;
			if(y_prj_c_x_y < x_btn_1 && y_prj_c_x_y > 0 && y_prj_c_x_y < prj_c_styles){
				for (let i in btn) {
					btn[i].style.visibility = 'visible';
				}
			}else{
				for (let i in btn) {
					btn[i].style.visibility = 'hidden';
				}
			}
		})
		project_container.addEventListener("scroll",function(){
			total_width = window.innerWidth;
			last_12_percentage = 12/100 * window.innerWidth; //the 12 defines the 12% of width that is what we gonna convert 
			for (let i in prj_card){
				prj_card_x_y = prj_card[i].getBoundingClientRect();
				if( prj_card_x_y.x < 0 || prj_card_x_y.x > total_width - last_12_percentage){
					prj_card[i].style.opacity = ".5";
					prj_card[i].style.height = Number(default_prj_card_height)/2 + "px";
					prj_card[i].style.marginBottom = Number(default_prj_card_height)/4 + "px";
				}else{
					prj_card[i].style.opacity = "10";
					prj_card[i].style.height = default_prj_card_height + "px";
					prj_card[i].style.marginBottom = "0px";
				}
				// prj_card_x_y = null;
				// alert(JSON.stringify(prj_card_x_y))
			}
			
		})
	}
	project_card(){
		var prj_card,project_Thumbnail,project_card_Desc_container,project_card_Desc,content;//limited content soulfd dbe allowed like 50 words
		content = "This poject descriptiotn here the stuff here the stuffhere the stuffhere the stuffhere the stuffhere the stuffhere the stuff";
		prj_card = document.querySelectorAll(".project-card")
		project_Thumbnail = document.querySelectorAll(".project-Thumbnail");
		for (let i in project_Thumbnail){
			project_card_Desc_container = document.createElement("div")
			project_card_Desc = document.createElement("p");
			project_card_Desc_container.className = "project-card-Desc-container";
			project_card_Desc.className = "project-card-Desc";
			if(i == "entries") break; //why this? untill the i reached 5 ther will be no uncaought error[cannot set property of undefined ] but here after 5 in i  there is a string called "entries" idk whether it came from project_Thumbnail or this kind of for in loop , it causes undefined error so it not letting next function work 
			project_Thumbnail[i].style.backgroundImage = "url('http://techxie.local/asserts/nav-bg.jpg')";
			prj_card[i].addEventListener("click",function(){
				window.open("http://bing.com")
			})
			prj_card[i].append(project_card_Desc_container)
			project_card_Desc_container.append(project_card_Desc);
			project_card_Desc.innerHTML = content.toString()
		}
	}
	gallery(){
		// there are two types of displays they are small width and high height , then another one is 
		// big width and less height compared to their width 
		var gallery_container_styles,main_img,gallery_img,top;
		gallery_container_styles= this.#gallery_container;
		main_img = document.querySelector(".main-img");
		gallery_img =  document.querySelector(".gallery-img");
		window.addEventListener("load",function(){
			window.innerWidth < window.innerHeight ? main_img.style.maxHeight = 40/100 * window.innerHeight + "px": main_img.style.maxHeight = 70/100 * window.innerHeight + "px"
			// gallery_container_styles.style.height = 75/100* window.innerHeight + "px"
		})
		window.addEventListener("resize",function(){
			window.innerWidth < window.innerHeight ? main_img.style.maxHeight = 40/100 * window.innerHeight + "px": main_img.style.maxHeight = 70/100 * window.innerHeight + "px"
			// gallery_container_styles.style.height = 75/100* window.innerHeight + "px"
		})
		
		// gallery_container_styles = this.#gallery_container.getBoundingClientRect();
		// top = gallery_container_styles.height/2;
		// a use full one :  but not used in our prjoect document.styleSheets[2].insertRule(`.gallery-container::before,.gallery-container::after {top: ${top}px}`)	
		// document.getElementById("gallery-container").className += "Add";
		// this.#main_section_container.innerHTML = "#gallery_container:before{content: 'bacllll'}"
		// this.#gallery_container.style.marginTop = "175px";
		// alert(this.#gallery_container.style.getPropertyValue("--color-main"))
		// this.#gallery_container.style.setProperty("--color-main","blue")
	}
	contact_svg(){
		//getting svg
		//defining and appending pat,setting classname
		var contact_svg = document.querySelector(".contact-svg");
		var contact_svg_path = document.createElementNS("http://www.w3.org/2000/svg","path");
		contact_svg_path.setAttribute("class","contact-svg-path")
		contact_svg.appendChild(contact_svg_path);
	}
	contact(){
		//path -svg -calculator
		//no of curves - 2
		//type of curve one up and down
		var contact_svg_width,contact_svg_height;
		var Cx1,Cy1,Cx2,Cy2,Cx,Cy;
		var Sx2,Sy2,Sx,Sy;
		var Mx,My;
		var L1x,L1y;
		var L2x,L2y;
		var Vx,Vy,Hx,Hy;
		var contact_svg = document.querySelector(".contact-svg");
		var contact_svg_path = document.querySelector(".contact-svg-path");
		contact_svg_width = window.innerWidth;
		contact_svg_height = contact_svg.getBoundingClientRect().height;
		Mx=0;My=60/100 * contact_svg_height;Cx1=16.5/100*contact_svg_width;Cy1=20/100*contact_svg_height;Cx2=33/100*contact_svg_width;Cy2=20/100*contact_svg_height;Cx=50/100*contact_svg_width;Cy=60/100*contact_svg_height;
		Sx2 = (100-16.5)/100 * contact_svg_width;Sy2 = (100-20)/100*contact_svg_height; Sx= (50+50)/100 * contact_svg_width;Sy=(100-60)/100*contact_svg_height;
		L1x = contact_svg_width; L1y = contact_svg_height;
		L2x = 0; L2y = contact_svg_height;
		contact_svg_path.setAttribute("d",`M${Mx} ${My} C ${Cx1} ${Cy1} ${Cx2} ${Cy2} ${Cx} ${Cy} S ${Sx2} ${Sy2} ${Sx} ${Sy} L${L1x} ${L1y} L ${L2x} ${L2y}`);
		contact_svg_path.setAttribute("style","fill: lime;stroke-width:0;stroke: none;fill-rule:evenodd;fill-opacity:.2;")

	}
	dump(){
		console.log("im still alvie")
	}
	
}
new techxie_();

process.on("uncaughtException",(err,src)=>{
	console.log(err)
	if(err instanceof TypeError) {
		console.log("This is TypeError")
	}
})
// for (let i in project_Thumbnail){
// 			project_card_Desc_container = document.createElement("div")
// 			project_card_Desc = document.createElement("p");
// 			project_card_Desc_container.className = "project-card-Desc-container";
// 			project_card_Desc.className = "project-card-Desc";
// 			project_Thumbnail[i].style.backgroundImage = "url('http://techxie.local/asserts/nav-bg.jpg')";
// 			// project_Thumbnail[i].innerHTML = contents
// 			prj_card[i].addEventListener("click",function(){
// 				window.open("http://bing.com")
// 			})
// 			prj_card[i].append(project_card_Desc_container)
// 			project_card_Desc_container.append(project_card_Desc);
// 			project_card_Desc.innerHTML = content.toString()
// 		}

// techxie.tools_lst_()
// console.log("backward pagexoffset: "+ project_container.scrollHeight+ " pageYOffset : "+ project_container.scrollWidth )
// alert("Forward pagexoffset: "+ project_container.pageXOffset + " pageYOffset : "+ project_container.scrollY )




