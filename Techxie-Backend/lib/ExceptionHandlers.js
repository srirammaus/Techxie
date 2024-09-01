//Exception handlers
//memory usage comparitvely high but this you can make the code clarity, encaspulation
class ErrorCode extends Error{
	constructor(message){
		super(message);
		this.name = 'ErrorCode';
	}
}
class InvalidError extends Error{
	constructor(message){
		super(message);
		this.name = 'InvalidError';
	}
}
class UserError extends Error{
	constructor(message){
		super(message);
		this.name = "UserError"
	}
}
class ServerError extends  Error {
	constructor (message) {
		super(message) 
		this.name = "Server Error"
	}
}
class InvalidRequest extends Error {
	constructor(message) {
		super(message)
		this.name ="Invalid Request"
	}
}

module.exports = {ErrorCode , InvalidError,UserError}