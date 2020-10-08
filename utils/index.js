export function failedJson(reason) {
	return {
		success: false,
		reason: reason,
	};
}

export function errorJson(error) {
	return failedJson(error.message);
}