
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
    resolve(db);
  };
});

function matchRecipe(recipe, terms) {
  // eslint-disable-next-line arrow-body-style
  const matched = terms.filter((term) => {
    return recipe.title.toLowerCase().includes(term)
        || recipe.ingredients.find(ingr => ingr.name.toLowerCase().includes(term))
        || recipe.categories.find(ctg => ctg.toLowerCase().includes(term));
  });
  return matched.length === terms.length;
}

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
  return recipes.filter(recipe => matchRecipe(recipe, terms));
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
