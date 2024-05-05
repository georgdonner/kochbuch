const express = require('express');

const UserService = require('../services/user');
const clientRoute = require('./client');

const router = express.Router();

const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  return next();
};

router.get('/login', redirectIfAuthenticated, clientRoute);
router.get('/signup', redirectIfAuthenticated, clientRoute);

router.get('/logout', (req, res) => {
  console.log('logout');
  req.session = null;
  return res.redirect('/');
});

const checkSession = async (req, res, next) => {
  if (req.session.userId) {
    const user = await UserService
      .get({ userId: req.session.userId });

    return res.json({ user });
  }

  return next();
};

const createSession = ({ user, req }) => {
  req.session = {
    userId: user._id,
  };
};

router.post('/login', checkSession, async (req, res, next) => {
  try {
    checkSession();

    const user = await UserService
      .login({ body: req.body });

    createSession({ user, req });

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.post('/signup', checkSession, async (req, res, next) => {
  try {
    const user = await UserService
      .signup({ body: req.body });

    createSession({ user, req });

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
