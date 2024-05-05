const express = require('express');

const StatusError = require('../middleware/status-error');
const Shoppinglist = require('../../models/shoppinglist');
const Weekplan = require('../../models/weekplan');
const UserService = require('../../services/user');

const router = express.Router();

router.get('/user', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.sendStatus(204);
    }

    const user = await UserService
      .get({
        userId: req.session.userId,
        throwNotFound: true,
      });

    return res.json(user);
  } catch (error) {
    return next(error);
  }
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
    return res.json(req.session);
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
