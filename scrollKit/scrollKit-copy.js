/**scroll kik
 * a clone like a scroll environment, whatever that happens in scroll that should be run here
 * if space bar clicked then it should go down
 * **/
//default +  getting css 

// some things should not be changed , by using obejct descriptors
// enumnerables - display,position,z-index,float
// writeable - background color,width of thumb , rounder corners

//TO MAKE THEM  WORK , MAKE IT AS INDEPENDENT

var Css = {

	scroll_bar:{
		display: "inline-block",
		top:'0px',
		position:"sticky",
		"z-index":"999",
		height:"inherit",
		width:"10px",
		float:"right",
		"background-color":" inherit",
	},
	scroll_track: {
		display:"block",
		// CHECK
		top: '0px',
		position: "sticky",
		"z-index": "1000",
		//#f2f2f2
		"background-color":"black",
		width: "inherit", 
		height: "inherit",
	},
	scroll_thumb: {
		display:"inline-block",
		position:"absolute",
		width:"inherit",
		"margin-top" : "0px",
		'background-color': 'blue',
		/*#b3b3b3*/
		"z-index":"10001",
	},
}
// for (let prop in Css){
// 	Object.defineProperties(Css.scroll_bar, {

// 	})
// }
//non-writables  - position , z-index 
var non_writables = ['position','display','z-index'];
// for (let prop  in Css) {
// 	if(prop )
// 	for (let property  of non_writables){
// 		console.log(property);
// 		Object.defineProperties(Css[prop],{
// 			[property] :{value: `${Css[prop][property]}`,writable:false,configurable: true}
// 		})
// 	}
	
// }




