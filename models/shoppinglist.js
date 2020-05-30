const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const LookupCategory = require('./lookupCategory');

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
});

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
  filterByAction(updates, 'updated').forEach(({ id, newItem }) => {
    const item = list.find((it) => it.id === id);
    if (item) {
      item.name = newItem;
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

  return Shoppinglist
    .findOneAndUpdate({ name }, { list }, { new: true })
    .populate('list.category')
    .populate('profiles.orderedCategories');
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

module.exports.sortList = async (name, profileId) => {
  const { list, profiles } = await Shoppinglist.findOne({ name }).lean();
  let profile = (profiles || []).find(({ _id }) => _id === profileId);
  if (!profile) {
    profile = await getDefaultProfile();
  }
  const getCtgIndex = (category) => {
    const index = profile.orderedCategories.indexOf(category);
    return index === -1 ? Infinity : index;
  };
  list.sort((a, b) => getCtgIndex(a.category) - getCtgIndex(b.category));
  return Shoppinglist.updateList(name, { list });
};
