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
  if (!query) {
    return recipes;
  }
  const terms = query.split(/,\s*/).map(term => term.toLowerCase());
  const regexTerms = terms.map(term => new RegExp(`\\S*${term.slice(0, -1)}\\S*`, 'i'));
  const matches = recipes
    .map(recipe => ({ recipe, score: searchScore(recipe, terms, regexTerms) }))
    .filter(({ score }) => score > 0);
  matches.sort((a, b) => b.score - a.score);
  return matches.map(({ recipe }) => recipe);
};

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

export const syncDatabase = async () => {
  const db = await openDb();
  if (!db) {
    throw new Error('No db found');
  }
  const recipes = await getAll(db);
  const { removed, updated } = await fetchUpdatedData(recipes);
  await Promise.all(removed.map(id => removeRecipe(id, db)));
  await Promise.all(updated.map(recipe => updateRecipe(recipe, db)));
};
