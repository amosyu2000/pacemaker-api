import express from 'express';
import { Bundle } from '../models';
import { findBundlesByUserId, findUserById } from '../middlewares';
import { errorJson } from '../utils';

export const router = express.Router();

// Create a new bundle for a User
router.post('/addnew', findUserById, async (req, res) => {
  // Create a new bundle based on the parameters passed in the request body
  // Any missing parameter will be assigned its default value
  let bundle = null;
  try {
    // Assign the associated user_id to the new bundle
    // Also, we want to ignore the _id and created_at fields if they were passed in
    Object.assign(req.body, {
      user_id: res.locals.id,
      _id: undefined, 
      created_at: undefined,
    });
    bundle = new Bundle(req.body);
    await bundle.save();
  } catch(e) {
    return res.json(errorJson(e));
  }
  return res.json({
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