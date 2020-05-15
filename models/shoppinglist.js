const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

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
    }],
  },
});

const Shoppinglist = mongoose.model('Shoppinglist', ShoppinglistSchema);
module.exports = Shoppinglist;

module.exports.getByName = (name) => Shoppinglist.findOne({ name });

module.exports.addList = (name) => Shoppinglist.create({ name, list: [] });

module.exports.updateList = (name, list) => (
  Shoppinglist.findOneAndUpdate({ name }, list, { upsert: true, new: true })
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

  return Shoppinglist.findOneAndUpdate({ name }, { list }, { new: true });
};

module.exports.addItem = (name, item) => (
  Shoppinglist.findOneAndUpdate({ name }, { $push: { list: item } }, { new: true })
);