class scrollKit {
	#default_css_path = "";
	constructor (parent_elem_cls_name,type){
		//define
		var parent_elem;
		type == "class" ? parent_elem = document.querySelector(`.${parent_elem_cls_name}`):parent_elem= document.querySelector(`${parent_elem_cls_name}`)
	
		//init 

		this.parent_elem = parent_elem;
		if(this.checkParentStyle() == "hidden"){
			this.setScrollBar();
			this.setThumbHeight();
			this.setCss();
			// this.setUp()
			this.scroll_bar_();
		}
		
	}
	checkParentStyle(){
		// parent style should be validate, default scorll bar shoudl be hidden

		return window.getComputedStyle(this.parent_elem).overflow;
	}
	setUp (){
		var scroll_track = this.scroll_track;
		window.addEventListener('scroll',(e)=>{
			scroll_track.style.position = 'relative';
		})
	}
	setScrollBar(){
		var parent_element = this.parent_elem;
		var track = null;
		var scroll_bar = document.createElement("div");
		var scroll_track = document.createElement("div");
		var scroll_thumb =  document.createElement("div");
		scroll_bar.className = "scroll-bar"
		scroll_track.className  = "scroll-track";
		scroll_thumb.className = "scroll-thumb";
		//unfortunately i used this but this is needed ? later will dig that
		scroll_thumb.setAttribute("draggable","true");
		[scroll_bar,scroll_track,scroll_thumb].forEach((element) =>{
			element.setAttribute("attr","scroll-item")
			if(track  != null){
				console.log(element)
				track.append(element)
			}else{
				this.parent_elem.prepend(element);
			}
			track = element;
		});
		this.scroll_thumb = scroll_thumb;
		this.scroll_bar = scroll_bar;
		this.scroll_track = scroll_track;
		

	}
	//vertical scroll bar
	scroll_bar_(){
		//redefining for reuse
		// intialize

		let scroll_thumb = this.scroll_thumb;
		var scroll_track = this.scroll_track;
		let parent_elem = this.parent_elem;

		var thumb_height = this.thumb_height;
		var speed = this.speed;
		var compensation =  this.compensation;


		var wheelX,wheelY,wheelZ; //axis
		var current_scroll_top;
		var cs,cp; // curent_scroll_top/speed ,cureent_scroll_top/compensation;
		//PREVENTERS 
	
		window.addEventListener('scroll',(e) =>{
			scroll_track.style.position = 'relative'
		})
		parent_elem.addEventListener('wheel',(e)=>{
			e.preventDefault();
			var thumbX,thumbY;

			// scroll_track.style.position = 'fixed';

			window.addEventListener('scroll',(ev)=>{
				ev.preventDefault();
			})
			thumbX = window.getComputedStyle(scroll_thumb).left.split('px')[0];
			thumbY = window.getComputedStyle(scroll_thumb).top.split('px')[0];

			wheelX = e.deltaX;
			wheelY = e.deltaY;
			wheelZ = e.deltaZ;

			parent_elem.scrollBy({left:wheelX,top:wheelY,behaviour:'smooth'})
			current_scroll_top = parent_elem.scrollTop;
			//condition for compensation and below to bottom and above to top
			function setScrollThumb(){
				var temp = (current_scroll_top / speed);
				temp *= compensation;
				console.log("temp 1 : " + current_scroll_top / speed + " temp-2 " + temp  + " speed : " + speed + " current_scroll_top : " + current_scroll_top + " compensation : " + compensation)
				scroll_thumb.style.left = thumbX + 'px' ;
				scroll_thumb.style.top  = compensation == 0 ?(current_scroll_top / speed) + 'px' : (current_scroll_top / speed) - (temp/speed)  + 'px' ;
			}
			setScrollThumb();
		})

		scroll_thumb.onmousedown = (event) => {
			// scroll_track.style.position = 'fixed';
		
			var thumbX = window.getComputedStyle(scroll_thumb).left.split('px')[0];
			var thumbY = window.getComputedStyle(scroll_thumb).top.split('px')[0];

			var parent_elem_style_height = window.getComputedStyle(this.parent_elem).height.split('px')[0];
			var thumbHeight = thumb_height;
			var bottom_limit = parent_elem_style_height - thumbHeight;
			
			var current_cursor_x,current_cursor_y;
			current_cursor_y = event.pageY - thumbY ; //shift
			console.log("y : " + current_cursor_y + "thumbY : " + thumbY + "event.pageY : " + event.pageY)
						
			/**
			 * how shift works ?
			 * if my thumb's starting is at 200 , height is 50 and my event.pageY click is at 220,
			 * then shift = event.pageY[click] - thumb's top [relative to document]
			 * ans is 20 . This 20 will maintain the cursor relative to movement then again 220 - 20 = 200 , this will be the top .this will
			 * continue like if currect event.pageY is 230 then 230 - 20 = 210 will be the top
			 * **/

			move(event.pageX,event.pageY);

			function move(pageX,pageY) {

				//create a reset option , if thumb goes negative , change it as usula value


				//event.pageY defines the pixel movement 

				var top = pageY - current_cursor_y;
				top = top > 0 ? top : 0;
				top = top > bottom_limit ? bottom_limit: top;
				top < 0 ? console.log("bounced"): null;

				scroll_thumb.style.left = thumbX + 'px'; //no change of left
				scroll_thumb.style.top = top + 'px';


			
				//speed defines 1x  1.5 2x 2.5 so on ...
				console.log("top " + top + " speed " + speed + " total :" +(( speed * top) + (top * compensation)))

		  		page_scroll(0,(top * speed) + (top * compensation));
				

			  	/**----DUMP-----
			  	 * 		 var last_top,current_top,current_scroll_y,last_scroll_y

				*	var def_top = parent_element.getBoundingClientRect().top;
				*	var def_bottom = parent_element.getBoundingClientRect().bottom;

				*	var thumb_top = scroll_thumb.getBoundingClientRect().top;
				*	var thumb_bottom = scroll_thumb.getBoundingClientRect().bottom; Not in use

				*	last_top = top;
				*	last_scroll_y = current_scroll_y;
				*		  top >= 0 && <= bottom limit
				* 	scroll starts 

				*	current_top = top;
				*	current_scroll_y = current_top - last_top;
				*	if(!isNaN(last_scroll_y)){
				*	current_scroll_y += last_scroll_y;
					}	
			  		console.log ("event.pageY : " + pageY + " ,current top: " + top + ", last top: "+ last_top + " ,deduction: " + current_scroll_y)
			  	*  console.log("top " + top + " speed " + speed + " total :" +(( speed * top) + (top * compensation)))

			  	
			  	--------------------------**/
		
			}
			function page_scroll (x,y) {
				console.log("Scroll Top : " +  y + " Real Scroll Top : "+ parent_elem.scrollTop )
				parent_elem.scrollTo({left:x,top:y,behaviour: 'smooth'})
				//dump
				// console.log("Scroll Top : " +  y + " Real Scroll Top : "+ parent_elem.scrollTop )
			}

			function onMousemove(event){
		
				move(event.pageX,event.pageY);
			}
			function reset(){
				//check later thumbY related problems
				thumbY = window.getComputedStyle(scroll_thumb).top.split('px')[0];
	
				if(thumbY < 0){
					scroll_thumb.style.top = "0px"
				}
				if(thumbY > bottom_limit){
					scroll_thumb.style.top = bottom_limit + "px";
				}
					
			}
			document.addEventListener("pointermove",onMousemove)
			document.onmouseup =  function(){
				reset();
				document.removeEventListener("pointermove",onMousemove);
				// sometime mouse up leads unexpected behaviour that's why here null
	
				scroll_thumb.onmouseup = null;
			}
			scroll_thumb.ondragstart = function(e){
				return false
			}
		}

	}

