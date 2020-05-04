const express = require('express');

const checkAuth = require('../helpers/check-auth');
const StatusError = require('../helpers/status-error');

const router = express.Router();

router.use(require('./recipe'));
router.use(require('./list'));
router.use(require('./plan'));

router.get('/auth', checkAuth, (req, res) => res.sendStatus(200));

router.get('/user', (req, res) => {
  res.json(req.session);
});

router.post('/password', (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      throw new StatusError('Please provide a password in the request body.', 400);
    } if (password === process.env.ZAUBERWORT) {
      req.session.authenticated = true;
      return res.sendStatus(200);
    }
    return res.sendStatus(401);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
