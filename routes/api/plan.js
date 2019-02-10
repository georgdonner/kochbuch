const express = require('express');

const router = express.Router();

const checkAuth = require('../helpers/check-auth');
const Weekplan = require('../../models/weekplan');

const checkPlanAuth = (req, res, next) => {
  if (req.session.authenticated && req.session.planCode) {
    return next();
  }
  return res.sendStatus(401);
};

// Get weekplan
router.get('/plan', checkPlanAuth, async (req, res) => {
  try {
    const plan = await Weekplan.getPlanByName(req.session.planCode);
    return res.json(plan);
  } catch (error) {
    return res.send(error);
  }
});

// New weekplan
router.post('/plans', checkAuth, async (req, res) => {
  try {
    const added = await Weekplan.addPlan(req.body.name);
    return res.json(added);
  } catch (error) {
    return res.send(error);
  }
});

router.post('/plan', checkPlanAuth, async (req, res) => {
  try {
    await Weekplan.addEntry(req.session.planCode, req.body);
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error);
  }
});

router.put('/plan/:id', checkPlanAuth, async (req, res) => {
  try {
    await Weekplan.updateEntry(req.session.planCode, req.params.id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/plan/:id', checkPlanAuth, async (req, res) => {
  try {
    await Weekplan.deleteEntry(req.session.planCode, req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
