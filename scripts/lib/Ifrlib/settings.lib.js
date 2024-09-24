

import IfrElements from '/scripts/lib/Ifrlib/IfrElements.lib.js';
import * as IfrPageFuncLib from '/scripts/lib/Ifrlib/IfrPageFunc.lib.js';
import apiConfig from '/scripts/utils/apiConfig.js';
import * as ExceptionHandler from "/scripts/utils/ExceptionHandler.js";

export default class settings {
	constructor() {
		let settings = document.querySelector(".settings");
		
		this.settings = settings;

		// this.OnLoad();
		// this.OnResize();
	}
	// OnLoad() {
	// 	window.addEventListener("load",()=>{
	// 		this.loadStyle();
	// 	})
	// }
	// OnResize () {
	// 	window.addEventListener("resize",()=>{
	// 		this.loadStyle();
			
	// 	})
	// }
	static fetchAPI (URL,body,method = "GET"){
		return new Promise ((resolve,reject) =>{
			let fetchParams = {
				method:method,
				headers:
				{
					"Content-Type": "application/json;charset=utf-8",
				},
			}
			if(method == "POST") {
				fetchParams.body = JSON.stringify(body)
			}
			fetch(URL,fetchParams).then((resp)=>{	
				return resp
			}).then(resp =>{
				resolve(resp.json())
			}).
			catch(err=>{
				reject(err)
			})
		})
	
	}
	static changePwd(currentPass,newPass){

		return new Promise ((resolve,reject)=>{
			let method = "POST";
			
			let body = {
				currentPass:currentPass,
				newPass:newPass
			}
			settings.fetchAPI(apiConfig.changePwd,body,method).then(resp =>{
				console.log(resp)
				resolve(resp)
			}).catch(err=>{
				reject(err)

			})
		})

	}
	addEmail(){

	}
	addNum(){

	}
	changeNum(){

	}
	changeEmail(){

	}
	storageSetting (){
		// update storage while deleting and adding files
	}
	static loadStyle () {
		try {
			if(IfrPageFuncLib.WindowLimit.matches){
				IfrElements.body().style.setProperty('height',(100/100 * window.screen.height) +'px');			
			}else {
				IfrElements.body().style.setProperty('height',(100/100 * window.screen.height) +'px');
			} 
		
		}catch (err) {
			if(window.innerWidth > 800){
				IfrElements.body().style.setProperty('height',(100/100 * window.screen.height) +'px');			

			}else {
				IfrElements.body().style.setProperty('height',(100/100 * window.screen.height) +'px');

			}
		}
	}
}