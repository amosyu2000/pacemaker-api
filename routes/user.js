import express from 'express';
import { Bundle, User } from '../models';
import { ensureBodyContains, findUserById } from '../middlewares';
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
      const existingUser = await User.findOne({ username_lower: username.toLowerCase() });
      if (existingUser !== null) {
        return res.json(failedJson(
          `A user with the username '${existingUser.username}' already exists.`));
      }

      // If all is well, proceed with creating a new User
      // Create a default Bundle to accompany the User
      const user = new User({
        username: username,
        password: password,
      });
      const bundle = new Bundle({
        user_id: user.id,
      });
      await user.save();
      await bundle.save();


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
  await User.findByIdAndDelete(res.locals.id);
  return res.json({
    success: true,
  });
});

// Generic endpoint that returns all data about a user (or a failedJson)
// This function shouldn't go in the 'middlewares' module since it's an endpoint
function returnUserByUsernameAndPassword(req, res) {
  ensureBodyContains('username', 'password')(req, res, async () => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await User.findOne({ username_lower: username.toLowerCase() });

      // Check if the user exists
      if (user === null) {
        return res.json(failedJson(
          `Incorrect username or password.`));
      }
      // Check if the password is correct
      if (!user.authenticate(password)) {
        return res.json(failedJson(
          `Incorrect username or password.`));
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