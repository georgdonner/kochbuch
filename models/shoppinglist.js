const mongoose = require('mongoose');
require('dotenv').config();

// Weekplan Schema
const { Schema } = mongoose;
const ShoppinglistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  list: [String],
});

const Shoppinglist = mongoose.model('Shoppinglist', ShoppinglistSchema);
module.exports = Shoppinglist;

module.exports.getByName = (name) => Shoppinglist.findOne({ name });

module.exports.addList = (name) => Shoppinglist.create({ name, list: [] });

module.exports.updateList = (name, list) => (
  Shoppinglist.findOneAndUpdate({ name }, list, { upsert: true, new: true })
);

const filterByAction = (updates, action) => updates.filter((update) => update.action === action);
module.exports.processListUpdates = async (name, { list, updates = [] } = {}) => {
  const currentList = await Shoppinglist.findOne({ name });
  const mergedSet = new Set(list ? list.concat(currentList.list) : currentList.list);
  filterByAction(updates, 'added').forEach(({ item }) => {
    mergedSet.add(item);
  });
  filterByAction(updates, 'removed').forEach(({ item }) => {
    mergedSet.delete(item);
  });
  const mergedList = Array.from(mergedSet);
  currentList.list = mergedList;
  await currentList.save();
  return currentList;
};

module.exports.addItem = (name, item) => (
  Shoppinglist.findOneAndUpdate({ name }, { $push: { list: item } }, { new: true })
);
