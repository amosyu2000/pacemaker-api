import express from 'express';
import { Bundle, User } from '../models';
import { ensureBodyContains } from '../middlewares';
import { errorJson, failedJson } from '../utils';

export const router = express.Router();

// Deletes all documents from the all collections
router.post('/dropall', ensureBodyContains('adminKey'), async (req, res) => {
  const key = req.body.adminKey;
  // Check that the key is correct
  try {
    if (key === process.env.ADMIN_KEY) {
      await User.deleteMany();
      // The deleteMany() function does not fire the User post-delete middleware, 
      // so I must wipe the Bundle collection manually
      await Bundle.deleteMany();
      return res.json({
        success: true,
      });
    }
    else {
      return res.json(failedJson('Invalid admin key.'));
    }
  } catch (e) {
    return res.json(errorJson(e));
  }
});