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

module.exports.getListByName = (name, callback) => {
  Shoppinglist.findOne({ name }, callback);
};

module.exports.addList = (newList, callback) => {
  newList.save(callback);
};

module.exports.updateList = (name, newList, callback) => {
  Shoppinglist.findOneAndUpdate({ name }, newList, { upsert: true, new: true }, callback);
};
