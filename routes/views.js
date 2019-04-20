const express = require('express');
const moment = require('moment');
require('moment/locale/de');

moment.locale('de');
const { markdown } = require('markdown');

const router = express.Router();

const checkAuth = require('./helpers/check-auth');
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
  const uploadcareKey = process.env.UPLOADCARE_PUBLIC_KEY;
  res.render('recipe-form', { recipe: defaultRecipe, uploadcareKey });
});

router.get('/recipe/:id/edit', checkAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw new Error('Recipe not found.');
    const uploadcareKey = process.env.UPLOADCARE_PUBLIC_KEY;
    res.render('recipe-form', { recipe, uploadcareKey });
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
    let list = null;
    if (req.session.listCode) {
      list = await Shoppinglist.getByName(req.session.listCode);
    } else if (code) {
      list = await Shoppinglist.getByName(code);
      if (!list) {
        list = await Shoppinglist.addList(code);
      }
      req.session.listCode = code;
    }
    return res.render('list', {
      list: list ? list.list : null,
    });
  } catch (error) {
    return res.send(error);
  }
});

const getEntries = (plan, date) => plan.filter(entry => moment(entry.date).isSame(moment(date), 'day'));
const weekday = (date) => {
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
    let entries = null;
    if (req.session.planCode) {
      entries = await Weekplan.getWeek(req.session.planCode, +week);
    } else if (code) {
      entries = await Weekplan.getWeek(code, +week);
      if (!entries) {
        await Weekplan.addPlan(code);
        entries = [];
      }
      req.session.planCode = code;
    }
    return res.render('plan', {
      week: entries ? getWeek(entries, +week) : null,
      offset: +week,
    });
  } catch (error) {
    return res.send(error);
  }
});

router.get('/plan/new', checkAuth, async (req, res) => {
  try {
    if (!req.session.planCode) {
      res.redirect('/plan');
    }
    const { date, recipe } = req.query;
    let dateObj;
    if (date) {
      dateObj = moment(+date);
    } else {
      const nextDay = await Weekplan.getNextDay(req.session.planCode);
      dateObj = moment(nextDay);
    }
    const options = {
      mode: 'new',
      date: dateObj.format('YYYY-MM-DD'),
      time: '19:30',
      servings: 2,
      custom: '',
    };
    if (recipe) {
      const recipeObj = await Recipe.findById(recipe);
      if (recipeObj) {
        options.recipe = {
          id: recipe,
          title: recipeObj.title,
        };
      }
    }
    res.render('plan-form', options);
  } catch (error) {
    res.send(error);
  }
});

router.get('/plan/edit', checkAuth, async (req, res) => {
  try {
    if (!req.session.planCode) {
      res.redirect('/plan');
    }
    const { id } = req.query;
    let entry = await Weekplan.getEntry(req.session.planCode, id);
    entry = entry.toObject();
    if (!entry) {
      throw new Error('Entry not found');
    }
    res.render('plan-form', {
      mode: 'edit',
      date: moment(entry.date).format('YYYY-MM-DD'),
      time: entry.time,
      servings: entry.servings,
      custom: entry.custom,
      recipe: entry.recipe,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get('/settings', checkAuth, async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.render('settings', { session: req.session });
  }
  const promises = Object.entries(req.query).map(async ([key, value]) => {
    if (!value) {
      delete req.session[key];
    } else if (value !== req.session[key]) {
      if (key === 'listCode') {
        const list = await Shoppinglist.getByName(value);
        if (!list) {
          await Shoppinglist.addList(value);
        }
      } else if (key === 'planCode') {
        const plan = await Weekplan.getPlanByName(value);
        if (!plan) {
          await Weekplan.addPlan(value);
        }
      }
      req.session[key] = value;
    }
    return Promise.resolve();
  });
  await Promise.all(promises);
  return res.redirect('/');
});

router.get('/offline', (req, res) => {
  res.render('offline');
});

router.get('/', (req, res) => {
  res.render('recipes', { session: req.session });
});

module.exports = router;
