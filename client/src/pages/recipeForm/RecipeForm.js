import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import MainContext from '../../services/context';
import api from '../../services/api';

import Loading from '../../components/Loading';
import Ingredients from './components/Ingredients/index';
import Description from './components/Description';
import Categories from './components/Categories';
import ImageSelect from './components/ImageSelect';
import Difficulty from './components/Difficulty';
import VeggieOptions from './components/VeggieOptions';
import './RecipeForm.scss';

const Image = ({ image, alt }) => image ? (
  <img src={image} alt={alt} crossOrigin="anonymous" />
) : null;

Image.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
};
Image.defaultProps = {
  image: null,
  alt: 'Rezeptbild',
};

const DEFAULT_RECIPE = {
  title: '',
  servings: 2,
  duration: 30,
  difficulty: 1,
  ingredients: [],
  description: '',
  categories: [],
};

export default () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const recipeId = pathname?.includes('edit') ? pathname.split('/')[2] : null;
  const { addRecipe, updateRecipe } = useContext(MainContext);
  const [recipe, setRecipe] = useState(DEFAULT_RECIPE);

  useEffect(() => {
    const setup = async () => {
      let fetchedRecipe;
      if (recipeId) {
        fetchedRecipe = await api.get(`/recipe/${recipeId}`);
        setRecipe(fetchedRecipe);
      }
      document.title = fetchedRecipe?.title || 'Neues Rezept';
    };
    setup();
  }, [recipeId]);

  const onChange = (value, prop) => {
    setRecipe({
      ...recipe,
      [prop]: value,
    });
  };

  const saveRecipe = async () => {
    const url = `/recipe${recipeId ? `/${recipeId}` : ''}?format=html`;
    const method = recipeId ? 'put' : 'post';
    const saved = await api[method](url, {
      body: recipe,
    });

    if (recipeId) {
      updateRecipe(saved);
    } else {
      addRecipe(saved);
    }

    history.replace(`/recipe/${saved._id}`);
  };

  return (!recipeId || (recipeId && recipe?._id)) ? (
    <div className="recipe-form-container">
      <div className="recipe-form">
        <Image image={recipe.image} />
        <div id="title-wrapper">
          <input
            type="text" value={recipe.title} placeholder="Titel"
            onChange={(e) => onChange(e.target.value, 'title')}
          />
          <ImageSelect updateImg={(image) => onChange(image, 'image')} />
        </div>
        <div id="number-inputs">
          <div>
            <label>Portionen</label>
            <input
              type="number" min="1"
              value={recipe.servings}
              onChange={(e) => onChange(e.target.value, 'servings')}
            />
          </div>
          <div>
            <label>Minuten</label>
            <input
              type="number" min="1"
              value={recipe.duration}
              onChange={(e) => onChange(e.target.value, 'duration')}
            />
          </div>
        </div>
        <div id="misc-inputs">
          <Difficulty
            difficulty={recipe.difficulty}
            onChange={(value) => onChange(value, 'difficulty')}
          />
          <VeggieOptions
            categories={recipe.categories}
            setCategories={(categories) => onChange(categories, 'categories')}
          />
        </div>
        <Ingredients
          ingredients={recipe.ingredients}
          sections={recipe.sections}
          onChange={onChange}
        />
        <Description value={recipe.description} onChange={(v) => onChange(v, 'description')} />
        <Categories categories={recipe.categories} onChange={(v) => onChange(v, 'categories')} />
        <button
          type="button" className="button inverted" id="save"
          onClick={saveRecipe}
        >
          Rezept speichern
        </button>
      </div>
    </div>
  ) : <Loading />;
};
