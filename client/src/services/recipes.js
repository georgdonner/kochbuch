import { openDb } from './db';
import api from './api';

export const getAll = async () => {
  const db = await openDb();
  const recipes = await db.getAll('recipes');
  recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return recipes;
};

export const refreshDatabase = async (recipes) => {
  const db = await openDb();
  await db.clear('recipes');
  const tx = db.transaction('recipes', 'readwrite');
  recipes.forEach((recipe) => {
    tx.store.add(recipe);
  });
  return tx.done;
};

const fetchAllRecipes = async () => api.get('/recipes?format=html');

export const syncDatabase = async (timeout) => {
  const recipesLocal = await getAll();
  try {
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
  } catch (error) {
    return recipesLocal;
  }
  return recipesLocal;
};
