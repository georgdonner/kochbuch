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
    const from = moment().startOf('isoweek').add(week * 7, 'd').subtract(1, 'minute');
    const until = moment(from).add(7, 'd').add(1, 'minute');
    const entries = plan.filter(entry => moment(entry.date).isBetween(from, until));
    entries.sort((a, b) => new Date(a.date) - new Date(b.date));
    return entries;
  }
  return null;
};

module.exports.getEntry = async (name, entryId) => {
  const { plan } = await Weekplan.findOne({ name });
  return plan.find(entry => entry._id.toString() === entryId);
};

module.exports.addEntry = (name, entry) => (
  Weekplan.findOneAndUpdate({ name }, { $push: { plan: entry } })
);

module.exports.updateEntry = (name, entryId, entry) => (
  Weekplan.findOneAndUpdate(
    { name, 'plan._id': entryId },
    { $set: { 'plan.$': entry } },
  )
);

module.exports.deleteEntry = (name, entryId) => (
  Weekplan.findOneAndUpdate(
    { name },
    { $pull: { plan: { _id: entryId } } },
  )
);

module.exports.getNextDay = async (name) => {
  const plan = await Weekplan.findOne({ name });
  const date = moment().hour() < 16 ? moment() : moment().add(1, 'd');
  let nextDay;
  let i = 0;
  while (!nextDay) {
    // eslint-disable-next-line no-loop-func
    const entry = plan.plan.find(e => moment(date).add(i, 'd').isSame(e.date, 'day'));
    if (!entry) {
      nextDay = date.add(i, 'd').toISOString();
    }
    i += 1;
  }
  return nextDay;
};
