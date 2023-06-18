const express = require('express');

const router = express.Router();

const Weekplan = require('../../models/weekplan');
const WeekplanEntry = require('../../models/weekplanEntry');

const checkPlanAuth = (req, res, next) => {
  if (req.session.planCode) {
    return next();
  }
  return res.sendStatus(401);
};

const getPlan = async (code) => {
  let plan = await Weekplan.getPlanByName(code);
  if (!plan) {
    plan = await Weekplan.addPlan(code);
  }
  return plan;
};

// Get weekplan
router.get('/plan', checkPlanAuth, async (req, res, next) => {
  try {
    const plan = await getPlan(req.session.planCode);

    const nextEntries = Number(req.query.next) || 0;
    if (nextEntries) {
      const entries = await WeekplanEntry.getNextEntries(plan._id, nextEntries);
      return res.json(entries);
    }

    const week = Number(req.query.week) || 0;
    const entries = await WeekplanEntry.getWeek(plan._id, week);
    return res.json(entries);
  } catch (error) {
    return next(error);
  }
});

// New weekplan
router.post('/plans', async (req, res, next) => {
  try {
    const added = await Weekplan.addPlan(req.body.name);
    return res.json(added);
  } catch (error) {
    return next(error);
  }
});

router.post('/plan', checkPlanAuth, async (req, res, next) => {
  try {
    const plan = await getPlan(req.session.planCode);
    const update = req.body;
    if (!update.date) {
      update.date = await WeekplanEntry.getNextDay(plan._id);
    }
    await WeekplanEntry.addEntry(plan._id, update);
    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
});

router.get('/plan/nextday', checkPlanAuth, async (req, res, next) => {
  try {
    const plan = await getPlan(req.session.planCode);
    const nextDay = await WeekplanEntry.getNextDay(plan._id);
    return res.json({ day: nextDay });
  } catch (error) {
    return next(error);
  }
});

router.get('/plan/:id', checkPlanAuth, async (req, res, next) => {
  try {
    const entry = await WeekplanEntry.getEntry(req.params.id);
    return res.json(entry);
  } catch (error) {
    return next(error);
  }
});

router.put('/plan/:id', checkPlanAuth, async (req, res, next) => {
  try {
    await WeekplanEntry.updateEntry(req.params.id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
});

router.delete('/plan/:id', checkPlanAuth, async (req, res, next) => {
  try {
    await WeekplanEntry.deleteEntry(req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
