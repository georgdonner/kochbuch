const mongoose = require('mongoose');

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
