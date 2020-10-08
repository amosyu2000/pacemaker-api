import express from 'express';
import { Config, User } from '../models';
import { ensureBodyContains } from '../middlewares';
import { errorJson, failedJson } from '../utils';

export const router = express.Router();

// Registers a new user
router.post('/register', 
	ensureBodyContains('username', 'password'), 
	async (req, res, next) => {
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
			if ((await User.find({ username_lower: username.toLowerCase() })).length !== 0) {
				return res.json(failedJson(
					`A user with the username '${username}' already exists.`));
			}

			// If all is well, proceed with creating a new User
			// Create a default Config to accompany the User
			const user = new User({
				username: username,
				password: password,
			});
			const config = new Config({
				user_id: user.id,
			});
			await user.save();
			await config.save();


			next();
		} catch (e) {
			return res.json(errorJson(e));
		}
	},
	returnUserByUsernameAndPassword
);

// Log in as an existing user
router.post('/login', returnUserByUsernameAndPassword);

// Delete an existing user
router.post('/delete', findUserById, async (req, res) => {
	await User.findByIdAndDelete(res.user.id);
	return res.json({
		success: true,
	});
});

// Middleware to find a user by their ID, stores the document in res.locals
function findUserById(req, res, next) {
	ensureBodyContains('id')(req, res, async () => {
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
	});
}

// Generic endpoint that returns all data about a user (or a failedJson)
function returnUserByUsernameAndPassword(req, res) {
	ensureBodyContains('username', 'password')(req, res, async () => {
		const username = req.body.username;
		const password = req.body.password;

		try {
			const user = await User.findOne({ username_lower: username.toLowerCase() }).populate('configs');

			// Check if the user exists
			if (user === null) {
				return res.json(failedJson(
					`A user with the username '${username}' does not exist.`));
			}
			// Check if the password is correct
			if (!user.authenticate(password)) {
				return res.json(failedJson(
					`Incorrect password for the user '${user.get('username')}'.`));
			}
			// If all is well, send the user data over
			
			return res.json({
				success: true,
				...user.toObject(),
			});
		} catch(e) {
			return res.json(errorJson(e));
		}
	});
}