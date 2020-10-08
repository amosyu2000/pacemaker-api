import mongoose from 'mongoose';

// Generic JSON response to invalid/unsuccessful requests
export function failedJson(reason) {
	return {
		success: false,
		reason: reason,
	};
}

// Similar to failedJson() but includes specific implementation for Error objects
export function errorJson(error) {
	
	// Removes the undesired formatting that is built-in to Schema validation errors
	// https://stackoverflow.com/a/64256430
	if (error instanceof mongoose.Document.ValidationError) {
		const errorList = Object.entries(error.errors).map(([,e]) => e.message);
		return failedJson(errorList.join(' '));
	}

	// Other errors
	return failedJson(error.message);
}