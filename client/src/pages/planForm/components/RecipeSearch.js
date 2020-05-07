import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import MainContext from '../../../services/context';
import searchRecipes from '../../recipes/modules/searchRecipes';

const RecipeSearch = ({ custom, recipe, updateRecipe }) => {
  const ref = useRef(null);
  const [query, setQuery] = useState('');
  const { recipes } = useContext(MainContext);

  const searchResults = query && query.length > 2 ? searchRecipes(recipes, query) : null;

  const selectRecipe = ({ title, _id }) => {
    updateRecipe({ title, id: _id });
    setQuery('');
  };

  return (
    <div id="recipe-search">
      <label>Rezept suchen</label>
      <input
        type="text" value={recipe ? recipe.title : query}
        placeholder="Suche..." ref={ref}
        disabled={recipe || custom}
        onChange={({ target }) => {
          if (!recipe) {
            setQuery(target.value);
          }
        }}
      />
      {searchResults ? (
        <div id="search-results">
          {searchResults.map((result) => (
            <div
              key={result._id}
              onClick={() => selectRecipe(result)}
            >
              {result.title}
            </div>
          ))}
        </div>
      ) : null}
      {recipe ? (
        <button
          className="button" type="button"
          onClick={() => {
            updateRecipe(null);
            setQuery('');
            ref.current.disabled = false;
            ref.current.focus();
          }}
        >
          Rezept ändern
        </button>
      ) : null}
    </div>
  );
};

RecipeSearch.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  custom: PropTypes.string.isRequired,
  updateRecipe: PropTypes.func.isRequired,
};

RecipeSearch.defaultProps = {
  recipe: null,
};

export default RecipeSearch;
