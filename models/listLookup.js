const mongoose = require('mongoose');
require('dotenv').config();

const LookupCategory = require('./lookupCategory');

const { Schema } = mongoose;
const schema = new Schema({
  item: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
    ref: LookupCategory.modelName,
  },
});

const ListLookup = mongoose.model('ListLookup', schema);
module.exports = ListLookup;
