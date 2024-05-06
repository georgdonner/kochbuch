const express = require('express');

const Shoppinglist = require('../../models/shoppinglist');
const Weekplan = require('../../models/weekplan');
const UserService = require('../../services/user');

const router = express.Router();

router.get('/user', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      // Keep old session based system functional (to be removed)
      if (req.session.listCode || req.session.planCode) {
        return res.json(req.session);
      }
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
    let user;

    if (req.session.userId && body) {
      user = await UserService
        .update(req.session.userId, body);
    }

    if (body?.listCode) {
      const list = await Shoppinglist.getByName(body.listCode);
      if (!list) {
        await Shoppinglist.addList(body.listCode);
      }
      if (!req.session.userId) {
        req.session.listCode = body.listCode;
      }
    } else if (req.session.listCode && 'listCode' in body) {
      delete req.session.listCode;
    }

    if (body?.planCode) {
      const plan = await Weekplan.getPlanByName(body.planCode);
      if (!plan) {
        await Weekplan.addPlan(body.planCode);
      }
      if (!req.session.userId) {
        req.session.planCode = body.planCode;
      }
    } else if (req.session.planCode && 'planCode' in body) {
      delete req.session.planCode;
    }

    return res.json(user || req.session);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
