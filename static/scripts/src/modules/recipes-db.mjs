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
    const scores = toSearch.map(str => getScore(str, term, regex));
    const bestScore = scores.reduce((a, b) => Math.max(a, b));
    if (bestScore <= 0) {
      return 0;
    }
    totalScore += bestScore;
  }
  return totalScore;
};

const getAll = db => new Promise((resolve, reject) => {
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
  if (diet) {
    searchQuery = query ? `${query}, ${diet}` : diet;
  }
  if (!searchQuery) {
    return recipes;
  }
  const terms = searchQuery.split(/,\s*/)
    .map(term => term.toLowerCase().trim())
    .map(term => SEARCH_MAP[term] || term);
  const regexTerms = terms.map(term => new RegExp(`\\S*${term}\\S*`, 'i'));
  const regexTermsShort = terms.map(term => new RegExp(`\\S*${term.slice(0, -1)}\\S*`, 'i'));
  const matches = recipes
    .map(recipe => ({ recipe, score: searchScore(recipe, terms, regexTerms) }))
    .filter(({ score }) => score > 0);
  matches.sort((a, b) => b.score - a.score);
  const matchesShort = recipes
    .map(recipe => ({ recipe, score: searchScore(recipe, terms, regexTermsShort) }))
    .filter(({ score }) => score > 0);
  matchesShort.sort((a, b) => b.score - a.score);
  const allMatches = matches.concat(
    matchesShort.filter(({ recipe }) => !matches.find(match => recipe._id === match.recipe._id)),
  );
  return allMatches.map(({ recipe }) => recipe);
};

const addRecipe = (recipe, db) => new Promise((resolve, reject) => {
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const req = store.add(recipe);
  req.onerror = reject;
  req.onsuccess = resolve;
});

const removeRecipe = (id, db) => new Promise((resolve, reject) => {
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const req = store.delete(id);
  req.onerror = reject;
  req.onsuccess = resolve;
});

const updateRecipe = (recipe, db) => new Promise((resolve, reject) => {
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const req = store.get(recipe._id);
  req.onerror = reject;
  req.onsuccess = (event) => {
    let data = event.target.result;
    let requestUpdate;
    if (data) {
      data = Object.assign(data, recipe);
      requestUpdate = store.put(data);
    } else {
      requestUpdate = store.add(recipe);
    }
    requestUpdate.onerror = reject;
    requestUpdate.onsuccess = resolve;
  };
});

const fetchUpdatedData = async (recipes) => {
  const payload = {
    lastUpdated: window.localStorage.getItem('lastUpdated'),
    ids: recipes.map(recipe => recipe._id),
  };
  const fetchReq = await fetch('/api/recipes/changes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const body = await fetchReq.json();
  window.localStorage.setItem('lastUpdated', body.lastUpdated);
  return body.data;
};

export const syncDatabase = async (timeout) => {
  const db = await openDb();
  if (!db) {
    throw new Error('No db found');
  }
  const recipes = await getAll(db);
  let data;
  if (timeout && recipes.length > 0) {
    const timeoutPromise = new Promise(((resolve) => {
      setTimeout(resolve, timeout, null);
    }));
    data = await Promise.race([timeoutPromise, fetchUpdatedData(recipes)]);
  } else {
    data = await fetchUpdatedData(recipes);
  }
  if (data) {
    const { removed, updated } = data;
    await Promise.all(removed.map(id => removeRecipe(id, db)));
    await Promise.all(updated.map(recipe => updateRecipe(recipe, db)));
  }
  return Boolean(data);
};

const fetchAllRecipes = async () => {
  const fetchReq = await fetch('/api/recipes?format=html', {
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await fetchReq.json();
  window.localStorage.setItem('lastUpdated', Date.now());
  return body;
};

const clearDatabase = db => new Promise((resolve, reject) => {
  const store = db.transaction('recipes', 'readwrite').objectStore('recipes');
  const clearReq = store.clear();
  clearReq.onsuccess = resolve;
  clearReq.onerror = reject;
});

export const refreshDatabase = async () => {
  const db = await openDb();
  if (!db) {
    throw new Error('No db found');
  }
  const recipes = await fetchAllRecipes();
  await clearDatabase(db);
  return Promise.all(recipes.map(recipe => addRecipe(recipe, db)));
};
