import express from 'express';
import { User } from '../models';
import { errorJson, failedJson } from '../utils';

export const router = express.Router();

// Registers a new user
router.post('/register', ensureBodyContains('username', 'password'), async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		// Check that adding another user will not exceed the database's limit
		const maximumUsers = 10;
		if ((await User.find()).length >= maximumUsers) {
			return res.json(failedJson(
				`The database has already reached its maximum capacity of ${maximumUsers} users.`));
		}

		// Check that the username is not taken
		if ((await User.find({username_lower: username.toLowerCase()})).length !== 0) {
			return res.json(failedJson(
				`A user with the username '${username}' already exists.`));
		}

		// If all is well, proceed with creating a new User
		const user = new User({
			username: username,
			password: password,
		});

		const newUser = await user.save();

		if (user !== newUser) {
			return res.json(failedJson(
				"Failed to save new user."));
		}
		else {
			return res.json({
				success: true,
				...newUser.toObject(),
			});
		}
	} catch (e) {
		return res.json(errorJson(e));
	}
});

// Log in as an existing user
router.post('/login', ensureBodyContains('username', 'password'), async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		const user = await User.findOne({username_lower: username.toLowerCase()});

		// Check if the user exists
		if (user === null) {
			return res.json(failedJson(
				`A user with the username '${username}' does not exist.`));
		}
		// Check if the passwords match
		else if (!user.authenticate(password)) {
			return res.json(failedJson(
				`Incorrect password for the user '${user.get('username')}'.`));
		}
		// If all is well, send the user data over
		else {
			res.json({
				success: true,
				...user.toObject(),
			});
		}

	} catch(e) {
		return res.json(errorJson(e));
	}
});

// Delete an existing user
router.post('/delete', ensureBodyContains('id'), findUserById, async (req, res) => {
	await User.findOneAndDelete(res.user.toObject());
	return res.json({
		success: true,
	});
});

// Middleware to find a user by their ID, stores the document in res.locals
async function findUserById(req, res, next) {
	const id = req.body.id;
	let user = null;

	try {
		user = await User.findById(id);
	} catch (e) {
		return res.json(errorJson(e));
	}

	// Fail if the id is invalid/doesn't match an existing user
	if (user === null) {
		return res.json(failedJson(
			`The ID '${id}' does not correspond to a user.`));
	}
	else {
		res.user = user;
		next();
	}
}

function ensureBodyContains() {
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