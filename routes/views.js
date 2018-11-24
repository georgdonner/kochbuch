const express = require('express');
const moment = require('moment');
require('moment/locale/de');
const { markdown } = require('markdown');

const router = express.Router();

const Recipe = require('../models/recipe');
const Shoppinglist = require('../models/shoppinglist');
const Weekplan = require('../models/weekplan');

const defaultRecipe = {
  title: '',
  servings: 2,
  duration: 30,
  difficulty: 1,
  ingredients: [],
  description: '',
  categories: [],
};

const checkAuth = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  return res.sendStatus(401);
};

router.get('/login', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/');
  }
  return res.render('login', { error: req.query.error });
});

router.post('/zauberwort', (req, res) => {
  const { zauberwort } = req.body;
  if (!zauberwort) {
    return res.status(400).send('Please provide a zauberwort in the request body.');
  } if (zauberwort === process.env.ZAUBERWORT) {
    req.session.authenticated = true;
    return res.redirect('/');
  }
  return res.redirect('/login?error=true');
});

router.get('/recipes/new', checkAuth, (req, res) => {
  res.render('recipe-form', { recipe: defaultRecipe });
});

router.get('/recipe/:id/edit', checkAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw new Error('Recipe not found.');
    res.render('recipe-form', { recipe });
  } catch (error) {
    res.send(error);
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const { servings } = req.query;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw new Error('Recipe not found.');
    const descriptionHtml = recipe.description ? markdown.toHTML(recipe.description) : '';
    res.render('recipe', {
      recipe, descriptionHtml, session: req.session, servings: servings || recipe.servings,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get('/list', checkAuth, async (req, res) => {
  try {
    const { code } = req.query;
    if (code) {
      req.session.listCode = code;
    }
    let list = null;
    if (req.session.listCode) {
      list = await Shoppinglist.getByName(req.session.listCode);
    }
    res.render('list', {
      list: list ? list.list : null,
      code: req.session.listCode,
    });
  } catch (error) {
    res.send(error);
  }
});

const getEntries = (plan, date) => plan.filter(entry => moment(entry.date).isSame(moment(date), 'day'));
const weekday = (date) => {
  moment.locale('de');
  if (moment(date).isSame(moment(), 'day')) {
    return 'Heute';
  } if (moment(date).isSame(moment().add(1, 'd'), 'day')) {
    return 'Morgen';
  }
  return moment(date).format('dddd');
};
const getWeek = (plan, offset = 0) => {
  const start = moment().startOf('isoWeek').add(offset, 'w');
  const week = [];
  for (let i = 0; i < 7; i += 1) {
    const date = moment(start).add(i, 'd').hours(12);
    week.push({
      date,
      dateString: offset === 0 ? weekday(date) : moment(date).format('DD.MM.YY'),
      entries: getEntries(plan, date),
    });
  }
  return week;
};

router.get('/plan', checkAuth, async (req, res) => {
  try {
    const { code, week = 0 } = req.query;
    if (code) {
      req.session.planCode = code;
    }
    let entries = null;
    if (req.session.planCode) {
      entries = await Weekplan.getWeek(req.session.planCode, +week);
    }
    res.render('plan', {
      week: getWeek(entries, +week),
      offset: +week,
      code: req.session.planCode,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get('/', (req, res) => {
  res.render('recipes', { session: req.session });
});

module.exports = router;
