const mongoose = require('mongoose');

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
  const from = new Date();
  from.setDate(from.getDate() - ((from.getDay() + 6) % 7) + (week * 7));
  from.setUTCHours(0, 0, 0, 0);
  const until = new Date(from);
  until.setDate(until.getDate() + 7);

  return WeekplanEntry.find({
    weekplan: planId,
    date: {
      $gte: from,
      $lte: until,
    },
  });
};

module.exports.getNextEntries = async (planId, next = 1) => {
  const from = new Date();
  from.setUTCHours(0, 0, 0, 0);

  return WeekplanEntry
    .find({
      weekplan: planId,
      date: {
        $gte: from,
      },
      recipe: { $exists: true },
    })
    .sort({ date: 1 })
    .limit(next);
};

module.exports.getNextDay = async (planId) => {
  const from = new Date();
  from.setUTCHours(0, 0, 0, 0);

  const nextEntries = await WeekplanEntry.find({
    weekplan: planId,
    date: {
      $gte: from,
    },
  });

  const firstPossibleDay = new Date();
  if (firstPossibleDay.getHours() > 18) {
    firstPossibleDay.setDate(firstPossibleDay.getDate() + 1);
  }

  let nextDay;
  while (!nextDay) {
    // eslint-disable-next-line no-loop-func
    const entry = nextEntries.find((e) => firstPossibleDay.getDay() === e.date.getDay());
    if (!entry) {
      nextDay = firstPossibleDay.toISOString();
    }
    firstPossibleDay.setDate(firstPossibleDay.getDate() + 1);
  }
  return nextDay;
};
