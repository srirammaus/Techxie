//Tools function this script is 

// get file by last module
let menu =document.querySelector('.tools .seperator .menu');
let back = document.querySelector('.tools .seperator .back ');
let zoom_in = document.querySelector('.tools .seperator div[attr="zoom_in"] ');
let zoom_out = document.querySelector('.tools .seperator div[attr="zoom_out"]');
let dropdown_i = document.querySelector('.dropdown i');
let dropdown_input = document.querySelector('.dropdown input');
let dropdown_content = document.querySelector('.seperator .dropdown .dropdown-content');
let dropdown_content_a = document.querySelectorAll('.seperator .dropdown .dropdown-content a');
let counts = document.querySelector('.tools .seperator div[attr="counts"]')
let print = document.querySelector('.tools .seperator div[attr="print"] ');
let download = document.querySelector('.tools .seperator div[attr="download"]');
let pdfWrapper = document.querySelector('.pdf-wrapper');
let sideNav = document.querySelector(".side-nav");
// let thumbnail = document.querySelectorAll(".side-nav .thumbnail");
// let thumbnail_img = document.querySelectorAll(".side-nav .thumbnail img");

// let annotater; further plan
const LIMIT= 800;
const DEFAULT_ZOOM = [];
const MAX_ZOOM = (200 *100) / 10000 ;//"500%"
const MIN_ZOOM = (25 *100) / 10000 ;//"25%"
const MIN_WIDTH = 800;
const HOME = "/webdrive.html";

const _File = {};
setFile("joint.pdf");
sideNav_();
back_();
var options = {

// Fraction of the area of the page that has to be visible to be considered that it is visible
  visibleThreshold: 0.5,
  // Number of pages to load appart from the currently visible one (to enable fast scrolling)
  extraPagesToLoad: 3,
  // The class used for each page (the div that wraps the content of the page)
  pageClass: "pdfpage",
  // The class used for the content of each page (the div that contains the page)
  contentClass: "content-wrapper",
  // Posible zoom values to iterate over using "in" and "out"
  zoomValues: [ 0.25, 0.5, 0.75, 1, 1.25, 1.50, 2, 4, 8 ],
  // Percentage of the container that will be filled with the page
  zoomFillArea: 0.95,
  // Function called when a document has been loaded and its structure has been created
  onDocumentReady: () => {},
  // Function called when a new page is created (it is binded to the object, and receives a jQuery object as parameter)
  onNewPage: (page, i) => {

  },
  // Function called when a page is rendered
  onPageRender: (page, i) => {},
  // Function called when the zoom level changes (it receives the zoom level)
  onZoomChange: (zoomlevel) => { 
  },
  // Function called whenever the active page is changed (the active page is the one that is shown in the viewer)
  onActivePageChanged: (page, i) => {
  
    setPageCount_(i)
  },
  // Function called to get the content of an empty page
  emptyContent: () => $('<div class="loader"></div>'),
  // Function called to obtain a page that shows an error when the document could not be loaded (returns a jQuery object)
  errorPage: () => {
      $(`<div class="placeholder"></div>`).addClass(this.settings.pageClass).append($(`<p class="m-auto"></p>`).text("could not load document"))
  },
  // The scale to which the pages are rendered (1.5 is the default value for the PDFjs viewer); a higher value will render the pages with a higher resolution
  //   but it will consume more memory and CPU. A lower value will render the pages with a lower resolution, but they will be uglier.
  renderingScale: 1.5,
}


var pdfElem =document.querySelector(".maindoc");
var pdfViewer = new PDFjsViewer($('.maindoc'), options);


pdfViewer.loadDocument(getFile().dir + getFile().filename).then(function(){
  defaults_(pdfViewer)
})

const PAGE_COUNT = pdfViewer.getPageCount();


