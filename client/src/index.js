import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { polyfill } from 'mobile-drag-drop';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './app';
import Loading from './components/Loading';
import MainContext from './services/context';
import { syncDatabase, refreshDatabase, getAll } from './services/recipes';
import { getUser } from './services/auth';
import { withTimeout } from './utils';
import './index.scss';

polyfill({
  forceApply: true,
  dragStartConditionOverride: ((e) => {
    if (e.target.classList.contains('draggable')) {
      return true;
    }
    return false;
  }),
  holdToDrag: 250,
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const sw = `${window.location.origin}/service-worker.js`;
    navigator.serviceWorker.register(sw);
  });
}

toast.configure({
  position: 'bottom-center',
  hideProgressBar: true,
});

const Root = () => {
  const [recipes, setRecipes] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const emptyFn = () => {};
    window.addEventListener('touchmove', emptyFn);
    return () => window.removeEventListener('touchmove', emptyFn);
  }, []);

  useEffect(() => {
    const initialSync = async () => {
      const localRecipes = await getAll();
      setRecipes(localRecipes);

      const timeout = 5000;
      const [recipesRes, userRes] = await Promise.allSettled([
        syncDatabase(timeout),
        withTimeout(getUser, { timeout }),
      ]);

      if (userRes.value && !userRes.value.error) {
        setUser(userRes.value);
      }
      setRecipes(recipesRes.value);
      setLoading(false);
    };
    initialSync();
  }, []);

  const addRecipe = (recipe) => {
    const newRecipes = recipes.concat(recipe);
    setRecipes(newRecipes);
    refreshDatabase(newRecipes);
  };

  const updateRecipe = (recipe) => {
    const newRecipes = recipes.map((it) => it._id === recipe._id ? recipe : it);
    setRecipes(newRecipes);
    refreshDatabase(newRecipes);
  };

  const updateUser = (updatedUser) => {
    if (updatedUser === null) {
      setUser(undefined);
    } else {
      setUser({
        ...user,
        ...updatedUser,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <MainContext.Provider
      value={{
        recipes,
        addRecipe,
        updateRecipe,
        user,
        updateUser,
      }}
    >
      <App />
    </MainContext.Provider>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<Root />, root);
