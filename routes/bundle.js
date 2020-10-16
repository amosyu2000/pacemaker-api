import express from 'express';
import { Bundle } from '../models';
import { findBundlesByUserId, findUserById } from '../middlewares';

export const router = express.Router();

// Create a new bundle for a User
router.post('/addnew', findUserById, async (req, res) => {
	// Create a new bundle based on the parameters passed in the request body
	// Any missing parameter will be assigned its default value
	const bundle = new Bundle({
		user_id: res.locals.id,
		...req.body,
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