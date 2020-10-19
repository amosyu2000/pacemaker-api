import { ensureBodyContains } from '../middlewares';
import { User } from '../models';
import { errorJson, failedJson } from '../utils';

// Middleware to find a user by their ID, stores the document in res.locals
export function findUserById(req, res, next) {
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
      res.locals = user;
      next();
    }
  });
}