	/** if you have your own css as style sheet then use it */
	load_css(path = "scroll_bar.css"){
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.href =  "scrollKit/scroll_bar.css";
		document.head.append(link);
	}
	setCss(){
		// setProperty
		var key,value,className;
	
		for(let prop in Css){

			for(let property in Css[prop]){
				key = property;
				value = Css[prop][property];
				className = "this."+prop;
				console.log(className);
				eval(className).style.setProperty(key,value)
			}
		}
	}
	/**
	 * requirement :-
	 *  it requires 2x 3x 4x speed acorrding to scroll Height
	 *  Note:
	 * getBoundingClientRect which includes border also
	 * getComputedStyle which does not include the border **/
	setThumbHeight () {
		// setting Thumb height
		// need event listners to update it

		// initialzie
		var uninit_thumb_height,speed,thumb_height,avg_thumb_height,occupied,current_track_balance_height;
		var compensation = 0;
		var scroll_height = this.parent_elem.scrollHeight;
		var parent_height = window.getComputedStyle(this.parent_elem).height.split('px')[0];

		// calculation

		speed  = scroll_height / parent_height;
		uninit_thumb_height = parent_height / speed;


		// set LIMIT for thumb's height increase speed according // 10% is our target!
		avg_thumb_height = (((10/100) * scroll_height)/scroll_height) * parent_height ; //  calculation

		
		if(uninit_thumb_height < avg_thumb_height ){

			occupied =  avg_thumb_height - uninit_thumb_height;
			current_track_balance_height = parent_height - avg_thumb_height;
			compensation = occupied * speed;
			// this will mislead  because it loks like works correctly , but it will result like more scroll top number so scroll top results if there is more then it will reset it to proper scroll , sothis  looks like work good , but it may lead overscroll value but sometime if scrollheight is more than 100000000000 may be a prblm[not sure ] :  compensation = avg_thumb_height * speed; this works fine , but not smoothly like reaching fast , but correctly reached
			compensation /= current_track_balance_height; // this compensation amount will added for each time of mouse moves
			thumb_height = avg_thumb_height;
		}else{
			thumb_height = uninit_thumb_height;
		}


		// print 

		console.log( " Thumb height " + thumb_height + " Total : " + scroll_height + "  visible :   " + parent_height  + "speed : " + speed)
		
		// setter

		this.thumb_height =  thumb_height;
		this.speed = speed;
		this.compensation = compensation;

		//setting 

		Css.scroll_thumb.height = thumb_height + "px"; 

	
		/** dump
		*var balance_height = scroll_height - parent_height ;
		* var thumb_height = parent_height - balance_height;
		* console.log("compensation : " + compensation + "Occupied : " + occupied + " track balance : "+ current_track_balance_height)
		* console.log("avg : " + avg_thumb_height +  " speed : " + speed + "uninit_thumb_height : " + uninit_thumb_height)
		* **/

	}
	scrollThumb () {
		//setting scroll using wheel
		//scroll To
	}
}

function main (parent_name,type) {
	return new scrollKit(parent_name,type);
}
// thumb 10px
// visible 50px then scroll bar also 50px
// total 100px

// //so top will be get down by single single pixel [we have to play in this ,sometimes 2px 3 or more]same for up
// // if too much long page then the thumb has certain limit so it should be in that height , but the scorll moves in .5 pixel like that .. or reduce more 
// //how to determine the scroll thumb's height
// 	// if you have 150px scroll height , then 100px visible part , then the scroll thumbs hight should be 50px 
// so finally scroll height - main height  = balance height , then mainheight - balanceheight

//event.pageY defines the pixel movement  - now ;ets dig that later