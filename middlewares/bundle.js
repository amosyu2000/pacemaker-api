import { findUserById } from '../middlewares';
import { Bundle } from '../models';
import { errorJson } from '../utils';

// Find all bundles associated with a user based on user id
export function findBundlesByUserId(req, res, next) {
	findUserById(req, res, async () => {
		const id = res.locals.id;
		let bundles = null;

		try {
			// Sorts the bundles by newest date
			bundles = await Bundle.find({ user_id: id }).sort({ created_at: -1 });
		} catch (e) {
			return res.json(errorJson(e));
		}

		// Overwrites res.locals (which previously held the User document)
		res.locals = bundles;
		next();
	});
}