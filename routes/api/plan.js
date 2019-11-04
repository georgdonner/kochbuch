const express = require('express');

const router = express.Router();

const Weekplan = require('../../models/weekplan');

const checkPlanAuth = (req, res, next) => {
  if (req.session.planCode) {
    return next();
  }
  return res.sendStatus(401);
};

// Get weekplan
router.get('/plan', checkPlanAuth, async (req, res, next) => {
  try {
    const plan = await Weekplan.getPlanByName(req.session.planCode);
    return res.json(plan);
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
    await Weekplan.addEntry(req.session.planCode, req.body);
    return res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
});

router.put('/plan/:id', checkPlanAuth, async (req, res, next) => {
  try {
    await Weekplan.updateEntry(req.session.planCode, req.params.id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
});

router.delete('/plan/:id', checkPlanAuth, async (req, res, next) => {
  try {
    await Weekplan.deleteEntry(req.session.planCode, req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
