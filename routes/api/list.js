const { compareTwoStrings: distance } = require('string-similarity');
const express = require('express');

const router = express.Router();

const Shoppinglist = require('../../models/shoppinglist');
const ListLookup = require('../../models/listLookup');
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

// Update Shopping List with "added" and "removed" actions
router.put('/list/updates', checkListAuth, async (req, res, next) => {
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
});

router.post('/list', checkListAuth, async (req, res, next) => {
  try {
    const list = await Shoppinglist.addItem(req.session.listCode, req.body.item);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

const sanitizeItem = (value) => value
  .replace(/\d+(\.|,|\/|-)?\d*/i, '').trim() // quantity
  .replace(/^((packung|prise|zehe|stange|dose|flasche|tasse|messerspitze|päckchen|scheibe|tüte)\w?)\s/i, '') // unit
  .replace(/^(glas|gläser|g|kg|l|ml|tl|el|bund)\s/i, '') // unit
  .replace(/\(.*\)/i) // hint
  .trim();

const getBestMatch = (item, lookups) => {
  const compare = sanitizeItem(item.toLowerCase());
  const withScores = lookups.map((lookup) => ({
    score: distance(compare, lookup.item),
    ...lookup,
  }));
  withScores.sort((a, b) => b.score - a.score);
  return withScores[0];
};

router.get('/list/sort', checkListAuth, async (req, res, next) => {
  const { profile } = req.query;
  try {
    const listObj = await Shoppinglist.findOne({ name: req.session.listCode });
    const listLookups = await ListLookup.find().lean();
    listObj.list
      .filter((item) => !item.ignoreSort)
      .forEach(async (item) => {
        const bestMatch = getBestMatch(item.name, listLookups);
        if (bestMatch.score >= 0.5) {
          item.category = bestMatch.category; // eslint-disable-line
        }
      });
    await listObj.save();
    const sorted = await Shoppinglist.sortList(listObj.name, profile);
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
