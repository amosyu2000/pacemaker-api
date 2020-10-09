import express from 'express';
import { Bundle } from '../models';
import { findBundlesByUserId, findUserById } from '../middlewares';

export const router = express.Router();

// Create a new bundle for a User
router.post('/addnew', findUserById, async (req, res) => {
	// Pick out only the keys in the body that begin with "p_"
	const parameters = Object.entries(req.body).filter(([k]) => k.startsWith('p_'));
	// Create a new bundle based on the parameters passed in the request body
	// Any missing parameter will be assigned its default value
	const bundle = new Bundle({
		user_id: res.locals.id,
		...Object.fromEntries(parameters),
	});
	await bundle.save();
	res.json({
		success: true,
		bundle: bundle,
	});
});

// Get all bundles associated with a User
router.post('/getall', findBundlesByUserId, (req, res) => {
	res.json({
		success: true,
		bundles: res.locals,
	});
});

// Get the most recent bundle associated with a User
router.post('/getlatest', findBundlesByUserId, (req, res) => {
	res.json({
		success: true,
		bundle: res.locals[0],
	});
});