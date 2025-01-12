const express = require('express');
const { clerkClient } = require('@clerk/express');

const { requireAuth } = require('../middleware/auth');
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

router.post('/user', requireAuth(), async (req, res, next) => {
  try {
    const body = req.body || {};
    let userData = req.auth.sessionClaims.metadata;

    if (Object.keys(body).length) {
      const user = await clerkClient.users.updateUserMetadata(req.auth.userId, {
        publicMetadata: body,
      });
      userData = user.publicMetadata;
    }

    if (body?.listCode) {
      const list = await Shoppinglist.getByName(body.listCode);
      if (!list) {
        await Shoppinglist.addList(body.listCode);
      }
    }

    if (body?.planCode) {
      const plan = await Weekplan.getPlanByName(body.planCode);
      if (!plan) {
        await Weekplan.addPlan(body.planCode);
      }
    }

    return res.json(userData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
