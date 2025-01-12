const express = require('express');
const { getAuth } = require('@clerk/express');

const router = express.Router();

const Shoppinglist = require('../../models/shoppinglist');
const LookupCategory = require('../../models/lookupCategory');
const CategoryLog = require('../../models/categoryLog');
const StatusError = require('../middleware/status-error');

const checkListAuth = (req, res, next) => {
  const auth = getAuth(req);
  if (auth.sessionClaims?.metadata?.listCode) {
    return next();
  }
  return res.sendStatus(401);
};

const getListCode = async (req) => {
  const auth = getAuth(req);
  const listCode = auth.sessionClaims?.metadata?.listCode;

  if (!listCode) {
    throw new StatusError('Could not resolve list code', 404);
  }

  return listCode;
};

// Get Shopping List
router.get('/list', checkListAuth, async (req, res, next) => {
  try {
    const listCode = await getListCode(req);
    const list = await Shoppinglist.getByName(listCode);
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
    const listCode = await getListCode(req);
    const updList = new Shoppinglist({ ...req.body });
    const newData = updList.toObject();
    delete newData._id;
    const list = await Shoppinglist.updateList(listCode, newData);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

// Update Shopping List with "added", "removed", "updated" and "moved" actions
const listUpdates = async (req, res, next) => {
  try {
    const updates = req.body || [];
    const listCode = await getListCode(req);
    await Promise.all(updates
      .filter((update) => update.action === 'updated' && update.update.category)
      .map(async ({ update, id }) => {
        const item = await Shoppinglist.getItem(listCode, id);
        return CategoryLog.create({
          item: item.name,
          category: update.category,
          oldCategory: item.category,
        });
      }));
    const list = await Shoppinglist.processListUpdates(listCode, { updates });
    return res.json(list);
  } catch (error) {
    return next(error);
  }
};

router.put('/list/updates', checkListAuth, listUpdates);
router.post('/list/updates', checkListAuth, listUpdates);

router.post('/list', checkListAuth, async (req, res, next) => {
  try {
    const listCode = await getListCode(req);
    const list = await Shoppinglist.addItem(listCode, req.body.item);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

router.get('/list/sort', checkListAuth, async (req, res, next) => {
  const { profile } = req.query;
  try {
    const listCode = await getListCode(req);
    const sorted = await Shoppinglist.sortList(listCode, profile);
    return res.json(sorted);
  } catch (error) {
    return next(error);
  }
});

router.put('/list/profile', checkListAuth, async (req, res, next) => {
  try {
    const listCode = await getListCode(req);
    const listObj = req.body._id
      ? await Shoppinglist.updateProfile(listCode, req.body)
      : await Shoppinglist.addProfile(listCode, req.body);
    return res.json(listObj);
  } catch (error) {
    return next(error);
  }
});

router.delete('/list/profile/:id', checkListAuth, async (req, res, next) => {
  try {
    const listCode = await getListCode(req);
    const listObj = await Shoppinglist.deleteProfile(listCode, req.params.id);
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
