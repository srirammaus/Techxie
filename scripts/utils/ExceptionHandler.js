// custom error handler 
/** 
 * Front-end Errors 
 * style error
 * parameter errors
 * misleading script error(xxs)
 * warinng Errors*/

export class FrontEndErrors extends Error {
	constructor(message){
		super(message);
		this.name = this.constructor.name;
	}
}

export class StyleError extends FrontEndErrors {
	constructor(message){
		super("Pageloading Error");
	}
}
export class ParameterError extends FrontEndErrors {
	constructor(message) {
		super("please fill the required parameter")
	}
}

export class MisleadingError extends FrontEndErrors {
	constructor (message) {
		super("seems to be something misleading , else IP will be blocked ")
	}
}

export class WarningError extends FrontEndErrors {
	constructor(message) {
		super(message);
	} 
}