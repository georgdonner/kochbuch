const express = require('express');

const checkAuth = require('../helpers/check-auth');
const StatusError = require('../helpers/status-error');
const Shoppinglist = require('../../models/shoppinglist');
const Weekplan = require('../../models/weekplan');

const router = express.Router();
router.get('/auth', checkAuth, (req, res) => res.sendStatus(200));

const getUser = (req) => ({
  ...req.session,
  ...req.session.authenticated ? {
    uploadcareKey: process.env.UPLOADCARE_PUBLIC_KEY,
  } : {},
});

router.get('/user', (req, res) => {
  res.json(getUser(req));
});

router.post('/user', async (req, res, next) => {
  try {
    const body = req.body || {};
    const promises = Object.entries(body).map(async ([key, value]) => {
      if (!value) {
        delete req.session[key];
      } else if (value !== req.session[key]) {
        if (key === 'listCode') {
          const list = await Shoppinglist.getByName(value);
          if (!list) {
            await Shoppinglist.addList(value);
          }
        } else if (key === 'planCode') {
          const plan = await Weekplan.getPlanByName(value);
          if (!plan) {
            await Weekplan.addPlan(value);
          }
        }
        req.session[key] = value;
      }
      return Promise.resolve();
    });
    await Promise.all(promises);
    return res.json(getUser(req));
  } catch (error) {
    return next(error);
  }
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
