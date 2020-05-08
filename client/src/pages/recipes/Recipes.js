import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Nav, { NavButton } from '../../components/Nav';
import Searchbar from './components/Searchbar';
import RecipeCard from './components/RecipeCard';
import searchRecipes from './modules/searchRecipes';
import MainContext from '../../services/context';
import './Recipes.scss';

const FETCH_AMOUNT = window.matchMedia('min-width: 1200px') ? 15 : 10;

export default () => {
  const { recipes: allRecipes, user } = useContext(MainContext);
  const history = useHistory();

  const [query, setQuery] = useState(window.sessionStorage.getItem('query') || '');
  const [page, setPage] = useState(+window.sessionStorage.getItem('page') || 1);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    setRecipes(searchRecipes(allRecipes, query));
  }, [allRecipes]);

  const onScroll = () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
    const hasNext = recipes && (recipes.length > FETCH_AMOUNT * page);
    if (hasNext && nearBottom) {
      window.sessionStorage.setItem('page', page + 1);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!recipes) return null;
  const sliced = recipes.slice(0, FETCH_AMOUNT * page);
  return (
    <>
      <Nav page="recipes">
        <NavButton icon="settings" link="/settings" />
      </Nav>
      <Searchbar
        onSearch={(val) => {
          const login = val === 'login';
          const value = login ? '' : val;
          setPage(1);
          setQuery(value);
          setRecipes(searchRecipes(allRecipes, value));
          window.sessionStorage.setItem('page', 1);
          window.sessionStorage.setItem('query', value);
          if (login) {
            history.push('/login');
          }
        }}
        query={query}
      />
      <div id="list-wrapper">
        <div id="recipe-list">
          {sliced.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
        </div>
      </div>
      {user.authenticated ? (
        <Link to="/recipes/new" id="new-recipe">+</Link>
      ) : null}
    </>
  );
};
