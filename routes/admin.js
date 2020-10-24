import express from 'express';
import { Bundle, User } from '../models';
import { ensureBodyContains } from '../middlewares';
import { errorJson, failedJson } from '../utils';

export const router = express.Router();

// Middleware that checks that the key is correct
router.use((req, res, next) => {
  ensureBodyContains('adminKey')(req, res, () => {
    if (req.body.adminKey === process.env.ADMIN_KEY) {
      next();
    }
    else {
      return res.json(failedJson('Invalid admin key.'));
    }
  });
});

// Deletes all documents from the all collections
router.post('/deleteall', async (req, res) => {
  try {
      await User.deleteMany();
      // The deleteMany() function does not fire the User post-delete middleware, 
      // so I must wipe the Bundle collection manually
      await Bundle.deleteMany();
      return res.json({
        success: true,
      });
  } catch (e) {
    return res.json(errorJson(e));
  }
});

// Delete an existing user
router.post('/deleteuser', async (req, res) => {
  try {
    await User.findOneAndDelete({ username_lower: req.body.username.toLowerCase() });
  } catch (e) {
    return res.json(errorJson(e));
  }
  return res.json({
    success: true,
  });
});