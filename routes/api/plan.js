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
router.get('/plan/:name', checkPlanAuth, (req, res) => {
  Weekplan.getPlanByName(req.params.name, (err, plan) => {
    if (err) {
      res.send(err);
    }
    res.json(plan);
  });
});

// New weekplan
router.post('/plans', checkAuth, (req, res) => {
  const newPlan = new Weekplan({ ...req.body });
  Weekplan.addPlan(newPlan, (err, plan) => {
    if (err) {
      res.send(err);
    }
    res.json(plan);
  });
});

// Update weekplan
router.put('/plan/:name', checkPlanAuth, (req, res) => {
  const updPlan = new Weekplan({ ...req.body });

  const newData = updPlan.toObject();
  delete newData._id;
  Weekplan.updatePlan(req.params.name, newData, (err, plan) => {
    if (err) {
      res.send(err);
    }
    res.json(plan);
  });
});

router.post('/plan/:name', checkPlanAuth, async (req, res) => {
  try {
    await Weekplan.addEntry(req.params.name, req.body);
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error);
  }
});

router.put('/plan/:name/:id', checkPlanAuth, async (req, res) => {
  try {
    await Weekplan.updateEntry(req.params.name, req.params.id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/plan/:name/:id', checkPlanAuth, async (req, res) => {
  try {
    await Weekplan.deleteEntry(req.params.name, req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
