const express = require('express');

const router = express.Router();

const Shoppinglist = require('../../models/shoppinglist');
const LookupCategory = require('../../models/lookupCategory');
const CategoryLog = require('../../models/categoryLog');

const checkListAuth = (req, res, next) => {
  if (req.session.listCode) {
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
router.post('/lists', async (req, res, next) => {
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

// Update Shopping List with "added", "removed", "updated" and "moved" actions
const listUpdates = async (req, res, next) => {
  try {
    const updates = req.body || [];
    await Promise.all(updates
      .filter((update) => update.action === 'updated' && update.update.category)
      .map(async ({ update, id }) => {
        const item = await Shoppinglist.getItem(req.session.listCode, id);
        return CategoryLog.create({
          item: item.name,
          category: update.category,
          oldCategory: item.category,
        });
      }));
    const list = await Shoppinglist.processListUpdates(req.session.listCode, { updates });
    return res.json(list);
  } catch (error) {
    return next(error);
  }
};

router.put('/list/updates', checkListAuth, listUpdates);
router.post('/list/updates', checkListAuth, listUpdates);

router.post('/list', checkListAuth, async (req, res, next) => {
  try {
    const list = await Shoppinglist.addItem(req.session.listCode, req.body.item);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

router.get('/list/sort', checkListAuth, async (req, res, next) => {
  const { profile } = req.query;
  try {
    const sorted = await Shoppinglist.sortList(req.session.listCode, profile);
    return res.json(sorted);
  } catch (error) {
    return next(error);
  }
});

router.put('/list/profile', checkListAuth, async (req, res, next) => {
  try {
    const listObj = req.body._id
      ? await Shoppinglist.updateProfile(req.session.listCode, req.body)
      : await Shoppinglist.addProfile(req.session.listCode, req.body);
    return res.json(listObj);
  } catch (error) {
    return next(error);
  }
});

router.delete('/list/profile/:id', checkListAuth, async (req, res, next) => {
  try {
    const listObj = await Shoppinglist.deleteProfile(req.session.listCode, req.params.id);
    return res.json(listObj);
  } catch (error) {
    return next(error);
  }
});

router.get('/list/profile/categories', async (req, res, next) => {
  try {
    const ordered = await LookupCategory.find().sort({ order: 1 }).lean();
    return res.json(ordered);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
