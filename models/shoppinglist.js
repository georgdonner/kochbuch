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

module.exports.getByName = name => Shoppinglist.findOne({ name });

module.exports.addList = name => Shoppinglist.create({ name });

module.exports.updateList = (name, list) => (
  Shoppinglist.findOneAndUpdate({ name }, list, { upsert: true, new: true })
);

module.exports.addItem = (name, item) => (
  Shoppinglist.findOneAndUpdate({ name }, { $push: { list: item } }, { new: true })
);
