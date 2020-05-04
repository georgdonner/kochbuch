const express = require('express');

const checkAuth = require('../helpers/check-auth');

const router = express.Router();

router.use(require('./recipe'));
router.use(require('./list'));
router.use(require('./plan'));

router.get('/auth', checkAuth, (req, res) => res.sendStatus(200));

router.get('/user', (req, res) => {
  res.json(req.session);
});

module.exports = router;
