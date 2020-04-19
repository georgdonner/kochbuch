import { openDB } from 'idb';

const openDb = async () => openDB('recipes-db', 1, {
  upgrade(database) {
    database.createObjectStore('recipes', { keyPath: '_id' });
  },
});

export const getAll = async () => {
  const db = await openDb();
  const recipes = await db.getAll('recipes');
  recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return recipes;
};

const refreshDatabase = async (recipes) => {
  const db = await openDb();
  await db.clear('recipes');
  const tx = db.transaction('recipes', 'readwrite');
  recipes.forEach((recipe) => {
    tx.store.add(recipe);
  });
  return tx.done;
};

const fetchAllRecipes = async () => {
  const fetchReq = await fetch('/api/recipes?format=html', {
    headers: { 'Content-Type': 'application/json' },
  });
  return fetchReq.json();
};

export const syncDatabase = async (timeout) => {
  const recipesLocal = await getAll();
  let recipes;
  if (timeout && recipesLocal.length > 0) {
    const timeoutPromise = new Promise(((resolve) => {
      setTimeout(resolve, timeout, null);
    }));
    recipes = await Promise.race([timeoutPromise, fetchAllRecipes()]);
  } else {
    recipes = await fetchAllRecipes();
  }
  if (recipes) {
    await refreshDatabase(recipes);
    return recipes;
  }
  return recipesLocal;
};