function defaults_ (pdfViewer) {

  HandleViewPort_()
  window.addEventListener('resize',function(){
    HandleViewPort_();
  });
  pdfWrapper.addEventListener('click',function(){
    var getStyle = window.getComputedStyle(dropdown_content).display;
    if(getStyle != "none"){
      dropdown_content.style.display = "none"
    }
  })
  // preventDefaultZoom();
  zoom_();
  dropdown_();
  dropdown_content_();
  setPageCount_();
  print_();
  download_(getFile().filename,getFile().URI);


}
function setFile (filename){
  var dir  = "/pdfView/scripts/pdfViewer/components/elements/";
  var URL = "http://192.168.43.98:3000" + dir ;
  var URI = URL + filename; // file link

  if(Object.keys(_File).length < 4 && Object.keys(_File).length >= 0) { //here may cause bug if there is no second check and add exception later 
    _File.dir = dir;
    _File.URL = URL;
    _File.URI = URI;
    _File.filename = filename;
  }


}
function getFile () {
  return _File;
}
function HandleViewPort_(){
 if(window.innerWidth > LIMIT ){ //desktop
    if(window.innerWidth < window.innerHeight){
      fit_in_mobile();
    }else{
      fit_in_desktop()
    }
  }else{//mobile

    if(window.innerWidth > window.innerHeight){
      fit_in_desktop();
    }else{
      fit_in_mobile()
    }
    
  }
}
function preventDefaultZoom(){
  //stop wheel, ctrl , meta keys,resize event
}
function zoom_ (){


  getDefaultZoom_(); //This is our 100%

  var c_zoom;
  var n_zoom;
  var def_inc_dec_val = 0.25;

  zoom_in.addEventListener('click',function(){
    //25% increment
    c_zoom = pdfViewer.getZoom()
    n_zoom = c_zoom + def_inc_dec_val;
    n_zoom = n_zoom <= MAX_ZOOM ? n_zoom: c_zoom;
    pdfViewer.setZoom(n_zoom)
  })
  zoom_out.addEventListener('click',function(){
    //25% decrement
    c_zoom = pdfViewer.getZoom();
    n_zoom = c_zoom - def_inc_dec_val;
    n_zoom = n_zoom >= MIN_ZOOM ? n_zoom : c_zoom;
    pdfViewer.setZoom(n_zoom)
    // console.log(n_zoom + " " +pdfViewer.getZoom() )
  })


}
function print_ (){
  
  // let pdfData = await pdfViewer.pdf.getData();
  // let b64Pdf=btoa(String.fromCharCode.apply(null, pdfData));
  // printJS({printable: b64Pdf, type: 'pdf', base64: true});

  print.addEventListener("click", async function(){
    if(window.innerWidth > MIN_WIDTH ) {
        let pdfData = await pdfViewer.pdf.getData();
        let uint8Array = new Uint8Array(pdfData);
        let CHUNK_SIZE = 0x8000; // Arbitrary chunk size, adjust as needed

        let chunks = [];
        for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
        chunks.push(uint8Array.subarray(i, i + CHUNK_SIZE));

        }

        let blob = new Blob(chunks, { type: 'application/pdf' });
        let b64Pdf = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(blob);
        });
        printJS({printable: b64Pdf, type: 'pdf', base64: true});
      }else {
        alert("The Feature available only for Desktop")
      }

  })

  
}
function download_ (filename,fileURI) {

  download.addEventListener("click",function(){
    var aTag = document.createElement("a");
    aTag.setAttribute("href",getFile().URI)

    aTag.setAttribute('download',getFile().filename);
    aTag.style.visibility = "hidden";
    document.body.appendChild(aTag);
    aTag.click()

  })
  
}
function back_ () {
  back.addEventListener("click",function(){
    window.location.href = HOME;
  })
}
function sideNav_ (){

    //set thumbanil
    !function () {
      // thumbnail_img.forEach(function (elem,index){
      //   elem.src = "/assets/images/profile.jpg";
      // })
      
      var pdfThumbnails = new PDFjsViewer($('.thumbnails'), {
        zoomFillArea: 0.7,
        onDocumentReady: function () {
          this.setZoom(.2);
        },
        onPageRender: function (page,i) {
          page[0].onclick = function (){
            pdfViewer.scrollToPage(page[0].getAttribute("data-page"))
          }
        } 
      });
      pdfThumbnails.setAcitvePage = function(pageno) {
        console.log(pageno)
      }.bind(pdfThumbnails)
      pdfThumbnails.loadDocument(getFile().dir + getFile().filename).then()
     

    }();
}
function annotate_ (){
    //further plans
}
function setPageCount_ (current_page = null){
  counts.children[0].innerHTML = current_page != null ? current_page:1;
  counts.children[1].innerHTML ="/" + pdfViewer.getPageCount()
}


