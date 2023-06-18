const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  item: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  oldCategory: String,
});

const CategoryLog = mongoose.model('CategoryLog', schema);
module.exports = CategoryLog;
