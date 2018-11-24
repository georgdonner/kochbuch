const mongoose = require('mongoose');
const moment = require('moment');
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

module.exports.getWeek = async (name, week) => {
  const planObj = await Weekplan.findOne({ name });
  if (planObj) {
    const { plan } = planObj;
    // 1 for monday
    const from = moment().day(1 + (week * 7)).startOf('day');
    const until = moment().day(1 + ((week + 1) * 7)).startOf('day');
    const entries = plan.filter(entry => moment(entry.date) >= from && moment(entry.date) <= until);
    entries.sort((a, b) => new Date(a.date) - new Date(b.date));
    return entries;
  }
  return null;
};