function fit_in_mobile (){
  pdfViewer.setZoom("fit");
  if(DEFAULT_ZOOM.length === 0){
    DEFAULT_ZOOM[0] = pdfViewer.getZoom();
  }

}
function fit_in_desktop(){ //this fit enough below 800
  pdfViewer.setZoom("fit") // 100% //fit is 100% their half and quarter are the 25 75 50
  // let half =  pdfViewer.getZoom() /2 ;
  // pdfViewer.setZoom(half)
  if(DEFAULT_ZOOM.length === 0){
    DEFAULT_ZOOM[0] = pdfViewer.getZoom();
  }
}
function getDefaultZoom_ (){
  console.log(DEFAULT_ZOOM[0])
  return DEFAULT_ZOOM[0];
}
function dropdown_content_(){
  var value,tagName_,tag,EventInput ;
  // dropdown_content_a.forEach(function(elem,index){
  //     elem.addEventListener("click",function(event){
  //       console.log(elem)
  //       dropdown_input.value = elem.innerHTML;
  //     })
  // })
  
  EventInput = new CustomEvent( "custominput",{detail:{
         tag: null
        }},{bubbles: true})
  
  dropdown_content.addEventListener("click",(e)=>{
    try {
      tagName_ = e.target?.tagName?.toLowerCase();
      tag = e.target;

      if(tagName_ == 'a'){
        dropdown_input.value =  tag.innerHTML;
       
      }else if(tagName_ == 'div') {
        if(tag.children.length  == 1) {

          dropdown_input.value =tag.children[0].innerHTML
        } else{
          throw new Error("DOM manipulated");
        }
      }else{
    
        dropdown_input.value =  dropdown_input.value;
      }
      
    }catch(err){
      console.log(err.message)
      dropdown_input.value =  dropdown_input.value;
    }
    EventInput.detail.name = dropdown_input.value;
    dropdown_input.dispatchEvent(EventInput);
  })
}
function dropdown_(){
  var getStyle,dp_ct_display,dp_ct_height;
  dropdown_input.readOnly = "true";

  dropdown_input.addEventListener("custominput",function(event){
    switch (event.detail.name) {
      case "100%":
      case "Fit":
        console.log("fit")
        pdfViewer.setZoom(getDefaultZoom_())
        break;
      case "Wide":
        console.log("Wide")
        pdfViewer.setZoom(getDefaultZoom_() * 2)
        break;
      case "50%":
        console.log("50%")
        pdfViewer.setZoom(getDefaultZoom_() / 2)
        break;
      case "25%":
        console.log("25%")
        pdfViewer.setZoom(getDefaultZoom_() / 4 >= MIN_ZOOM ? getDefaultZoom_() / 4: MIN_ZOOM )
        break;
      case "75%":
        console.log("75%")
        pdfViewer.setZoom(getDefaultZoom_() - MIN_ZOOM)
        break;
      default:
        console.log("Default")
        pdfViewer.setZoom(getDefaultZoom_())
        break;
    }
    
  })

  dropdown_i.addEventListener('click',function (){
    //dropdown display:inline-flex

    getStyle = window.getComputedStyle(dropdown_content);
    dp_ct_display = getStyle.display;
    dp_ct_height = getStyle.height;
    if(dp_ct_display == "none"){
      dropdown_content.style.display = "inline-flex"
    }else{
      dropdown_content.style.display = "none"
    }
  })
}




// function EventListeners () {
//     window.addEventListener("resize",()=>{

//     })
//     window.addEventListener("load",()=>{

//     })
// }
