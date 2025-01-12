import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { toast } from 'react-toastify';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { deDE } from '@clerk/localizations';
import { polyfill } from 'mobile-drag-drop';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './app';
import Loading from './components/Loading';
import MainContext from './services/context';
import { syncDatabase, refreshDatabase, getAll } from './services/recipes';
import { getUser } from './services/auth';
import { withTimeout } from './utils';
import './index.scss';

console.log(process.env.CLERK_PUBLISHABLE_KEY);

if (!process.env.CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

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
  const [loading, setLoading] = useState(true);
  const { isLoaded: userLoaded } = useAuth();

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
      const [recipesRes] = await Promise.allSettled([
        syncDatabase(timeout),
      ]);

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

  if (loading || !userLoaded) {
    return <Loading />;
  }

  return (
    <MainContext.Provider
      value={{
        recipes,
        addRecipe,
        updateRecipe,
      }}
    >
      <App />
    </MainContext.Provider>
  );
};

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <ClerkProvider localization={deDE} publishableKey={process.env.CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Root />
  </ClerkProvider>,
);
