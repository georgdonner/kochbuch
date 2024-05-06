const express = require('express');

const UserService = require('../../services/user');

const router = express.Router();

const checkSession = async (req, res, next) => {
  if (req.session.userId) {
    const user = await UserService
      .get({ userId: req.session.userId });

    return res.json({ user });
  }

  return next();
};

const createSession = ({ user, req }) => {
  req.session ||= {}; // Don't overwrite planCode/listCode (to be removed)
  req.session.userId = user._id;
};

router.post('/login', checkSession, async (req, res, next) => {
  try {
    const user = await UserService
      .login({ body: req.body });

    createSession({ user, req });

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

// Reads list/plan codes from session to add to user doc
const migrateCodes = async ({ user, req }) => {
  const update = {};

  if (req.session.listCode && !user.listCode) {
    update.listCode = req.session.listCode;
    delete req.session.listCode;
  }
  if (req.session.planCode && !user.planCode) {
    update.planCode = req.session.planCode;
    delete req.session.planCode;
  }

  if (Object.keys(update).length) {
    return UserService
      .update(user._id, update);
  }

  return user;
};

router.post('/signup', checkSession, async (req, res, next) => {
  try {
    let user = await UserService
      .signup({ body: req.body });

    createSession({ user, req });

    user = await migrateCodes({ user, req });

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
