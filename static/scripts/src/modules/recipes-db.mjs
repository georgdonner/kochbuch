/* eslint-disable quote-props, object-property-newline */
const SEARCH_MAP = {
  'nudeln': 'pasta',
  'möhre': 'karotte', 'möhren': 'karotten',
  'lauchzwiebel': 'frühlingszwiebel', 'lauchzwiebeln': 'frühlingszwiebeln',
  'stangensellerie': 'staudensellerie',
};
/* eslint-enable quote-props, object-property-newline  */

const openDb = () => new Promise((resolve, reject) => {
  const request = window.indexedDB.open('recipes-db');
  request.onerror = () => {
    reject(new Error(`DB request error: ${request.errorCode}`));
  };
  request.onsuccess = (event) => {
    const db = event.target.result;
    db.onerror = (dbEvent) => {
      console.error(`Database error: ${dbEvent.target.errorCode}`);
    };
    resolve(db);
  };
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('recipes', { keyPath: '_id' });
  };
});

const searchScore = (recipe, terms, regexTerms) => {
  const getScore = (str, term, regex) => {
    const matches = regex.exec(str);
    return matches ? (1 / (Math.abs(matches[0].length - term.length) + 1)) : 0;
  };
  const toSearch = [
    recipe.title,
    recipe.ingredients.map(({ name }) => name).join(' '),
    recipe.categories.join(' '),
  ];
  let totalScore = 0;
  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i];
    const regex = regexTerms[i];
    const scores = toSearch.map((str) => getScore(str, term, regex));
    const bestScore = scores.reduce((a, b) => Math.max(a, b));
    if (bestScore <= 0) {
      return 0;
    }
    totalScore += bestScore;
  }
  return totalScore;
};

const getAll = (db) => new Promise((resolve, reject) => {
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const req = store.getAll();
  req.onerror = reject;
  req.onsuccess = () => {
    resolve(req.result);
  };
});

export const getRecipes = async (query) => {
  const db = await openDb();
  if (!db) {
    throw new Error('No db found');
  }
  const recipes = await getAll(db);
  recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let searchQuery = query;
  const diet = window.localStorage.getItem('diet');
  const ignoreDiet = query.endsWith('!');
  if (ignoreDiet) query.replace(/!$/, '');
  if (diet && !ignoreDiet) {
    searchQuery = query ? `${query}, ${diet}` : diet;
  }
  if (!searchQuery) {
    return recipes;
  }
  const terms = searchQuery.split(/,\s*/)
    .map((term) => term.toLowerCase().trim())
    .map((term) => SEARCH_MAP[term] || term);
  const regexTerms = terms.map((term) => new RegExp(`\\S*${term}\\S*`, 'i'));
  const regexTermsShort = terms.map((term) => new RegExp(`\\S*${term.slice(0, -1)}\\S*`, 'i'));
  const matches = recipes
    .map((recipe) => ({ recipe, score: searchScore(recipe, terms, regexTerms) }))
    .filter(({ score }) => score > 0);
  matches.sort((a, b) => b.score - a.score);
  const matchesShort = recipes
    .map((recipe) => ({ recipe, score: searchScore(recipe, terms, regexTermsShort) }))
    .filter(({ score }) => score > 0);
  matchesShort.sort((a, b) => b.score - a.score);
  const allMatches = matches.concat(
    matchesShort.filter(({ recipe }) => !matches.find((match) => recipe._id === match.recipe._id)),
  );
  return allMatches.map(({ recipe }) => recipe);
};

const addRecipes = (recipes, db) => new Promise((resolve) => {
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  let i = 0;
  const addNext = () => {
    if (i < recipes.length) {
      store.add(recipes[i]).onsuccess = addNext;
      i += 1;
    } else { // complete
      resolve();
    }
  };
  addNext();
});

const fetchAllRecipes = async () => {
  const fetchReq = await fetch('/api/recipes?format=html', {
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await fetchReq.json();
  window.localStorage.setItem('lastUpdated', Date.now());
  return body;
};

const clearDatabase = (db) => new Promise((resolve, reject) => {
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const clearReq = store.clear();
  clearReq.onsuccess = resolve;
  clearReq.onerror = reject;
});

export const syncDatabase = async (timeout) => {
  const db = await openDb();
  if (!db) {
    throw new Error('No db found');
  }
  const recipesLocal = await getAll(db);
  const lastUpdated = window.localStorage.getItem('lastUpdated');
  let recipes;
  if (timeout && recipesLocal.length > 0) {
    const timeoutPromise = new Promise(((resolve) => {
      setTimeout(resolve, timeout, null);
    }));
    recipes = await Promise.race([timeoutPromise, fetchAllRecipes()]);
  } else {
    recipes = await fetchAllRecipes();
  }
  if (window.localStorage.getItem('lastUpdated') !== lastUpdated) {
    console.log('Recipe data refreshed'); // eslint-disable-line no-console
    await clearDatabase(db);
    await addRecipes(recipes, db);
  }
  return Boolean(recipes);
};

export const refreshDatabase = async () => {
  const db = await openDb();
  if (!db) {
    throw new Error('No db found');
  }
  const recipes = await fetchAllRecipes();
  await clearDatabase(db);
  return addRecipes(recipes, db);
};
