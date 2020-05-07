const mongoose = require('mongoose');
const moment = require('moment');
require('dotenv').config();

// Weekplan Schema
const { Schema } = mongoose;
const schema = new Schema({
  weekplan: { type: Schema.Types.ObjectId, ref: 'Weekplan' },
  recipe: {
    id: String,
    title: String,
  },
  custom: String,
  date: Date,
  servings: Number,
  time: String,
});

const WeekplanEntry = mongoose.model('WeekplanEntry', schema);
module.exports = WeekplanEntry;

module.exports.getByPlan = (planId) => WeekplanEntry.find({ weekplan: planId });

module.exports.getEntry = async (entryId) => WeekplanEntry.findById(entryId);

module.exports.addEntry = (planId, entry) => WeekplanEntry.create({ weekplan: planId, ...entry });

module.exports.updateEntry = (entryId, update) => (
  WeekplanEntry.findByIdAndUpdate(entryId, update, { new: true })
);

module.exports.deleteEntry = (entryId) => WeekplanEntry.findByIdAndDelete(entryId);


module.exports.getWeek = async (planId, week) => {
  const from = moment().startOf('isoweek').add(week * 7, 'd').subtract(1, 'minute');
  const until = moment(from).add(7, 'd').add(1, 'minute');
  return WeekplanEntry.find({
    weekplan: planId,
    date: {
      $gte: from,
      $lte: until,
    },
  });
};

module.exports.getNextDay = async (planId) => {
  const firstPossibleDay = moment().hour() < 18 ? moment() : moment().add(1, 'd');
  const nextEntries = await WeekplanEntry.find({
    weekplan: planId,
    date: {
      $gte: moment().hours(0).minutes(0).seconds(0),
    },
  });
  let nextDay;
  let i = 0;
  while (!nextDay) {
    // eslint-disable-next-line no-loop-func
    const entry = nextEntries.find((e) => moment(firstPossibleDay).add(i, 'd').isSame(e.date, 'day'));
    if (!entry) {
      nextDay = firstPossibleDay.add(i, 'd').toISOString();
    }
    i += 1;
  }
  return nextDay;
};
