
//memory usage comparitvely high but this you can make the code clarity, encaspulation
/**
 * This exception handler should be included everywhere in api and respected functions shoudl 
 * act according to their error like taking logs and sending data for machine learning
 * 
 */
class ErrorCode extends Error{
	constructor(message){
		super(message);
		this.name = 'ErrorCode';
		this.code = 500;
	}
}
/**
 *Internal Server Error - 501 - Internal server error ,502- function not implemented,503 - bad gateway
 */
 class ServerError extends  Error {
	constructor (message) {
		super(message) 
		this.name = "Server Error";
		this.code = 500 ;
	}
}
class StorageError extends ServerError {
	constructor (message) {
		super(message) 
		this.name = "Server Error";
		this.code = 500 ;
	}
}
class InternalServerError extends ServerError{
	constructor(message) {
		super(message);
		this.name = "Internal Server Error";
		this.code = 500;
	}
}
class ServiceUnavailable extends ServerError {
	constructor(message) {
		super(message);
		this.name = "Service Unavailable"; 
		this.code = 503 ;
	}
}
class BadGateway extends ServerError {
	constructor(message) {
		super(message);
		this.name = "BadGateway"; 
		this.code =502 ;
	}
}
/**
 * Client Error
 */
class ClientError extends Error {
	constructor(message) {
		console.log("im the last")
		super(message);
		this.name = "Client Error";
		this.code = 400;
	}
}
class BadRequest extends ClientError { // Invalid input keys or 
	constructor(message,code = 400) {
		super(message)
		this.name ="Invalid Request";
		this.code = code;
	}
}
/**
 * If 200 then dont have to redirect in Error page
 */
class NotFound extends ClientError { // Invalid input keys or 
	constructor(message,code = 404) {
		super(message)
	
		this.name ="Not found";
		this.code = code; // default 404
	}
}
class ConflictError extends ClientError {// tokens or Username or user id or email error
	constructor(message,code = 409) {
		super(message);
		this.name = "Conflict Error";
		this.code = code;
	}
}

class UnAuthorized extends ClientError {// tokens or Username or user id or email error
	constructor(message,code =401) {
		super(message);
		this.name = "UnAuthozied"
		this.code = code;
	}
}
class Forbidden extends ClientError {
	constructor(message) {
		super(message);
		this.name = "Forbidden"
		this.code = 403;
	}
}

module.exports = {
	ServerError,
	StorageError,
	InternalServerError,
	ServiceUnavailable,
	BadGateway,
	ClientError,
	NotFound,
	BadRequest,
	Forbidden,
	UnAuthorized,
	ConflictError,
	UserError,

}