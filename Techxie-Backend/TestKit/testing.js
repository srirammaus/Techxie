async function testing (code){ // so promise return function can only work with async await like setTimeoout wonrt return promise, so we hve  to wrap it with promise function
	if(code == true){
		await getResult()
		// console.log("This code won't run anymore")
		// return;
	}else{
		console.log("its false , it continues ");
	}
	console.log("continues")
}
async function getResult(){
	await new Promise( res=>{
		setTimeout((res)=>{console.log("print")},500); // working
	})
}
async function testing_(code){
	if(code == true){
		await getResult_(1,()=>{
			setTimeout()
		})
		return;
	}else{
		console.log("its false , it continues ");
	}
	console.log("continues")
}
async function getResult_(arg,cb){ // cb
	console.log("This code won't run anymore")	
	await  cb(arg);
}
testing_(true);