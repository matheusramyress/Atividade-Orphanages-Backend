import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

const errorHandler: ErrorRequestHandler = (error, req, res, next) =>{
	
	interface ValidationErrors{
		[key:string] : string[];
	}

	if(error instanceof ValidationError){
		const errorsValidation : ValidationErrors = {};

		error.inner.forEach(err=>{
			errorsValidation[err.path] = err.errors;		
		});
		return res.status(500).json({ message : 'Internal server', errorsValidation});
	}
	
	console.error(error);
return res.status(500).json({message : 'Internal Server Error'});
};

export default errorHandler;