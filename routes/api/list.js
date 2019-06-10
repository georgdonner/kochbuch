const express = require('express');

const router = express.Router();

const checkAuth = require('../helpers/check-auth');
const Shoppinglist = require('../../models/shoppinglist');

const checkListAuth = (req, res, next) => {
  if (req.session.authenticated && req.session.listCode) {
    return next();
  }
  return res.sendStatus(401);
};

// Get Shopping List
router.get('/list', checkListAuth, async (req, res, next) => {
  try {
    const list = await Shoppinglist.getByName(req.session.listCode);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

// New Shopping List
router.post('/lists', checkAuth, async (req, res, next) => {
  try {
    const newList = new Shoppinglist({ ...req.body });
    const list = await Shoppinglist.addList(newList);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

// Update Shopping List
router.put('/list', checkListAuth, async (req, res, next) => {
  try {
    const updList = new Shoppinglist({ ...req.body });
    const newData = updList.toObject();
    delete newData._id;
    const list = await Shoppinglist.updateList(req.session.listCode, newData);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

// Update Shopping List with "added" and "removed" actions
router.put('/list/updates', checkListAuth, async (req, res, next) => {
  try {
    const list = await Shoppinglist.processListUpdates(req.session.listCode, req.body);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

router.post('/list', checkListAuth, async (req, res, next) => {
  try {
    const updated = await Shoppinglist.addItem(req.session.listCode, req.body.item);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
