import npmBodyParser from 'body-parser';
import { failedJson } from '../utils';

// Middleware that converts the encoded request body into usable JSON
export const bodyParser = npmBodyParser.urlencoded({ extended: false });

// Response for non-existent routes
export function defaultResponse(req, res) {
	res.json(failedJson(`The requested endpoint at '${req.path}' could not be found.`));
}

// Middleware that checks the request body for the desired keys
export function ensureBodyContains() {
	return (req, res, next) => {
		let missingParameters = [];
		for (const parameter of arguments) {
			if (req.body[parameter] === undefined) {
				missingParameters.push(parameter);
			}
		}
		if (missingParameters.length > 0) {
			const missingParametersString = missingParameters.map((p) => `'${p}'`).join(' and ');
			return res.json(failedJson(
				`The body of your request is missing the key(s) ${missingParametersString}.`
			));
		}
		else {
			next();
		}
	}
}