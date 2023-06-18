const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { compareTwoStrings: distance } = require('string-similarity');

const LookupCategory = require('./lookupCategory');
const ListLookup = require('./listLookup');

// Weekplan Schema
const { Schema } = mongoose;
const ShoppinglistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  list: {
    default: [],
    type: [{
      _id: false,
      name: String,
      id: String,
      category: {
        type: String,
        ref: LookupCategory.modelName,
      },
      ignoreSort: Boolean,
    }],
  },
  profiles: {
    default: undefined,
    type: [{
      name: String,
      orderedCategories: {
        default: undefined,
        type: [{
          type: String,
          ref: LookupCategory.modelName,
        }],
      },
    }],
  },
  lastUsedProfile: Schema.Types.ObjectId,
}, { toObject: { versionKey: false } });

const Shoppinglist = mongoose.model('Shoppinglist', ShoppinglistSchema);
module.exports = Shoppinglist;

module.exports.getByName = (name) => Shoppinglist
  .findOne({ name })
  .populate('list.category')
  .populate('profiles.orderedCategories');

module.exports.addList = (name) => Shoppinglist.create({ name, list: [] });

module.exports.updateList = (name, list) => (
  Shoppinglist
    .findOneAndUpdate({ name }, list, { upsert: true, new: true })
    .populate('list.category')
    .populate('profiles.orderedCategories')
);

const filterByAction = (updates, action) => updates.filter((update) => update.action === action);

module.exports.processListUpdates = async (name, { updates = [] } = {}) => {
  let currentList = await Shoppinglist.findOne({ name }).lean();
  if (!currentList) {
    const newList = await Shoppinglist.create({ name, list: [] });
    currentList = newList.toObject();
  }
  const { list } = currentList;

  filterByAction(updates, 'added').forEach(({ item, id }) => {
    list.push({ name: item, id: id || uuidv4() });
  });
  filterByAction(updates, 'removed').forEach(({ id }) => {
    const index = list.findIndex((item) => item.id === id);
    if (index > -1) {
      list.splice(index, 1);
    }
  });
  filterByAction(updates, 'updated').forEach(({ id, update }) => {
    const item = list.find((it) => it.id === id);
    if (item) {
      const { id: itemId, ...itemUpdate } = update;
      Object.assign(item, itemUpdate);
      if (itemUpdate.category) {
        item.ignoreSort = true;
      }
    }
  });
  filterByAction(updates, 'moved').forEach(({ id, index }) => {
    const currentIndex = list.findIndex((item) => item.id === id);
    const item = list[currentIndex];
    if (currentIndex > -1) {
      list.splice(currentIndex, 1);
      list.splice(index, 0, item);
    }
  });

  const updated = await Shoppinglist
    .findOneAndUpdate({ name }, { list }, { new: true })
    .populate('list.category')
    .populate('profiles.orderedCategories');

  if (list.some(({ category }) => category)) {
    return Shoppinglist.sortList(name);
  }
  return updated;
};

module.exports.getItem = async (name, itemId) => {
  const { list } = await Shoppinglist
    .findOne({ name, 'list.id': itemId }, { 'list.$': 1 });
  return list.length ? list[0] : null;
};

module.exports.addItem = (name, item) => (
  Shoppinglist
    .findOneAndUpdate({ name }, { $push: { list: item } }, { new: true })
    .populate('list.category')
    .populate('profiles.orderedCategories')
);

const getDefaultProfile = async () => {
  const ordered = await LookupCategory.find().sort({ order: 1 }).lean();
  return {
    name: 'Default',
    orderedCategories: ordered.map(({ _id }) => _id),
  };
};

const sanitizeItem = (value) => value
  .replace(/\d+(\.|,|\/|-)?\d*/i, '').trim() // quantity
  .replace(/^((packung|prise|zehe|stange|dose|flasche|tasse|messerspitze|päckchen|scheibe|tüte)\w?)\s/i, '') // unit
  .replace(/^(glas|gläser|g|kg|l|ml|tl|el|bund)\s/i, '') // unit
  .replace(/\(.*\)/i, '') // hint
  .trim();

const getCustomMatch = (item) => {
  const map = new Map();
  map.set(/(\W|^)tk(\W|$)/i, 'tk'); // match "tk"
  map.set(/tief\w*kühl/, 'tk');
  map.set(/(glas|dose|büchse)$/i, 'konserven');
  for (const [regex, category] of map) {
    if (item.match(regex)) {
      return category;
    }
  }
  return null;
};

const getBestMatch = (item, lookups) => {
  const compare = sanitizeItem(item.toLowerCase());
  const withScores = lookups.map((lookup) => ({
    score: distance(compare, lookup.item),
    ...lookup,
  }));
  withScores.sort((a, b) => b.score - a.score);
  return withScores[0];
};

const scoreList = async (list) => {
  const listLookups = await ListLookup.find().lean();
  return list
    .map((item) => {
      if (item.ignoreSort) return item;
      const customMatch = getCustomMatch(item.name);
      if (customMatch) {
        return { ...item, category: customMatch };
      }
      const bestMatch = getBestMatch(item.name, listLookups);
      if (bestMatch.score >= 0.5) {
        return { ...item, category: bestMatch.category };
      }
      return item;
    });
};

const resolveProfile = async (profileId, { profiles = [], lastUsedProfile }) => {
  let profile;
  if (!profileId && lastUsedProfile) {
    profile = profiles.find(({ _id }) => String(_id) === String(lastUsedProfile));
  } else if (profiles.length === 1) {
    [profile] = profiles;
  } else if (profiles.length > 1) {
    profile = profiles.find(({ _id }) => String(_id) === profileId);
  }
  if (!profile) {
    profile = await getDefaultProfile();
  }
  return profile;
};

module.exports.sortList = async (name, profileId) => {
  const listObj = await Shoppinglist.findOne({ name }).lean();
  const scoredList = await scoreList(listObj.list);
  const profile = await resolveProfile(profileId, listObj);
  const getCtgIndex = (category) => {
    const index = profile.orderedCategories.indexOf(category);
    return index === -1 ? Infinity : index;
  };
  scoredList.sort((a, b) => getCtgIndex(a.category) - getCtgIndex(b.category));
  return Shoppinglist.updateList(name, { list: scoredList, lastUsedProfile: profile._id });
};

module.exports.addProfile = async (name, profile) => (
  Shoppinglist
    .findOneAndUpdate({ name }, { $push: { profiles: profile } }, { new: true })
    .populate('list.category')
    .populate('profiles.orderedCategories')
);

module.exports.updateProfile = async (name, profile) => (
  Shoppinglist
    .findOneAndUpdate(
      { name, 'profiles._id': profile._id },
      { $set: { 'profiles.$': profile } },
      { new: true },
    )
    .populate('list.category')
    .populate('profiles.orderedCategories')
);

module.exports.deleteProfile = async (name, profileId) => (
  Shoppinglist
    .findOneAndUpdate(
      { name },
      { $pull: { profiles: { _id: profileId } } },
      { new: true },
    )
    .populate('list.category')
    .populate('profiles.orderedCategories')
);
