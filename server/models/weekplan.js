const mongoose = require('mongoose');
require('dotenv').config();

// Weekplan Schema
const { Schema } = mongoose;
const WeekplanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  plan: [{
    recipe: {
      id: String,
      title: String,
    },
    custom: String,
    date: Date,
    servings: Number,
    time: String,
  }],
});

const Weekplan = mongoose.model('Weekplan', WeekplanSchema);
module.exports = Weekplan;

module.exports.getPlanByName = (name, callback) => {
  Weekplan.findOne({ name }, callback);
};

module.exports.addPlan = (newPlan, callback) => {
  newPlan.save(callback);
};

module.exports.updatePlan = (name, newPlan, callback) => {
  Weekplan.findOneAndUpdate({ name }, newPlan, { upsert: true, new: true }, callback);
};
